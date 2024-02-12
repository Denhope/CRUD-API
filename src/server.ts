import cluster from 'cluster';
import http from 'http';
import os from 'os';
import app from './app';

const numCPUs = os.cpus().length;
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4001;
const isClusterMode = process.env.CLUSTER_MODE === 'true';

if (isClusterMode && cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: PORT + i, CLUSTER_MODE: 'true' });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const serverPort = process.env.PORT ? parseInt(process.env.PORT, 10) : PORT;
  const server = http.createServer(app);

  server.listen(serverPort, () => {
    console.log(`Worker ${process.pid} started on port ${serverPort}`);
  });

  // LOGGING
  server.on('request', (req, res) => {
    console.log(`Request received from worker ${process.pid}: ${req.url}`);
  });
}
