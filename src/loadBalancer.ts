// loadBalancer.ts
import http from 'http';
import os from 'os';

const numCPUs = os.cpus().length;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

let currentWorker = 0;
const distributeRequests = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const targetPort = PORT + (currentWorker % numCPUs) + 1; // Распределение портов рабочих процессов
  currentWorker++;

  console.log(`Redirecting request to worker on port ${targetPort}`);

  const options = {
    hostname: 'localhost',
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = http.request(options, proxyRes => {
    res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxyReq, { end: true });
};

// Создаем сервер балансировщика нагрузки
const loadBalancer = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api')) {
    distributeRequests(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

loadBalancer.listen(PORT, () => {
  console.log(`Load balancer is running on port ${PORT}`);
});
