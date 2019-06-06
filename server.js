const http = require('http');

http.createServer((req, res) => {
    const {accept} = req.headers;
    if (accept && accept === 'text/event-stream') {
        if (req.url === '/events') {
            sendSSE(req, res);
        } else {
            res.writeHead(404);
            res.end();
        }
    } else {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('Something went wrong');
        res.end();
    }
}).listen(8000);

function sendSSE(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    
    let id = (new Date()).toLocaleTimeString();
    setInterval(() => {
        constructSSE(res, id, (new Date()).toLocaleString());
    }, 5000);
}

function constructSSE(res, id, data) {
    res.write(`id: ${id}\n`);
    res.write(`data: ${data}\n\n`);
}