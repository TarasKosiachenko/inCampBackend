const net = require('net');

const client = new net.Socket();

const interactive = process.argv[2] === '-i'

client.on('data', data => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Connection closed');
});

client.connect(1337, '127.0.0.1', () => {

    if (interactive) {
        process.stdin.pipe(client);
    } else {
        client.end();
    }
});