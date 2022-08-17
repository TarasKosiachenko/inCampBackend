const express = require("express");
const router = express.Router();
const database = require("../database")

router.get('/',getAllLists)
router.post('/', createLists)
router.put('/:id', updateLists)
router.delete('/:id', deleteLists)


function getAllLists(req,res){
    database.getAllLists().then(result=> res.send(result))
}

function createLists(req, res){
    const title= req.body.title 
      database.createLists(title).then((result)=> res.send(result))
}

function updateLists(req,res){
    const title= req.body.title
    const id = parseInt(req.params.id)
    database.updateLists(title,id).then((result)=> res.send(result))
}

function deleteLists(req,res){
    const id = parseInt(req.params.id)
    database.deleteLists(id).then((result)=> res.send(result)).catch((error) => {
        return res.status(500).json({ message: error.message });
      })
}

module.exports = router;