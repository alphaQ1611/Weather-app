const express=require('express')
const app=express()
const path=require('path')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


 const publicDirectoryPath=path.join(__dirname,'../public')
 const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath))
const viewsPath=path.join(__dirname,'../templates/views')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:'Search term not provided!'
        })
    }
    
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if(error) {
            return res.send({error})
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            
        })
    })
    
})
app.listen(3000,() => {
    console.log("The server is running!")
})