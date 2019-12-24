import User from './User';

function getUserFromDB(username, password) {
  return User.findAll({
      where: {
        username,
        password
      }
    }).then(users=>{
      if(users && users.length) {
        return users[0];
      } else {
        return false;
      }
    }).error(error=>{
      return false;
    });
}



module.exports.getUser = function() {
  try {
    return getUserFromDB(...arguments);
  } catch(e) {
    return false;
  }
}
