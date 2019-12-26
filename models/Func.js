import db from '../utils/db';
const { sequelize, Sequelize} = db;

const Func = sequelize.define('func', {
  funcname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  parent: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

export const addAFunc = function(req, res, next) {
  var func = req.body;
  Func.create(func).then(result=>{
    res.send(result);
  }).catch(error=>{
    res.send(error);
  });
}

export const deleteAFunc = function(req, res, next) {
  const { fid } = req.params;
  if(fid) {
    console.log(fid)
  } else {
    console.log(req.params);
  }
  res.send({delete: fid});
}

export const getAllFuncs = function(req, res, next) {
  Func.findAll().then(funcs=>{
    res.send(funcs);
  }).catch(error=>{
    res.send(error);
  });
}

export const updateAFunc = function(req, res, next) {
  const { fid } = req.params;
  if(fid) {
    console.log(fid)
  } else {
    console.log(req.params);
  }
  res.send({update: fid});
}


export default Func;
