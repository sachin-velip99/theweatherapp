const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')   //templates directory
const partialPath = path.join(__dirname, '../templates/partials')

// setup handalbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//serving files from static directory public
app.use(express.static(publicDirectoryPath))

//hbs files
app.get('', (req,res) => {
    res.render('index', {
        title: 'weather app',
        name: 'sachin'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'sachin'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'how can we help  you',
        name: 'sachin'
    })
})

//interacting with url requests get()

/*app.get('', (req,res) => {
    res.send('hello express')
})*/

//serving html json 
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
    /*res.send({
        forecast: 'its windy',
        location: 'goa',
        address: req.query.address
    })*/
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'sachin',
        msg: 'The page not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'sachin',
        msg: '404 page'
    })
})

//port creation
app.listen(3000, () => {
    console.log('server is upon port 3000')
})