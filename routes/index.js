const express = require('express');
const router = express.Router();

const CRUD = require('../models/Task');


router.route('/:collection')
    .get( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let data = await task.read(req.query);
            res.json(data);
        }catch(err){
            res.json(err);
        }
    })
    .post( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let data = await task.creat(req.body);
            res.json(data);
        }catch(err){
            res.json(err);
        }
    })
    .put( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let data = await task.update(req.query, req.body);
            res.json(data);
        }catch(err){
            res.json(err)
        }
    })
    .delete( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let data = await task.remove(req.query);
            res.json(data);
        }catch(err){
            res.json(err)
        }
    });


router.route('/:collection/:_id')
    .get( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let query = Object.assign(req.params, req.query);
            let data = await task.readOne(query);
            res.json(data);
        }catch(err){
            res.json(err)
        }
    })
    .put( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let data = await task.updateOne(req.params, req.body);
            res.json(data);
        }catch(err){
            res.json(err)
        }
    })
    .delete( async(req, res, next) => {
        try{
            let collection = req.path.split('/')[1];
            let task = new CRUD(collection);
            let data = await task.removeOne(req.params);
            res.json(data);
        }catch(err){
            res.json(err)
        }
    });




module.exports = router;
