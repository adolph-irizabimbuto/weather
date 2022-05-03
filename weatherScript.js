window.addEventListener("load", ()=>{
    //Date 
    const options = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    let date = new Date().toDateString();
    // the slice is a cheap hack to obtain the following format "hh:mm:ss"
    let time =new Date().toLocaleDateString('en-US', options).slice(-11)
  
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //coordinates
            let coordinates = {
                nativeLong: position.coords.longitude,
                nativeLat: position.coords.latitude,
                parisLat:48.853, 
                parisLong: 2.3498,
                laLat:34.0522, 
                laLong: -118.2437,
                tokyoLat: 35.6895,
                tokyoLong: 139.6917,
            }

        const logData = async ()=>{
            
            // add to nect 
            // time and date
            // const date_and_time = {
            //     native: `${date}/${time}`,
            //     paris: convertTimeZOne(new Date(), "Europe/Paris"),
            //     la: convertTimeZOne(new Date(), "America/Los_Angeles"),
            //     sydney: `${date}/${time}`,
            // }
      
            // array to save fetch responses
            let returnWeatherArray =[];
            // initialising varible that will be used to itirate through newDB array
            let i =0;
            // object URL's to be fetched
            const apis ={
                native: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['nativeLat']}&lon=${coordinates['nativeLong']}&key=6bf7390f0b7945ab88abf3e40f3d50f2&include=minutely`,
                paris: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['parisLat']}&lon=-${coordinates['parisLong']}&key=6bf7390f0b7945ab88abf3e40f3d50f2&include=minutely`,
                la: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['laLat']}&lon=${coordinates['laLong']}&key=6bf7390f0b7945ab88abf3e40f3d50f2&include=minutely`,
                tokyo: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['tokyoLat']}&lon=${coordinates['tokyoLong']}&key=6bf7390f0b7945ab88abf3e40f3d50f2&include=minutely`,
            }
                
            //fetch data from WeatherBit's servers then parse to JSON
            const native = fetch(apis.native).then(value => value.json())
            const paris = fetch(apis.paris).then(value => value.json())
            const la =  fetch(apis.la).then(value => value.json())
            const tokyo = fetch(apis.tokyo).then(value => value.json())
            
            //retuns a promise ONCE all the iterable fetch api's have been resolved
            const data = await Promise.all([native, paris, la, tokyo])
            returnWeatherArray.push(data);
             
            //iterates though each KVP in the "apis" oject then uses the key to paint the DOM with the content associated with that key.
            Object.keys(apis).forEach(key => {
                document.querySelector(`.temperature-degree-${key}`).textContent = Math.floor(returnWeatherArray[0][i].data[0].temp);
                document.querySelector(`.temperature-description-${key}`).textContent = `you can expect ${returnWeatherArray[0][i].data[0].weather.description}`.toUpperCase();
                document.querySelector(`.location-timezone-${key}`).textContent = `${returnWeatherArray[0][i].data[0].city_name}, ${returnWeatherArray[0][i].data[0].country_code}` ;
                document.querySelector(`.weather-icon-${key}`).setAttribute("src", `https://www.weatherbit.io/static/img/icons/${returnWeatherArray[0][i].data[0].weather.icon}.png`) 
                document.querySelector(`.temperature-degree-feren-${key}`).textContent = Math.floor(celciusToFerenheight(returnWeatherArray[0][i].data[0].app_temp));
                document.querySelector(`.date-time-${key}`).textContent = `${date} | ${time}`
                //add wind speed to next update
                // document.querySelector(`.wind-description-${key}`).textContent = `wind speeds are ${newDB[0][i].data[0].wind_spd} m/s headind ${newDB[0][0].data[0].wind_cdir_full} at ${newDB[0][0].data[0].wind_dir} degress`
                //incriment to loop through api arrays
                i++
                //add local time to to next update
               
            })
        }
        //call function, *fix this later*
        logData()
    });  
        }  
        // handle an absent geolocation
    else{
        alert("please allow location services for this to work");
    }
    //convert celcius to ferenheight
    function celciusToFerenheight(celcius){
        return (celcius*1.8)+ 32
    }

    // add to next update
    // function convertTimeZOne(date, tzString) {
    //     return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
    // // }
    //         const europe = convertTimeZOne(new Date(), "Europe/Paris");
    //         const toString = europe.toString()
});