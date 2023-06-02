const apiKey="49a66178439b4560bd661234231605";
// const schtxt=document.querySelector("searchtext");
// const weatherIcon=document.querySelector(".weather-icon");

async function weatherUpdate(city){
    
    const response=await fetch('http://api.weatherapi.com/v1/forecast.json?key='+ apiKey +'&q=' + city +'&days=5');
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML= data.location.name;
    document.querySelector(".temp").innerHTML= Math.round(data.current.temp_c) +"°C";
    document.querySelector(".humidtytext").innerHTML= data.current.humidity + " %";
    document.querySelector(".windtext").innerHTML= data.current.wind_kph + " km/h";
    document.querySelector(".feels").innerHTML= data.current.feelslike_c +"°C";
    document.querySelector(".condition").innerHTML= data.current.condition.text;

    // -----------------------Forecast Details-----------------------
    document.querySelector(".day1").innerHTML= data.forecast.forecastday[1].date;
    document.querySelector(".day2").innerHTML= data.forecast.forecastday[2].date;






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


