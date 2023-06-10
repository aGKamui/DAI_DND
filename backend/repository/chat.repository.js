const { connect } = require("../config/db.config");
const Chat = require("../model/chatData.model");

class ChatRepository {
    constructor() {
      connect();
    }

    async createChat(chatData){
        return await Chat.create(chatData);
    }

    async exists(chatId){
        try{
          return await Character.findOne({_id: chatId})
        }catch{
          return 404
        }
      }

    async deleteChat(chatId){
        return await Chat.deleteOne({_id: chatId})
    }
}

module.exports = new ChatRepository();