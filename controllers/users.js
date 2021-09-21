const express =require('express');

function list(req, res, next) {
    res.send('respond with a resource');
}

function index(req,res,next){   
    res.send(`Usuario del sistema con un ID = ${req.params.id}`);
}

function create(req,res,next){
    const name = req.body.name;//implicitos o sobre el cuerpo
    const lastName = req.body.lastName;
    res.send(`Crear un usuario nuevo con nombre ${name} y apellido ${lastName}`);
}

function replace(req,res,next){
    res.send(`Remplazo un usuario con ID =${req.params.id} por otro.`);//params por el heather
}

function edit(req,res,next){
    res.send(`Remplazo propiedades del usuario con ID =${req.params.id} por otras.`);
}

function destroy(req,res,next){
    res.send(`elimino un usuario con ID =${req.params.id} .`);
}

module.exports ={
    list, index,create,edit,replace,destroy
}