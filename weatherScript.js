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
                native: `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['nativeLat']}&lon=${coordinates['nativeLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `,
                paris: `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['parisLat']}&lon=${coordinates['parisLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `,
                la: `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['laLat']}&lon=${coordinates['laLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `,
                sydney: `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['sydneyLat']}&lon=${coordinates['sydneyLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `
        
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
                    document.querySelector(`.temperature-degree-${key}`).textContent = Math.floor(newDB[0][i].main.temp);
                    document.querySelector(`.temperature-description-${key}`).textContent = `you can expect ${newDB[0][i].weather[0].description}`.toUpperCase();
                    document.querySelector(`.location-timezone-${key}`).textContent = `${newDB[0][i].name}, ${newDB[0][i].sys.country}` ;
                    document.querySelector(`.weather-icon-${key}`).textContent = newDB[0][i].weather[0].icon;
                    document.querySelector(`.temperature-degree-feren-${key}`).textContent = Math.floor(celciusToFerenheight(newDB[0][i].main.temp));
                    document.querySelector(`.date-time-${key}`).textContent = `${date} | ${time}`
                    //incriments i
                    i++
                })
            
        }
        logData()
       
        });  
        }  
        // handle an absent geolocation
    else{
       temperatureDescription.textContent = "Please allow location services for this to work"
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