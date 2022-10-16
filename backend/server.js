const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

// wss.on('connection', (ws) => {
//   console.log(`wss connection`);

//   ws.on('message', (data, isBinary) => {
//     console.log(`wss message: ${data.toString()}`);
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         console.log(`datatostring: ${data.toString()}`)
//         client.send(isBinary ? data : data.toString());
//       }
//     })
//   })

// })

const users = new Set();

function sendMessage(message) {
  users.forEach((user) => {
    user.ws.send(JSON.stringify(message));
  });
}

wss.on('connection', (ws) => {
  const userRef = {
    ws,
  };
  users.add(userRef);

  ws.on('message', (message, isBinary) => {
    console.log('35',message.toString());
    try {

      // Parsing the message
      const data = JSON.parse(message);
      // const data = message;

      // Checking if the message is a valid one
      console.log(`data.name=${data.name}`);
      if (
        typeof data.name !== 'string' ||
        typeof data.message !== 'string'
      ) {
        console.error('Invalid message');
        return;
      }

      // Sending the message

      const messageToSend = {
        name: data.name,
        message: data.message,
        sentAt: Date.now()
      }

      sendMessage(messageToSend);

    } catch (e) {
      console.error('Error passing message!', e)
    }
  });

  ws.on('close', (code, reason) => {
    users.delete(userRef);
    console.log(`Connection closed: ${code} ${reason}!`);
  });
});
