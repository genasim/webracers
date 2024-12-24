// import { WebSocketExpress, Router } from 'websocket-express';

// const app = new WebSocketExpress();
// const router = new Router();

// // Simple usage:
// router.ws('/path/foo', async (req, res) => {
//   const ws = await res.accept();
//   ws.on('message', (msg) => {
//     ws.send(`echo ${msg}`);
//   });
//   ws.send('hello');
// });

// router.ws('/path/bar', async (req, res) => {
//   const ws = await res.accept();

//   ws.send('who are you?');

//   const message = await ws.nextMessage({ timeout: 1000 });
//   ws.send(`hello, ${message.data}`);

//   ws.close();
// });

// // Transactions:
// router.ws('/path/transactional', async (req, res) => {
//   const ws = await res.accept();

//   try {
//     res.beginTransaction();
//     ws.send('hello');
//     ws.send('this is a long series of messages');
//     ws.send('and all messages will be sent');
//     ws.send('even if the server is asked to close()');
//     ws.send('although they may be stopped if the server crashes');

//     await myAsynchronousOperation();

//     ws.send('still included');
//   } finally {
//     res.endTransaction();
//   }

//   ws.send('this message might not be included');
//   ws.send('because the transaction has finished');
// });

// // Full Router API of express is supported too:
// router.get('/path/foo', (req, res) => {
//   res.end('response to a normal HTTP GET request');
// });

// // use sends both HTTP and WS requests to the middleware / router:
// app.use(router);

// // the setting 'shutdown timeout' can be set to automatically close
// // WebSocket connections after a delay, even if they are in a
// // transaction
// app.set('shutdown timeout', 1000);

// // create and run a server:
// const server = app.createServer();
// server.listen(8080, 'web', 0, () => {
//     console.log('======================\nWebsocket server is listening on port 8080');
// });

import Express, { Router } from 'express';

const PORT = process.env.CONTAINER_PORT ?? 3000;

const app = Express();
const router = Router();

app.use(router);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(
    `======================\nServer is listening on port ${PORT}!!`,
  );
});
