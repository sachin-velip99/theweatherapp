const { error } = require('console')
const request = require('request')
const { json } = require('stream/consumers')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

/*const url = 'http://api.weatherstack.com/current?access_key=a2b9206487b8a1cf847058c02162de1d&query=15.2832,-73.9862'

request({ url: url, json:true }, (error, response) => {
    if(error){
        console.log('unable to connect to weather server')
    }
    else if(response.body.error){
        console.log('unable to find location');
    }
    else{
    console.log(response.body.current.weather_descriptions[0] +' the current temperature ' + response.body.current.temperature + ' degrees out there' + 'it feels like ' + response.body.current.feelslike + ' degrees out')
    }
})*/

/*forecast(15.2832, 73.9862, (error, data) => {
    if(error){
        console.log('error', error)
    }else{
        console.log('data', data)
    }
    
    
})*/

/*const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidHVzaGFyZ2F1ZGUiLCJhIjoiY2w4YjV4eXcxMG52cjN3bjNwZGlqOXVvZCJ9.QKr6phrJ6tfOgT7-4QOJag'

request({url: geocodeURL, json: true}, (error,response) => {
    if(error){
        console.log('unable to connect')
    }
    else if(response.body.features.length === 0){
        console.log('unable to find the location,search another')
    }
    else{const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(latitude, longitude)}
})*/

/*geocode('Goa', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})*/

const address = process.argv[2]
//call back chaining
if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, data) => {
        if (error) {
            return console.log(error)
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(data.location)
            console.log(forecastData)
        })
    })
}