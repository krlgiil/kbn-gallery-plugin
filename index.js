import exampleRoute from './server/routes/example';
import apiRoute from './server/routes/api';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'shop-preview',
    uiExports: {

      app: {
        title: 'Shop Preview',
        description: 'An awesome Kibana plugin',
        main: 'plugins/shop-preview/app'
      },


      hacks: [
        'plugins/shop-preview/hack'
      ]

    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },


    init(server, options) {
      // Add server routes and initialize the plugin here
      exampleRoute(server);
      apiRoute(server);
    }


  });
};
