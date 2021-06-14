const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const fs = require('fs')
const keysBuffer = fs.readFileSync('./src/credential.json', 'utf8')
const { mapboxApiKey, weatherApiKey } = JSON.parse(keysBuffer)


const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'adi'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'aditya'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'this is the msg for help page',
    name: 'adit'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide an Address.' })
  }
  const location = req.query.address
  geocode(location, mapboxApiKey, (error, { latitude, longitude, location } = {}) => {
    if (error)
      return res.send({ error })

    forecast(latitude, longitude, weatherApiKey, (error, forecastData) => {
      if (error)
        return res.send({ error })

      res.send({ forecast: forecastData, location, address: req.query.address })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404-page', {
    message: 'help article not found',
    title: '404: page not found',
    name: 'adi'
  })
})

app.get('*', (req, res) => {
  res.render('404-page', {
    message: 'Page not found',
    title: '404: page not found',
    name: 'adi'
  })
})

app.listen(port, () => {
  console.log('server is up on port ' + port)
})