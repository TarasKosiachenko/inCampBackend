const net = require('net');

let clients = [];
let messages = [];

const server = net.createServer(function(socket) {
    clients.push(socket);
    const port = socket.remotePort;
    let name = '';

    socket.write('Enter your name:\r\n');

    socket.on('end', () => {
        let index = clients.indexOf(socket)
        clients.splice(index, 1);
        console.log(`\x1b[35m${name}\x1b[0m left the chat room`);
    });

    socket.on('data', message => {
        if(message.buffer.byteLength > 1) {
            if(name === '') {
                name = message
                console.log('Client connected.');
                console.log(`Port: \x1b[33m${port}\x1b[0m, Name: \x1b[35m${name}\x1b[0m`);
                socket.write(`Hello : ${name}`);
                socket.write('Chat started\n');
                messages.map( el => {
                    socket.write(`${el.name}: ${el.message}`)
                })
            } else {
                messages.push({'name': name, 'message': message})
                console.log(`\x1b[35m${name}\x1b[0m: \x1b[33m${message}\x1b[0m`);
                clients.forEach(client => {
                    if(client !== socket) {

                        client.write(`${name}: ${message}`);
                    }
                });
            }
        }
        else {
            socket.write('Please enter the text: ')
        }
    });

});

server.listen(1337, '0.0.0.0');