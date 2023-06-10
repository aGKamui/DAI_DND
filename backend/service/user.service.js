const userRepository = require("../repository/user.repository");
const bcrypt = require("bcryptjs");
require("dotenv").config();

class UserService {
  async getUser(username){
    return await userRepository.getUser(username);;
  }

  async update(username, toChange){
    const {password, email, type} = toChange
    let emailIsUsed
    try{
      (await userRepository.exists({ email: email })).email;
      emailIsUsed = true;
    }catch{
      emailIsUsed = false;
    }
    console.log(emailIsUsed);
    if((!type && !email && !password) || (type && !(type === 'Free' || type === 'Dolphin' || type === 'Whale')) || emailIsUsed){
      return 400;
    }
    if(password){
      toChange.password = await bcrypt.hash(password + process.env.PASSWORD_SECRET, 10)
    }
    return await userRepository.update(username, toChange);
  }

  async deleteUser(user){
    try{return await userRepository.deleteUser(user);}
    catch(error) { return 400;}
  }
}

module.exports = new UserService();
