const express =require('express');

const {Genre} =require('../db');

function list(req, res, next) {
   Genre.findAll({include:['movies']})
        .then(objects=>res.json(objects))
        .catch(err => res.send(err));
}

function index(req,res,next){ 
    const id =req.params.id;  
    Genre.findByPk(id).then(object=> res.js(object)).catch(err => res.send(err));
}

function create(req,res,next){
    const description = req.body.description;//implicitos o sobre el cuerpo
    const status = req.body.status;

    let genre = new Object({
        description:description,
        status:status
    });

    Genre.create(genre).then(
        obj => res.json(obj)
    ).catch(err => res.send(err));
}

function replace(req,res,next){
    const id =req.params.id;
    Genre.findByPk(id).then((object)=>{
        const description =req.body.description ? object.description : " ";
        const status =req.body.status ? req.body.status :object.status;
        object.update({description:req.body.description, status:req.body.status})
        .then(genre =>res.json(genre));
        
    })
    .catch(err => res.send(err));
}

function edit(req,res,next){
    const id =req.params.id;
    Genre.findByPk(id)
    .then((object)=>{
        const description =req.body.description ? req.body.description : object.description;
        const status =req.body.status ? req.body.status : object.status;
        object.update({description:req.body.description, status:req.body.status})
        .then(genre =>res.json(genre));
        
    })
    .catch(err => res.send(err));

}

function destroy(req,res,next){
    const id =req.params.id;
    Genre.destroy({where:{id:id}}).then(obj => res.json(obj)).catch(err => res.send(err));
}

module.exports ={
    list, index,create,edit,replace,destroy
}