const request = require('request')
const forecast = (latitude, longitude, key, callback) => {
  const url = 'http://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + latitude + ',' + longitude + '&aqi=no';
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Not able to connet to weather services!')
    }
    else if (body.error) {
      callback('unable to find location')
    }
    else {
      const st = `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. There is ${body.current.humidity}% humidity.`
      callback(undefined, st)
    }
  })
}

module.exports = forecast