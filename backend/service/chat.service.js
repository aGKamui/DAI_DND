const chatRepository = require("../repository/chat.repository");

class chatService{
    async getChat(chat_id){
        return await chatRepository.getChat(chat_id);
    }
    async addMessage(username, message, chat_id){
        return await chatRepository.addMessage(username, message, chat_id);
    }
}

module.exports = new chatService();