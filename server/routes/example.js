export default function (server) {

  server.route({
    path: '/api/shop_preview/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
