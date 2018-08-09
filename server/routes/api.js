import _ from 'lodash';

export default function (server) {
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');
  server.route({
    path: '/api/shop_preview/indices',
    method: 'GET',
    handler(req, reply) {
      callWithRequest(req, 'cat.indices').then(response => {
        const ind = _.split(response, "\n");
        const indices = _.map(ind, row => {
          const indices = _.filter(_.split(row, ' '), (v, k) => k == 2);
          return _.filter(indices, ind => !ind.startsWith('.'));
        });

        reply({ indices: _.filter(_.flatMap(indices)) });
      });
    }
  });

  server.route({
    path: '/api/shop_preview/{index}/fields',
    method: 'GET',
    handler(req, reply) {
      callWithRequest(req, 'indices.getMapping', {
        index: req.params.index,
      }).then(response => {
        const mappings = response[req.params.index].mappings;
        console.log(mappings);
        const { properties } = mappings[Object.keys(mappings)[0]];

        reply({ fields: Object.keys(properties) });
      });
    }
  });

  server.route({
    path: '/api/shop_preview/{index}/{imgField}/search',
    method: 'GET',
    handler(req, reply) {
      callWithRequest(req, 'search', {
        index: req.params.index,
        _source: req.params.imgField
      }).then(response => {
        const res = response.hits.hits;
        const images = _.map(res, doc => {
          return {
            id: doc._id,
            imgUrl: doc._source[req.params.imgField]
          };
        });
        reply({ images });
      });
    }
  });

  server.route({
    path: '/api/shop_preview/{index}/{imgField}/preview',
    method: 'GET',
    handler(req, reply) {
      callWithRequest(req, 'search', {
        index: req.params.index,
        _source: req.params.imgField,
        size: 1
      }).then(response => {
        const res = response.hits.hits;
        console.log(res[0]._source);
        const preview = _.map(res, doc => doc._source[req.params.imgField]);
        reply({ preview });
      });
    }
  });
}
