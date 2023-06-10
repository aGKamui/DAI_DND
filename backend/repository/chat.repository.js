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

    async getChat(chat_id){
      try{ return await Chat.findOne({_id: chat_id}); }
      catch{ return 404 }
    }

  async addMessage(username, message, chat_id){
    try{
      let chat = await Chat.findOne({_id: chat_id});
      chat.messages.push({username:username, message:message});
      chat.save();
      return chat;
    }
    catch{ return 404 }
  }
}

module.exports = new ChatRepository();