var Hapi = require('hapi');
var app = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);

// routes
app.route({
  method: 'GET',
  path: '/',
  handler: function (req, res) {
    res('app is running');
  }
});

// start the app
app.start();
