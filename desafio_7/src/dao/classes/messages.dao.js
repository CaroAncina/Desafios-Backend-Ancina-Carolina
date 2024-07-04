import Message from '../models/messagesModel.js';

class MessagesData {
    async findAll() {
        try {
            return await Message.find().populate('user', 'first_name last_name').lean();
        } catch (error) {
            console.error('Error al obtener los mensajes:', error);
            throw error;
        }
    }

    async create(messageData) {
        try {
            const newMessage = new Message(messageData);
            return await newMessage.save();
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            throw error;
        }
    }
}

export default new MessagesData();
