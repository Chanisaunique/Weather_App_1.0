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
    i.class ="fa-solid fa-cloud-showers-heavy";

   }else if(data.current.condition.text =="Partly cloudy"){
    i.class = "fa-solid fa-clouds-sun";

   }else if(data.current.condition.text =="Sunny"){
    i.class = "fa-solid fa-sun";
   }
   else if(data.current.condition.text =="Clear"){
    i.class = "fa-regular fa-sun-bright";
   }
   else if(data.current.condition.text =="Mist"){
    i.class = "fa-sharp fa-solid fa-cloud-fog";
   }

}
