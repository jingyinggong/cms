import db from '../utils/db';
const {sequelize, Sequelize} = db;

const Role = sequelize.define('role', {
  rolename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


export const addARole = function(req, res, next) {
  role = req.body;
  Role.create(role).then(result=>{
    res.send(result);
  }).catch(error=>{
    res.send(error);
  });
}

export const deleteARole = function(req, res, next) {
  const { rid } = req.params;
  if(rid) {
    console.log(rid)
  } else {
    console.log(req.params);
  }
  res.send({good: 'job'});
}

export const getAllRoles = function(req, res, next) {
  Role.findAll().then(roles=>{
    res.send(roles);
  }).catch(error=>{
    res.send(error);
  });
}

export default Role;