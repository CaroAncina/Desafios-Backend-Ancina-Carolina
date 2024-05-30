import express from 'express';
import mongoose from './config/database.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import messagesRouter from './routes/api/messages.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/api/sessions.js';
import dotenv from 'dotenv';
import __dirname from './utils.js';
import socketProducts from './socketProducts.js';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
    cookie: { maxAge: 180 * 60 * 1000 },
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const io = new Server(httpServer);

socketProducts(io); 
