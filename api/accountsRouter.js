express = require("express")

const knex = require("../data/dbConfig.js")

const router = express.Router()


//Get a list of all accounts 
router.get('/', (req, res) => {
    //get a list of all the accounts in the "accounts" table
    //select a * from posts 
    knex
        .select("*")
        .from('accounts')
        .then(accounts => {
            res.status(200).json({
                data: accounts
            })
        })
        .catch(error => {
            res.status(500).json({
                message: error.message
            })
        })
})

//GET a new account by the id  
router.get('/:id', (req, res) => {
    //select * from accounts where id = req.params.id 
    knex
        .from('accounts')
        .select("*")
        .where({ id: req.params.id })
        .first()
        .then(accounts => {
            res.status(200).json({ data: accounts}) //is this refering to data and the accounts prop ? 
            console.log(accounts)
        })                                          
        .catch(error => {
            console.log("GET / error", error);
            res.status(500).json({ message: error.message });
          });
    })

//Post a new account 
router.post("/", (req, res) => {
    //validate data coming from the client 
    //before hitting the db 
    knex('accounts')
    .insert(req.body, "id")
    .then(([id]) => {
        res.status(200).json({ data: id})
    })
    .catch(error => {
        console.log("GET / error", error);
        res.status(500).json({ message: error.message });
      });
})

//Update an accout 
router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    knex('accounts').where({ id }).update(changes)
    .then(account => {
        if(account > 0){
            res.status(200).json({message: 'record updated successfully'})
        } else {
            res.status(500).json({message: 'no records found'})
        }
    })
    .catch(err => {
        console.log("GET/ error", error)
        res.status(500).json({message: error.message})
      })
})

//Delete an account 
router.delete('/:id', (req, res) => {
    const { id } = req.params

    knex('accounts').where({ id }).del()
    .then(account => {
        if(account > 0){
            res.status(200).json({message: 'record updated successfully'})
        } else {
            res.status(500).json({message: 'no records found'})
        }
    })
    .catch(err => {
        console.log("GET/ error", error)
        res.status(500).json({message: error.message})
      })
})


module.exports = router; 