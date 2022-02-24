window.addEventListener("load", ()=>{
    let long;
    let lat;
    //initialising DOM elements
    
  
    //native weather 
    const tempDegree = document.querySelector('.temperature-degree');
    const temperatureDescription = document.querySelector('.temperature-description');
    const location = document.querySelector('.location-timezone');
    const weatherIcon = document.querySelector('.weather-icon');
    const tempFeren = document.querySelector('.temperature-degree-feren');
    const dateTime = document.querySelector('.date-time');

    //Paris
    
    const paris_tempDegree = document.querySelector('.temperature-degree-paris');
    const paris_temperatureDescription = document.querySelector('.temperature-description-paris');
    const paris_location = document.querySelector('.location-timezone-paris');
    const paris_weatherIcon = document.querySelector('.weather-icon-paris');
    const paris_tempFeren = document.querySelector('.temperature-degree-feren-paris');
    const paris_dateTime = document.querySelector('.date-time-paris');
    
    //LA
    
    const la_tempDegree = document.querySelector('.temperature-degree-la');
    const la_temperatureDescription = document.querySelector('.temperature-description-la');
    const la_location = document.querySelector('.location-timezone-la');
    const la_weatherIcon = document.querySelector('.weather-icon-la');
    const la_tempFeren = document.querySelector('.temperature-degree-feren-la');
    const la_dateTime = document.querySelector('.date-time-la');
    //Sydney 
    
    const sydney_tempDegree = document.querySelector('.temperature-degree-sydney');
    const sydney_temperatureDescription = document.querySelector('.temperature-description-sydney');
    const sydney_location = document.querySelector('.location-timezone-sydney');
    const sydney_weatherIcon = document.querySelector('.weather-icon-sydney');
    const sydney_tempFeren = document.querySelector('.temperature-degree-feren-sydney');
    const sydney_dateTime = document.querySelector('.date-time-sydney');
    
    //Date 
    const options = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    let date = new Date().toDateString();
    let time =new Date().toLocaleDateString('en-US', options).slice(-11)
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            
            long = position.coords.longitude;
            lat = position.coords.latitude;  

            //coordinates
            let coordinates = {
                parisLat:48.8534, 
                parisLong: 2.3488,
                laLat:34.0522, 
                laLong: -118.2437,
                sydneyLat: 35.6895,
                sydneyLong: 139.6917,
            }
            const wheatherDBArray= [];
            //API calls

            const apis ={
                native:`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `,
                paris: `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['parisLat']}&lon=${coordinates['parisLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `,
                la: `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['laLat']}&lon=${coordinates['laLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `,
                sydney: `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['sydneyLat']}&lon=${coordinates['sydneyLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `

            }

            //this adds each response to weatherDB array 
           console.log(wheatherDBArray.length)
           console.log(wheatherDBArray)
           console.log('i need to get head during bhm')
             
           Object.values(apis).forEach(values =>{
                fetch(values)
                    .then(res =>{
                        return res.json();
                    })
                    .then(newData =>{
                        wheatherDBArray.push(newData)
                    })
                    
            })
            console.log(wheatherDBArray.length)
           
            const native = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `
            const paris = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['parisLat']}&lon=${coordinates['parisLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `
            const la = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['laLat']}&lon=${coordinates['laLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `
            const sydney=  `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates['sydneyLat']}&lon=${coordinates['sydneyLong']}&appid=5b37ba235354d2d3a601644e092a984b&units=metric `


            fetch(native)
                .then(res =>{
                    return res.json();
                })
                .then(data =>{
                    //extracting data from the response object 
                    const{temp,temp_max,temp_min,humidity,pressure}= data.main;
                    const suburb = data.name;
                    const country = data.sys.country;
                    const {description,icon,}= data.weather[0];
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        
                    //interractions with DOM elements 
                    tempDegree.textContent = Math.floor(temp);
                    tempFeren.textContent = Math.floor(celciusToFerenheight(temp));
                    location.textContent = `${suburb}, ${country}`;
                    temperatureDescription.textContent = `you can expect ${description}`.toUpperCase();
                    weatherIcon.setAttribute('src', iconUrl);
                    dateTime.textContent = `${date} | ${time}`
                });

            fetch(paris)
                .then(res =>{
                    return res.json();
                })
                .then(data =>{
                    //extracting data from the response object 
                    const{temp,temp_max,temp_min,humidity,pressure}= data.main;
                    const suburb = data.name;
                    const country = data.sys.country;
                    const {description,icon,}= data.weather[0];
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        
                    //interractions with DOM elements 
                    paris_tempDegree.textContent = Math.floor(temp);
                    paris_tempFeren.textContent = Math.floor(celciusToFerenheight(temp));
                    paris_location.textContent = `${suburb}, ${country}`;
                    paris_temperatureDescription.textContent = `you can expect ${description}`.toUpperCase();
                    paris_weatherIcon.setAttribute('src', iconUrl);
                    paris_dateTime.textContent = `${date} | ${time}`
                })

                fetch(la)
                .then(res =>{
                    return res.json();
                })
                .then(data =>{
                    //extracting data from the response object 
                    const{temp,temp_max,temp_min,humidity,pressure}= data.main;
                    const suburb = data.name;
                    const country = data.sys.country;
                    const {description,icon,}= data.weather[0];
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        
                    //interractions with DOM elements 
                    la_tempDegree.textContent = Math.floor(temp);
                    la_tempFeren.textContent = Math.floor(celciusToFerenheight(temp));
                    la_location.textContent = `${suburb}, ${country}`;
                    la_temperatureDescription.textContent = `you can expect ${description}`.toUpperCase();
                    la_weatherIcon.setAttribute('src', iconUrl);
                    la_dateTime.textContent = `${date} | ${time}`
                })

                fetch(sydney)
                .then(res =>{
                    return res.json();
                })
                .then(data =>{
                    //extracting data from the response object 
                    const{temp,temp_max,temp_min,humidity,pressure}= data.main;
                    const suburb = data.name;
                    const country = data.sys.country;
                    const {description,icon,}= data.weather[0];
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        
                    //interractions with DOM elements 
                    sydney_tempDegree.textContent = Math.floor(temp);
                    sydney_tempFeren.textContent = Math.floor(celciusToFerenheight(temp));
                    sydney_location.textContent = `${suburb}, ${country}`;
                    sydney_temperatureDescription.textContent = `you can expect ${description}`.toUpperCase();
                    sydney_weatherIcon.setAttribute('src', iconUrl);
                    sydney_dateTime.textContent = `${date} | ${time}`
                })
        });  
        }  
        // handle an absent geolocation
    else{
       temperatureDescription.textContent = "Please allow location services for this to work"
    }

    function celciusToFerenheight(celcius){
        return (celcius*1.8)+ 32
    }


});
