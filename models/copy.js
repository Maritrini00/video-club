module.exports = (sequelize,type) => {
    const Copy = sequelize.define('copies',{
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        number:type.INTEGER,
        format: type.INTEGER,
        status:type.INTEGER
    });
    return Copy;
};