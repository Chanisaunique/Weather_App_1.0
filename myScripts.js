const apiKey="49a66178439b4560bd661234231605";

const searchWrapper=document.querySelector(".searcharea");
const inputBox=searchWrapper.querySelector("input");
const suggBox=searchWrapper.querySelector(".autocombox");




async function searchLocation(city){
    const Searchresponse=await fetch('https://api.weatherapi.com/v1/search.json?key='+ apiKey +'&q=' + city +'&days=5');
    var searchData=await Searchresponse.json();

    let suggestions=[];
    let empArray=[];

    for (let i = 0; i <= 4; i++) {
      console.log(searchData[i].name);

      suggestions[i]=searchData[i].name;
  
      empArray[i]='<li>'+ suggestions[i] +'</li>';
    
      console.log(empArray);
    }
    showSuggestion(empArray);
    
}

function showSuggestion(list){
  let listData;
  if(!list.length){
  }else{
    listData=list.join('');
  }
  suggBox.innerHTML=listData;

}

async function weatherUpdate(city){
    
    const response=await fetch('https://api.weatherapi.com/v1/forecast.json?key='+ apiKey +'&q=' + city +'&days=5');
    var data = await await response.json();

    

    console.log(data);

    // Current Date GET
    const date = new Date();

    let currentDay= String(date.getDate()).padStart(2, '0');

    let currentMonth = String(date.getMonth()+1).padStart(2,"0");

    let currentYear = date.getFullYear();

    //display the date as DD-MM-YYYY

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


    const historyres=await fetch('https://api.weatherapi.com/v1/history.json?key='+ apiKey +'&q=' + city +'&dt='+past7day +'&end_dt='+currentDate);
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

       }else if(data.current.condition.text =="Thundery outbreaks possible"){
        weathericon.src = "Assests/thunder.png";
       }
       

    // -----------------------Forecast Details-----------------------------------
    for (let i = 1; i < 3; i++) {
        document.querySelector(".day"+[i]).innerHTML= data.forecast.forecastday[i].date;
        document.querySelector(".day"+[i]+"cond").innerHTML= data.forecast.forecastday[i].day.condition.text;
        document.querySelector(".day"+[i]+"temp").innerHTML= Math.round(data.forecast.forecastday[i].day.avgtemp_c) +"°C";
        document.querySelector(".day"+[i]+"hum").innerHTML= Math.round(data.forecast.forecastday[i].day.avghumidity) +"%";
        document.querySelector(".day"+[i]+"wind").innerHTML= Math.round(data.forecast.forecastday[i].day.avgvis_km) +"km/h";
    }


// ------------------------------weather Conditions------------------------------

// array of condition texts
var conditionTexts = [
    "Patchy rain possible",
    "Partly cloudy",
    "Sunny",
    "Clear",
    "Mist",
    "Heavy rain",
    "Light rain shower",
    "Thundery outbreaks possible",
    "Moderate or heavy rain shower",
    "Patchy light rain with thunder"
  ];
  
  //array of corresponding image file names
  var imageFileNames = [
    "patchy-rain.png",
    "cloudy-day.png",
    "sunny.png",
    "clear.png",
    "misty.png",
    "rainy.png",
    "light-rain.png",
    "thunder.png",
    "rainy.png",
    "patchy-rain-thunder.png"

  ];
  // ------------------------------Forecast weather Icons Set------------------------------
  for (var i = 0; i <= 2; i++) {
    // Get the condition text for the current day
    var condition = data.forecast.forecastday[i].day.condition.text;
    
    // Find the index of the condition text in the array
    var index = conditionTexts.indexOf(condition);
    console.log(index);
    if (index != -1) {
      var imageSrc = "Assests/" + imageFileNames[index];
      console.log(imageSrc);
 
      var dayIcon = document.getElementsByName("day" + i + "icon");
      console.log(dayIcon);
  
      if (dayIcon.length > 0) {
        dayIcon[0].src = imageSrc;
      }
    }
  }

// ------------------------------weather History Icons Set------------------------------

  for (var i = 0; i <= 6; i++) {
    // Get the condition text for the current day
    var condition = history.forecast.forecastday[i].day.condition.text;
    console.log(condition);
    // Find the index of the condition text in the array
    var index = conditionTexts.indexOf(condition);
    if (index != -1) {
      var imageSrc = "Assests/" + imageFileNames[index];
      console.log(imageSrc);
 
      var dayIcon = document.getElementsByName("hday" + (i+1) + "icon");
      console.log(dayIcon);
  
      if (dayIcon.length > 0) {
        dayIcon[0].src = imageSrc;
      }
    }
  }


    // -----------------------History Details-----------------------------------
    for (let i = 0; i < 7; i++) {
        document.querySelector(".hday"+[i+1]).innerHTML= history.forecast.forecastday[i].date;
        document.querySelector(".hday"+[i+1]+"cond").innerHTML= history.forecast.forecastday[i].day.condition.text;
        document.querySelector(".hday"+[i+1]+"temp").innerHTML= Math.round(history.forecast.forecastday[i].day.avgtemp_c) +"°C";
        document.querySelector(".hday"+[i+1]+"hum").innerHTML= Math.round(history.forecast.forecastday[i].day.avghumidity) +"%";
        document.querySelector(".hday"+[i+1]+"wind").innerHTML= Math.round(history.forecast.forecastday[i].day.avgvis_km) +"km/h";
    }
}

      // -----------------------GeoLocation GET-----------------------------------
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










