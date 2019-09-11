const express = require('express')
const sslRedirect = require('heroku-ssl-redirect');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 5000

// enable ssl redirect
app.use(sslRedirect());
app.get('/', function (req, res) {
  res.send('hello world');
});
app.post('/', (req, res) => {
  console.log(JSON.stringify(req.body))

  res.json(req.body)
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`))


  // express()
  //   .use(express.static(path.join(__dirname, 'public')))
  //   .set('views', path.join(__dirname, 'views'))
  //   .set('view engine', 'ejs')
  //   .get('/', (req, res) => {
  //     res.render('pages/index')
  //   })
  // .post('/', (req, res) => {
  //   console.log(req.body)

  //   res.render(req.body)
  // })
//   .listen(PORT, () => console.log(`Listening on ${PORT}`))

