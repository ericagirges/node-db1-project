const express = require("express");

const db = require("../data/dbConfig")

const router = express.Router();

const Accounts = {
    getAll() {
        return db("accounts")
    },
    getById(accountId) {
        return db("accounts").where({ accountId })
    },
    insert(newAccount) {
        return db("accounts").insert(newAccount)
    },
    update(accountId, account) {
        try {
            return db("accounts").where({ accountId }).update(account)
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    remove(accountId) {
        return db("account").where({ accountId }).del()
    },
};

router.get("/", (req, res) => {
    Accounts.getAll()
    .then(accounts => {
        res.status(200).json(accounts)
    }) .catch(error => {
        res.status(500).json({ error: error.message })
    })
})

router.get("/:id", (req, res) => {
    Accounts.getById(accountId)
    .then(account => {
        if(account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({ message: "Unable to find an account with the given id" })
        }
    }) .catch(error => {
        res.status(500).json({ error: error.messsage })
    })
})

router.post("/", (req, res) => {
    Accounts.insert({
        name: req.body.name,
        budget: req.body.budget
    })
    .then(newAccount => {
        if(!newAccount.name || !newAccount.budget) {
            res.status(400).json({ message: "Please provide name and budget for account." })
        } else {
            res.status(201).json(newAccount)
        }
    }).catch(error => {
        res.status(500).json({ error: error.message })
    })
})

router.put("/:id", (req, res) => {
    Accounts.update(req.params.id, req.body)
    .then(account => {
        if(account.id !== req.params.id){
            res.status(404).json({ message: "Unable to find an account with the given id" })
        } else if(!account.name || !account.budget){
            res.status(400).json({ message: "Please provide name and budget for account." })
        } else {
            res.status(200).json(account)
        }
    }).catch(error => {
        res.status(500).json({ error: error.message })
    })
})

router.delete("/:id", (req, res) => {
    Accounts.remove(req.params.id)
    .then(deletedRow => {
        if(!deletedRow) {
            res.status(404).json({ message: "Unable to find an account with the given id" })
        } else {
            res.status(200).json({ message: "Account has been successfully deleted." })
        }
    }). catch(error => {
        res.status(500).json({ error: error.message })
    })

})

module.exports = router;