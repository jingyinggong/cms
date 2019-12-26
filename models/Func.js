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
    allowNull: false
  }
});

Func.sync({force: true});

export default Func;
