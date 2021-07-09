var express = require('express');

var approuter = express.Router();

var usercontroller = require('./Comtroller');

approuter.post('/addusers',usercontroller.create);
approuter.post('/role',usercontroller.role);
approuter.post('/emp',usercontroller.employee_details);
approuter.post('/emp_dep',usercontroller.emp_department);
approuter.post('/emp_salary',usercontroller.Emp_salary);
approuter.get('/users_all',usercontroller.findallusers);
approuter.get('/roles_all',usercontroller.findallroles);
approuter.get('/emp_all',usercontroller.findallemp);
approuter.get('/emp_dep_all',usercontroller.findallemp_department);
approuter.get('/emp_sal_all',usercontroller.findallemp_salaries);
approuter.get('/users/:id',usercontroller.getuser);
approuter.put('/users/update/:id',usercontroller.updateuser);
approuter.delete('/users/delete/:id',usercontroller.deleteuser);




module.exports =approuter;