import type { ServerWebSocket } from "bun";

let sockets: Array<ServerWebSocket<unknown>> = []

const server = Bun.serve({
  hostname: "::",
  port: process.env.PORT ?? 3000,
  fetch(req, server) {
    server.upgrade(req);
  
    },
    websocket: {
      open: (ws) => {
        sockets.push(ws)
      },
      close: (ws) => {
        sockets = sockets.filter(s => s !== ws)
      },
      message: async (ws, message) => {
        sockets.forEach(s => ws !== s && s.send(message))
      },
    },
});

console.log(`Listening on http://localhost:${server.port}`);
