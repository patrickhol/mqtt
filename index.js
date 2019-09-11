const express = require('express')
const sslRedirect = require('heroku-ssl-redirect');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser');
const mqttHandler = require('./mqtt-client');

app.use(sslRedirect());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.connect();

app.get('/', function (req, res) {
  res.send('hello world');
});
app.post('/', (req, res) => {

  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
  // console.log(req.body)

  // res.send(req.body)
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))

