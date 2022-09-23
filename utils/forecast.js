const { error } = require("console")
const  request = require("request")
const { builtinModules } = require("module")

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a2b9206487b8a1cf847058c02162de1d&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        }else if(response.body.error){
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined, response.body.current.weather_descriptions[0] +' the current temperature ' + response.body.current.temperature + ' degrees out there' + 'it feels like ' + response.body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast