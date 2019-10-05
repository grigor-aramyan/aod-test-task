import express from 'express';
import http from 'http';
import socket from 'socket.io';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import { sequelize } from './sequelize';

// components
import App from '../components/App';

// Router
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import notifRoutes from './routes/notifRoutes';

const PORT = process.env.PORT || 4242;

const app = express();

app.use(express.json());
app.use(express.static('dist'));

const server = http.createServer(app);
//const server = new Server(app);

const io = socket(server);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifs', notifRoutes);

app.get('/*', (req, res) => {
    const store = createStore(reducers);

    const initialMarkup = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                <App />
            </StaticRouter>
        </Provider>
    );

    res.send(`
        <html>
            <head>
                <title>AOD Space Test Task</title>
                <link rel="stylesheet" href="/css/styles.css">
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </head>
            <body>
                <div id="root">${initialMarkup}</div>
                <script src="/main.js"></script>
                <script src="/socket.io/socket.io.js"></script>
            </body>
        </html>
    `);
});

sequelize
    .authenticate()
    .then(() => {
        console.log('db connected');

        // TODO use migrations in prod to add ongoing changes to db tables...
        // ... w/o dropping them and removing already gathered data
        sequelize.sync()
            .then(() => {
                console.log('synced successfully');

                server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

                io.on('connection', (sock) => {
                    console.log('socket connected!');
            
                });
            })
    })
    .catch(err => {
        return console.log(err);
    });

/*pool.connect((err, client, release) => {
    if (err) return console.log(err);

    server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
    //server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

    io.on('connection', (sock) => {
        console.log('socket connected!');

        sock.on('client test', data => {
            console.log(`from client msg: ${data.msg}`);
        });

        setInterval(() => {
            sock.emit('test', { msg: 'some string' });
        }, 10 * 1000);
    });
});*/

process.on('SIGINT', () => {
    sequelize.close();
    process.exit();
});