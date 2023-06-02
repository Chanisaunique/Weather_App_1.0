const apiKey="49a66178439b4560bd661234231605";
// const schtxt=document.querySelector("searchtext");
// const weatherIcon=document.querySelector(".weather-icon");

async function weatherUpdate(city){
    
    const response=await fetch('http://api.weatherapi.com/v1/forecast.json?key='+ apiKey +'&q=' + city +'&days=5');
    var data = await response.json();

    console.log(data);

    // Current Date GET
    const date = new Date();

    let currentDay= String(date.getDate()).padStart(2, '0');

    let currentMonth = String(date.getMonth()+1).padStart(2,"0");

    let currentYear = date.getFullYear();

    // we will display the date as DD-MM-YYYY

    let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    console.log("The current date is " + currentDate); 

    // 7 Days ago Date GET
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 7);
    console.log(yesterday);
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-');
      }
      
      past7day=formatDate(yesterday);
      console.log("The past 7 date is " + past7day); 


    const historyres=await fetch('http://api.weatherapi.com/v1/history.json?key='+ apiKey +'&q=' + city +'&dt='+past7day +'&end_dt='+currentDate);
    var history = await historyres.json();

    console.log(history);

    document.querySelector(".city").innerHTML= data.location.name;
    document.querySelector(".temp").innerHTML= Math.round(data.current.temp_c) +"°C";
    document.querySelector(".humidtytext").innerHTML= data.current.humidity + "%";
    document.querySelector(".windtext").innerHTML= data.current.wind_kph + " km/h";
    document.querySelector(".feels").innerHTML= data.current.feelslike_c +"°C";
    document.querySelector(".condition").innerHTML= data.current.condition.text;

    if(data.current.condition.text =="Patchy rain possible"){
        weathericon.src ="Assests/patchy-rain.png";
    
       }else if(data.current.condition.text =="Partly cloudy"){
        weathericon.src = "Assests/cloudy-day.png";
    
       }else if(data.current.condition.text =="Sunny"){
        weathericon.src = "Assests/sunny.png";
       }
       else if(data.current.condition.text =="Clear"){
        weathericon.src = "Assests/clear.png";
       }
       else if(data.current.condition.text =="Mist"){
        weathericon.src = "Assests/misty.png";
       }else if(data.current.condition.text =="Heavy rain"){
        weathericon.src = "Assests/rainy.png";
       }else if(data.current.condition.text =="Light rain shower"){
        weathericon.src = "Assests/light-rain.png";
       }


    // -----------------------Forecast Details-----------------------------------
    document.querySelector(".day1").innerHTML= data.forecast.forecastday[1].date;
    document.querySelector(".day2").innerHTML= data.forecast.forecastday[2].date;

    document.querySelector(".day1cond").innerHTML= data.forecast.forecastday[1].day.condition.text;
    document.querySelector(".day2cond").innerHTML= data.forecast.forecastday[2].day.condition.text;

    document.querySelector(".day1temp").innerHTML= Math.round(data.forecast.forecastday[1].day.avgtemp_c) +"°C";
    document.querySelector(".day2temp").innerHTML= Math.round(data.forecast.forecastday[2].day.avgtemp_c) +"°C";

    document.querySelector(".day1hum").innerHTML= Math.round(data.forecast.forecastday[1].day.avghumidity) +"%";
    document.querySelector(".day2hum").innerHTML= Math.round(data.forecast.forecastday[2].day.avghumidity) +"%";

    document.querySelector(".day1wind").innerHTML= Math.round(data.forecast.forecastday[1].day.avgvis_km) +"km/h";
    document.querySelector(".day2wind").innerHTML= Math.round(data.forecast.forecastday[2].day.avgvis_km) +"km/h";

    if(data.forecast.forecastday[1].day.condition.text =="Patchy rain possible"){
        day1icon.src ="Assests/patchy-rain.png";
    
       }else if(data.forecast.forecastday[1].day.condition.text =="Partly cloudy"){
        day1icon.src = "Assests/cloudy-day.png";
    
       }else if(data.forecast.forecastday[1].day.condition.text =="Sunny"){
        day1icon.src = "Assests/sunny.png";
       }
       else if(data.forecast.forecastday[1].day.condition.text =="Clear"){
        day1icon.src = "Assests/clear.png";
       }
       else if(data.forecast.forecastday[1].day.condition.text =="Mist"){
        day1icon.src = "Assests/misty.png";

       }else if(data.forecast.forecastday[1].day.condition.text =="Heavy rain"){
        day1icon.src ="Assests/rainy.png";

       }else if(data.forecast.forecastday[1].day.condition.text =="Light rain shower"){
        day1icon.src ="Assests/light-rain.png";
       }


       if(data.forecast.forecastday[2].day.condition.text =="Patchy rain possible"){
        day2icon.src ="Assests/patchy-rain.png";
    
       }else if(data.forecast.forecastday[2].day.condition.text =="Partly cloudy"){
        day2icon.src = "Assests/cloudy-day.png";
    
       }else if(data.forecast.forecastday[2].day.condition.text =="Sunny"){
        day2icon.src = "Assests/sunny.png";
       }
       else if(data.forecast.forecastday[2].day.condition.text =="Clear"){
        day2icon.src = "Assests/clear.png";
       }
       else if(data.forecast.forecastday[2].day.condition.text =="Mist"){
        day2icon.src = "Assests/misty.png";

       }else if(data.forecast.forecastday[2].day.condition.text =="Heavy rain"){
        day2icon.src ="Assests/rainy.png";

       }else if(data.forecast.forecastday[2].day.condition.text =="Light rain shower"){
        day2icon.src ="Assests/light-rain.png";
       }
}

async function geoLocation(){
    const successCall=(location)=>{
        console.log(location);
        console.log(location);
        weatherUpdate(location.coords.latitude+","+location.coords.longitude);
    }
    const errorCall=(error)=>{
        console.error(error);
    }
    var dataset=navigator.geolocation.getCurrentPosition(successCall,errorCall);
}
geoLocation();





