import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers';
import { query, pool, createJunkTable } from '../db';

// components
import App from '../components/App';

const PORT = process.env.PORT || 4242;

const server = express();

server.use(express.json());
server.use(express.static('dist'));

// Routes
import authRoutes from './routes/authRoutes';

/*server.get('/test', (req, res) => {
    //createJunkTable();
    //res.json({ msg: 'done' });
    
    query('INSERT INTO users(name) VALUES($1) RETURNING *', ['jane'], (err, result) => {
        if (err) return res.status(400).json({ msg: JSON.stringify(err) });

        return res.status(200).json({ user: result.rows[0] });
    });
});

server.get('/:i', (req, res) => {
    query('SELECT * FROM users WHERE id=$1', [req.params.i], (err, result) => {
        if (err) return res.status(400).json({ msg: JSON.stringify(err) });

        res.status(200).json({ msg: result.rows[0] });
    });
});*/

server.get('/*', (req, res) => {
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
                <link rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous">
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <div id="root">${initialMarkup}</div>
                <script src="/main.js"></script>
            </body>
        </html>
    `);
});

pool.connect((err, client, release) => {
    if (err) return console.log(err);

    server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
});

process.on('SIGINT', () => {
    pool.end();
    process.exit();
});