/**
 * Created by Anna on 18.09.2017.
 */
const net = require('net');
const port = 8124;
let seed = 0;

const server = net.createServer(client => {
      client.setEncoding('utf8');
    client.id = Date.now() + seed++;
    logFile(client.id,`Client ${client.id} is connected`);

    client.once('data', msg => {

        if(msg == 'QA'){
            console.log(client.id, 'Message from client is true');
            client.write('ACK');

        }
        else {
            logFile(client.id, 'Message from client is false');
            client.write('DEC');
            client.destroy();
        }
    });

    client.on('end', () => {
        logFile(client.id, `Client ${client.id} disconnected`)
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
