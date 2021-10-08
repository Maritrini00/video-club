const express =require('express');

const {Director} =require('../db');

function list(req, res, next) {
   Director.findAll({include: ['movies']}).then(objects=>res.json(objects)).catch(err => res.send(err));
}

function index(req,res,next){ 
    const id =req.params.id;  
    Director.findByPk(id).then(object=> res.js(object)).catch(err => res.send(err));
}

function create(req,res,next){
    const name = req.body.name;//implicitos o sobre el cuerpo
    const lastName = req.body.lastName;

    let director = new Object({
        name:name,
        lastName:lastName
    });

    Director.create(director).then(
        obj => res.json(obj)
    ).catch(err => res.send(err));
}

function replace(req,res,next){
    const id =req.params.id;
    Director.findByPk(id).then((object)=>{
        const name =req.body.name ? object.name : " ";
        const lastName =req.body.lastName ? object.lastName : " ";
        object.update({name:req.body.name, lastName:req.body.lastName})
        .then(director =>res.json(director));
        
    })
    .catch(err => res.send(err));
}

function edit(req,res,next){
    const id =req.params.id;
    Director.findByPk(id)
    .then((object)=>{
        const name =req.body.name ? req.body.name : object.name;
        const lastName =req.body.lastName ? req.body.lastName : object.lastName;
        object.update({name:req.body.name, lastName:req.body.lastName})
        .then(director =>res.json(director));
        
    })
    .catch(err => res.send(err));

}

function destroy(req,res,next){
    const id =req.params.id;
    Director.destroy({where:{id:id}}).then(obj => res.json(obj)).catch(err => res.send(err));
}

module.exports ={
    list, index,create,edit,replace,destroy
}