const request=require('request')
const geocode=(address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2F5YW1yYWsiLCJhIjoiY2szbXp4cGc0MWt5djNlcm1ibGo0aXVxYyJ9.Ki5PQkVAY0UJE7WczmelEA'
    request({url,json:true} , (error,response) => {
        if(error) {
            callback('Unable to connect to loacation services!',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location.Try another search',undefined)
        }
        else{
            callback(undefined,{
                lattitude :response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })



}
module.exports=geocode
