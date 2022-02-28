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
                parisLat:48.8534, 
                parisLong: 2.3488,
                laLat:34.0522, 
                laLong: -118.2437,
                sydneyLat: 35.6895,
                sydneyLong: 139.6917,
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
            let newDB =[];
            // initialising varible that will be used to itirate through newDB array
            let i =0;
            // object URL's to be fetched
            const apis ={
                native: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['nativeLat']}&lon=${coordinates['nativeLong']}&key=fe861b05a7db4372a22372d803320fc4&include=minutely`,
                paris: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['parisLat']}&lon=-${coordinates['parisLong']}&key=fe861b05a7db4372a22372d803320fc4&include=minutely`,
                la: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['laLat']}&lon=${coordinates['laLong']}&key=fe861b05a7db4372a22372d803320fc4&include=minutely`,
                sydney: `https://api.weatherbit.io/v2.0/current?lat=${coordinates['sydneyLat']}&lon=${coordinates['sydneyLong']}&key=fe861b05a7db4372a22372d803320fc4&include=minutely`
        
            }
            //fetch data from Open Weather Map servers then parse to JSON
            const native = fetch(apis.native).then(value => value.json())
            const paris = fetch(apis.paris).then(value => value.json())
            const la =  fetch(apis.la).then(value => value.json())
            const sydney = fetch(apis.sydney).then(value => value.json())

            //retuns a promise ONCE all the iterable fetch api's have been resolved
            const data = await Promise.all([native, paris, la, sydney])
            newDB.push(data);
            
                //iterates though each KVP in the "apis" oject then uses the key to paint the DOM with the content associated with that key.
            Object.keys(apis).forEach(key => {
                document.querySelector(`.temperature-degree-${key}`).textContent = Math.floor(newDB[0][i].data[0].temp);
                document.querySelector(`.temperature-description-${key}`).textContent = `you can expect ${newDB[0][i].data[0].weather.description}`.toUpperCase();
                document.querySelector(`.location-timezone-${key}`).textContent = `${newDB[0][i].data[0].city_name}, ${newDB[0][i].data[0].country_code}` ;
                document.querySelector(`.weather-icon-${key}`).setAttribute("src", `https://www.weatherbit.io/static/img/icons/${newDB[0][i].data[0].weather.icon}.png`) 
                document.querySelector(`.temperature-degree-feren-${key}`).textContent = Math.floor(celciusToFerenheight(newDB[0][i].data[0].app_temp));
                document.querySelector(`.date-time-${key}`).textContent = `${date} | ${time}`
                //add wind speed to next update
                // document.querySelector(`.wind-description-${key}`).textContent = `wind speeds are ${newDB[0][i].data[0].wind_spd} m/s headind ${newDB[0][0].data[0].wind_cdir_full} at ${newDB[0][0].data[0].wind_dir} degress`
                //incriments i

                //add local time to to next update
                i++
            })
        }
        logData()
    });  
        }  
        // handle an absent geolocation
    else{
        alert("please allow location services for this to work");
    }
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