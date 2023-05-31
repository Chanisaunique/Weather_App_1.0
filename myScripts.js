const apiKey="49a66178439b4560bd661234231605";
// const schtxt=document.querySelector("searchtext");
// const weatherIcon=document.querySelector(".weather-icon");

async function weatherUpdate(city){
    
    const response=await fetch('http://api.weatherapi.com/v1/forecast.json?key='+ apiKey +'&q=' + city);
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML= data.location.name;
    document.querySelector(".temp").innerHTML= Math.round(data.current.temp_c) +"°C";
    document.querySelector(".humidtytext").innerHTML= data.current.humidity + " %";
    document.querySelector(".windtext").innerHTML= data.current.wind_kph + " km/h";
    document.querySelector(".feels").innerHTML= data.current.feelslike_c +"°C";
    document.querySelector(".condition").innerHTML= data.current.condition.text;

   if(data.current.condition.text =="Patchy rain possible"){
    weathericon.src = "//cdn.weatherapi.com/weather/64x64/night/176.png";

   }else if(data.current.condition.text =="Partly cloudy"){
    weathericon.src = "//cdn.weatherapi.com/weather/64x64/night/116.png";

   }else if(data.current.condition.text =="Sunny"){
    weathericon.src = "//cdn.weatherapi.com/weather/64x64/day/113.png";
   }
   else if(data.current.condition.text =="Clear"){
    weathericon.src = "//cdn.weatherapi.com/weather/64x64/night/113.png";
   }
   else if(data.current.condition.text =="Mist"){
    weathericon.src = "//cdn.weatherapi.com/weather/64x64/night/143.png";
   }

}
