const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { app } = require('../server');

function request(pathname) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      const req = http.get({ hostname: '127.0.0.1', port, path: pathname }, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          server.close(() => resolve({ statusCode: res.statusCode, body }));
        });
      });
      req.on('error', (error) => {
        server.close(() => reject(error));
      });
    });
  });
}

test('serves the frontend homepage', async () => {
  const response = await request('/');
  assert.equal(response.statusCode, 200);
  assert.match(response.body, /save data/i);
});

test('serves the student API', async () => {
  const response = await request('/api/students');
  assert.equal(response.statusCode, 200);
  assert.match(response.body, /Sandeep/i);
});
