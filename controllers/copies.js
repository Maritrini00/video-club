const express =require('express');

const {Copy} =require('../db');
const {Movie} =require('../db');

function list(req, res, next) {
   Copy.findAll({include: ['movies','bookings']}).then(objects=>res.json(objects)).catch(err => res.send(err));
}

function index(req,res,next){ 
    const id =req.params.id;  
    Copy.findByPk(id).then(object=> res.js(object)).catch(err => res.send(err));
}

function create(req,res,next){
    const number = req.body.number;//implicitos o sobre el cuerpo
    const format = req.body.format;
    const status = req.body.status;
    const movieId = req.body.movieId

    let copy = new Object({
        number:number,
        format:format,
        status:status,
        movieId:movieId
    });

    Copy.create(copy).then(
        obj => res.json(obj)
    ).catch(err => res.send(err));
}

function replace(req,res,next){
    const id =req.params.id;
    Copy.findByPk(id).then((object)=>{
        const number =req.body.number ? object.number : " ";
        const format=req.body.format ? object.format : " ";
        const status=req.body.status ? object.status : " ";
        const movieId = req.body.movieId ? object.movieId : " ";
        object.update({number:req.body.number, format:req.body.format,status:req.body.status,
        movieId:req.body.movieId})
        .then(copy =>res.json(copy));
        
    })
    .catch(err => res.send(err));
}

function edit(req,res,next){
    const id =req.params.id;
    Copy.findByPk(id)
    .then((object)=>{
        const number =req.body.number ? req.body.number : object.number;
        const format =req.body.format ? req.body.format : object.format;
        const status=req.body.status ? req.body.status : object.status;
        const movieId = req.body.movieId ? req.body.movieId : object.movieId;
        object.update({number:req.body.number, format:req.body.format,status:req.body.status,
            movieId:req.body.movieId})
        .then(copy =>res.json(copy));
        
    })
    .catch(err => res.send(err));

}

function destroy(req,res,next){
    const id =req.params.id;
    Copy.destroy({where:{id:id}}).then(obj => res.json(obj)).catch(err => res.send(err));
}

module.exports ={
    list, index,create,edit,replace,destroy
}