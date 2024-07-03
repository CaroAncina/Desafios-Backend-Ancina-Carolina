import messagesService from '../services/messagesService.js';

class MessagesController {
    async getMessages(req, res) {
        try {
            const messages = await messagesService.getMessages();
            res.send({ result: "success", payload: messages });
        } catch (error) {
            console.error('Error al obtener los mensajes:', error);
            res.status(500).send('Error al obtener los mensajes');
        }
    }

    async createMessage(req, res) {
        const { user, message } = req.body;
        if (!user || !message) {
            return res.status(400).send({ status: "error", error: "Faltan parámetros" });
        }
        try {
            const newMessage = await messagesService.createMessage({ user, message });
            res.send({ result: "success", payload: newMessage });
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            res.status(500).send('Error al guardar el mensaje');
        }
    }
}

export default new MessagesController();
