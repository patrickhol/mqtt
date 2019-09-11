const express = require('express')
const sslRedirect = require('heroku-ssl-redirect');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser');
// const MqttHandler = require('./mqtt-client');

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  // client.subscribe('presence', function (err) {
  //   if (!err) {
  //     client.publish('presence', 'Hello mqtt')
  //   }
  // })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
app.use(sslRedirect());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// var mqttClient = new MqttHandler();
// mqttClient.connect();

app.get('/', function (req, res) {
  res.send('hello world');
});
app.post('/', (req, res) => {
  console.log(req.body)
  client.publish('presence1', JSON.stringify(req.body))
  // mqttClient.sendMessage(req.body.message);
  res.status(200).send(JSON.stringify(req.body));
  // console.log(req.body)

  // res.send(req.body)
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

