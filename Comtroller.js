const { QueryTypes } = require('sequelize');
const {authuser,auth_employee_details}= require('./validator/auth_users');
const db = require('./Model');
const User = db.tutorials;
const Roles = db.roles_model;
const Emp = db.emp_details_model;
const EMP_department = db.emp_department_model;
const EMP_salary = db.emp_salary_model;

const Op = db.Sequelize.Op;

exports.role = (req,res)=>{
    const role = {
       role_id:req.body.role_id,
       role_name:req.body.role_name
    };
  Roles.create(role).then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
      res.status(500).send({
          message:err.message
      })
  })
}
exports.create = async(req,res)=>{
   let result = await authuser.validateAsync(req.body);
   console.log(result)
    const user = {
        user_id:result.user_id,
        role_id:result.role_id,
        user_name:result.user_name,
    };
  User.create(user).then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
      res.status(500).send({
          message:err.message
      })
  })
}

exports.employee_details= async (req,res)=>{
    let result = await auth_employee_details.validateAsync(req.body);
    console.log(result)
    const emp = {
        user_id:result.user_id,
        emp_id:result.emp_id,
        country:result.country,
        state:result.state,
        department:result.department,
    }
    Emp.create(emp).then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    
    })
}

exports.emp_department = (req,res)=>{
    const emp_department = {
        emp_id:req.body.emp_id,
        department_id:req.body.department_id,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
    }

    EMP_department.create(emp_department).then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    
    })
}

exports.Emp_salary = (req,res)=>{
    const emp_salary = {
        emp_id:req.body.emp_id,
        startdate:req.body.startdate,
        enddate:req.body.enddate,
    }

    EMP_salary.create(emp_salary).then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    
    })
}
exports.findallroles = async (req,res)=>{
    const findroles = await db.sequelize.query("Select * from roles",{
        type:QueryTypes.SELECT
    })
    let respone = {
        data:"Raw Query",
        record:findroles
    }
    res.status(200).json(respone);
}

exports.findallusers = async (req,res)=>{
    const finduser = await db.sequelize.query("Select * from users",{
        type:QueryTypes.SELECT
    })
    let respone = {
        data:"Raw Query",
        record:finduser
    }
    res.status(200).json(respone);
}

exports.findallemp = async (req,res)=>{
    const findemp_details = await db.sequelize.query("Select * from employee_details",{
        type:QueryTypes.SELECT
    })
    let respone = {
        data:"Raw Query",
        record:findemp_details
    }
    res.status(200).json(respone);
}

exports.findallemp_department = async (req,res)=>{
    const findemp_department = await db.sequelize.query("Select * from employee_departments",{
        type:QueryTypes.SELECT
    })
    let respone = {
        data:"Raw Query",
        record:findemp_department
    }
    res.status(200).json(respone);
}

exports.findallemp_salaries = async (req,res)=>{
    const findemp_salaries = await db.sequelize.query("Select * from employee_salaries",{
        type:QueryTypes.SELECT
    })
    let respone = {
        data:"Raw Query",
        record:findemp_salaries
    }
    res.status(200).json(respone);
}

//find user by ID

exports.getuser = async (req,res)=>{
    try{
    const userdetails = await User.findOne({where :{user_id:req.params.id}});
    res.status(200).send({
        status:200,
        message:"details is fetch successfully ",
        data:userdetails
    })
}
catch(error){
    return res.status(400).send({
        status:400,
        message:"there is some error",
        errors:error
    })
}

}


//update the user

exports.updateuser = async (req,res)=>{
    try{
 const updateuser = await User.update({
     user_name:req.body.user_name
 },{where:{user_id:req.params.id}});
 return res.status(200).send({
     user:updateuser,
     message:"user is updated"
 })
}
catch(error){
  return res.status(400).send({
  message:"there is some error",
  status:400,
  errors:error
 })
}
}

///delete the user

exports.deleteuser = async(req,res)=>{
    try{
      const userdelete = await User.destroy({
          where:{user_id:req.params.id}
      })
      return res.status(200).send({
          status:200,
          message:"user is deleted successfully",
          user:userdelete
      })
    }
      catch (error){
        return res.status(400).send({
            status:400,
            message:"there is some error",
            errors:error
        }) 
      }  
    
    
}