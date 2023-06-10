const chatService = require("../service/chat.service")

class ChatController{
    async getChat(chat_id){
        return await chatService.getChat(chat_id);
    }
    async addMessage(username, message, chat_id){
        return await chatService.addMessage(username, message, chat_id);
    }
}

module.exports = new ChatController();