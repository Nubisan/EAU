const http = require('http');
const { Pool } = require('pg');
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');
const cors = require('cors');  // Importa el middleware cors

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'user'
});

const corsOptions = {
    origin: '*'  // Permite todas las solicitudes, ajusta según tus necesidades
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const path = parsedUrl.pathname;

    // Aplicar cors aquí dentro del request handler
    cors(corsOptions)(req, res, async () => {
        if (path === '/insertNotas' && req.method === 'POST') {
            let buffer = '';
            const decoder = new StringDecoder('utf-8');

            req.on('data', (data) => {
                buffer += decoder.write(data);
            });

            req.on('end', async () => {
                buffer += decoder.end();
                const data = JSON.parse(buffer);
                const { nombre, nota } = data;

                try {
                    const text = 'INSERT INTO notas(nombre, nota) VALUES($1, $2)';
                    const values = [nombre, nota];
                    const result = await pool.query(text, values);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Nota insertada correctamente', result }));
                } catch (e) {
                    console.error('Error al insertar la nota:', e);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Error al insertar la nota' }));
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
