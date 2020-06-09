express = require("express")

const knex = require("../data/dbConfig.js")

const router = express.Router()

// router.get('/', (req, res) => {
//     res.status(200).json({ api: "from accounts router"})
// })

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

module.exports = router; 