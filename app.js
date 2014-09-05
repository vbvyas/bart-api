var Hapi = require('hapi');
var geolib = require('geolib');
var request = require('request');
var q = require('q');
var parser = require('xml2js').parseString;
var stations = require('./stations.json');
var fake = require('./fake.json');

var bart_key = process.env.BART || "MW9S-E7SL-26DU-VV8V";
var app = Hapi.createServer('0.0.0.0', parseInt(process.env.PORT, 10) || 3000);
var url = "http://api.bart.gov/api/etd.aspx?cmd=etd&orig="
var key = "&key=" + bart_key;

// get request
function request(queryUrl) {
  var deferred = q.defer();
  request(queryUrl, deferred.node());
  return deferred.promise;
}

// routes
app.route({
  method: 'GET',
  path: '/station/{stn}',
  handler: function (req, res) {
    var stn = req.params.stn;
    if (stn === 'FAKE' || stn === 'fake') {
      res(fake);
    } else {
      var queryUrl = url + stn + key;
      request(queryUrl)
      .then(function(err, request_res, body) {
        if (err) {
          res([]);
        } else {
          var parser = q.denodeify(parser);
          parser(body)
          .then(function (err, result) {
            res(result);
          });
        }
      });
    }
  }
});

app.route({
  method: 'GET',
  path: '/stations',
  handler: function (req, res) {
    var coordinate = {};
    coordinate.latitude = req.query.lat;
    coordinate.longitude = req.query.lng;
    var sorted = geolib.orderByDistance(coordinate, stations);
    var closest = [];
    for (var i = 0; i < sorted.length; i++) {
      var s = sorted[i];
      var station = stations[s.key];
      var point = {};
      point.name = station.name;
      point.abbr = station.abbr;
      point.distance = geolib.convertUnit('mi', s.distance); // miles
      closest.push(point);
    }
    res(closest);
  }
});

// start the app
app.start();
