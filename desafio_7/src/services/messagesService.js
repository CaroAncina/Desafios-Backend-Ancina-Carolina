import messagesData from '../dao/data/messagesData.js';

class MessagesService {
    async getMessages() {
        return await messagesData.findAll();
    }

    async createMessage(messageData) {
        return await messagesData.create(messageData);
    }
}

export default new MessagesService();
