const express =require('express');

const {Member} =require('../db');

function list(req, res, next) {
   Member.findAll({include: ['bookings']}).then(objects=>res.json(objects)).catch(err => res.send(err));
}

function index(req,res,next){ 
    const id =req.params.id;  
    Member.findByPk(id).then(object=> res.js(object)).catch(err => res.send(err));
}

function create(req,res,next){
    const name = req.body.name;//implicitos o sobre el cuerpo
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;

    let director = new Object({
        name:name,
        lastName:lastName,
        address:address,
        phone:phone,
        status:status
    });

    Member.create(director).then(
        obj => res.json(obj)
    ).catch(err => res.send(err));
}

function replace(req,res,next){
    const id =req.params.id;
    Member.findByPk(id).then((object)=>{
        const name =req.body.name ? object.name : " ";
        const lastName =req.body.lastName ? object.lastName : " ";
        const address= req.body.address ? object.address : " ";
        const phone = req.body.phone ? object.phone: " ";
        const status = req.body.status ? object.status : " ";
        object.update({name:req.body.name, lastName:req.body.lastName, address:req.body.address,phone:req.body.phone,status:req.body.status})
        .then(member =>res.json(member));
        
    })
    .catch(err => res.send(err));
}

function edit(req,res,next){
    const id =req.params.id;
    Member.findByPk(id)
    .then((object)=>{
        const name =req.body.name ? req.body.name : object.name;
        const lastName =req.body.lastName ? req.body.lastName : object.lastName;
        const address= req.body.address ? req.body.address : object.address;
        const phone = req.body.phone ? req.body.phone: object.phone;
        const status = req.body.status ? req.body.status : object.status;
        object.update({name:req.body.name, lastName:req.body.lastName, address:req.body.address,phone:req.body.phone,status:req.body.status})
        .then(member =>res.json(member));
        
    })
    .catch(err => res.send(err));

}

function destroy(req,res,next){
    const id =req.params.id;
    Member.destroy({where:{id:id}}).then(obj => res.json(obj)).catch(err => res.send(err));
}

module.exports ={
    list, index,create,edit,replace,destroy
}