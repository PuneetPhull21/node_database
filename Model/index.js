const dbconfig = require('../db');

const Sequelize = require('sequelize');
const { user } = require('../db');

const sequelize = new Sequelize(dbconfig.database,dbconfig.user,dbconfig.password,{
    host:dbconfig.host,
    dialect:dbconfig.dialect,
    operatorsAliases: false,

})

const db = {};

db.sequelize =sequelize ;
db.Sequelize = Sequelize;

db.roles_model  = require("./roles_model.js")(sequelize,Sequelize);
db.tutorials = require("./users_model")(sequelize,Sequelize);
db.emp_details_model  = require("./emp_details_model.js")(sequelize,Sequelize);
db.emp_department_model  = require("./emp_department_model.js")(sequelize,Sequelize);
db.emp_salary_model = require("./emp_salary_model.js")(sequelize,Sequelize);
module.exports = db;



