const Sequelize = require ('sequelize');
const actor = require('./models/actor');

//1) db name 2) user 3) password 4) obj conf
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const movieActorModel =require('./models/movieActor');
const copyModel = require('./models/copy');
const memberModel = require('./models/member');
const bookingModel = require('./models/booking');

const sequelize = new Sequelize('video-club', 'root','abcd1234',{
    host: 'localhost',
    dialect: 'mysql'
});

const Director = directorModel(sequelize,Sequelize);
const Genre = genreModel(sequelize,Sequelize);
const Movie = movieModel(sequelize,Sequelize);
const Actor = actorModel(sequelize,Sequelize);
const MovieActor = movieActorModel(sequelize,Sequelize);
const Copy = copyModel(sequelize,Sequelize);
const Member = memberModel(sequelize,Sequelize);
const Booking = bookingModel(sequelize,Sequelize);

//un genero puede tener muchas peliculas
Genre.hasMany(Movie,{as:'movies'});

//una pelicula puede tener un genero
Movie.belongsTo(Genre,{as:'genre'});

//un director puede tener muchas peliculas
Director.hasMany(Movie,{as: 'movies'});

//una pelicula puede tener un director
Movie.belongsTo(Director,{as:'director'});

//un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey:'movieId'});

Movie.hasMany(Copy,{as:'copies'});

Copy.belongsTo(Movie,{as:'movies'});

Copy.hasMany(Booking,{as:'bookings'});

Member.hasMany(Booking,{as:'bookings'});

Booking.belongsTo(Copy,{as:'copies'});

Booking.belongsTo(Member,{as:'members'});


//en una pleicula participan muchos actores
MovieActor.belongsTo(Actor, {foreignKey:'actorId'});

Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'moviesActors'
});


Actor.belongsToMany(Movie,{
    foreignKey: 'movieId',
    as: 'movies',
    through: 'moviesActors'
});

sequelize.sync({
    force: true
}).then (()=>{
    console.log("base de datos actualizada");
});

module.exports ={Director, Genre, Movie,Actor, Copy,Member,Booking};