const express = require('express');
const router = express.Router();

const CRUD = require('../models/Task');


router.get('/tasks', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let data = await task.read(req.query);
        res.json(data);
    }catch(err){
        err
    }
});

router.post('/tasks', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let data = await task.creat(req.body);
        res.json(data);
    }catch(err){
      err
    }
});


router.get('/tasks/:_id', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let query = Object.assign(req.params, req.query);
        let data = await task.readOne(query);
        res.json(data);
    }catch(err){
        res.json(err)
    }
});

router.put('/tasks/:_id', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let data = await task.updateOne(req.params, req.body);
        res.json(data);
    }catch(err){
        res.json(err)
    }
});

router.put('/tasks', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let data = await task.update(req.query, req.body);
        res.json(data);
    }catch(err){
        res.json(err)
    }
});

router.delete('/tasks/:_id', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let data = await task.removeOne(req.query, req.body);
        res.json(data);
    }catch(err){
        res.json(err)
    }
});


router.delete('/tasks', async(req, res, next) => {
    try{
        let collection = req.path.split('/')[1];
        let task = new CRUD(collection);
        let data = await task.remove(req.query);
        res.json(data);
    }catch(err){
        res.json(err)
    }
});




module.exports = router;
