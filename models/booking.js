module.exports = (sequelize,type)=> {
    const Booking = sequelize.define('booking',{
        id : {type: type.INTEGER, primaryKey: true, autoIncrement:true},
        date: {type: type.DATE, notNull: true}
    });
    return Booking;
}