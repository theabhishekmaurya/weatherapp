document.querySelector("#startSearch").addEventListener("click",function(){
    document.querySelector("#citySearch").style.border="none";
    var city=document.querySelector("#citySearch").value;
    weatherSearch(city);
    forecast(city)
   
})
async function weatherSearch(city){
    let firstSearch=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},india&units=metric&APPID=474b8c611d11180ad3d73644d069118f`);
    let data=await firstSearch.json();
    console.log(data);
    var temp=document.querySelector("#temp");
    temp.textContent=data["main"].temp;
    var icon=document.querySelector("#weatherDet>img");
    icon.src=`http://openweathermap.org/img/wn/${data["weather"][0].icon}@2x.png`
    document.querySelector("#pres").textContent="Pressure : "+data["main"].pressure+" Pa";
    document.querySelector("#hum").textContent="Humidity : "+data["main"].humidity+" %"
    document.querySelector("#win").textContent="Wind : "+data["wind"].speed+" m/sec"
    document.querySelector("#city").textContent=data["name"];
    document.querySelector("#desc").textContent=data["weather"][0].description; 
    document.querySelector("#mapDiv").innerHTML=`
    <iframe
        width="100%"
        height="78%"
        style="border:0"
        loading="lazy"
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAnYJW6YJ3vvrwHNtKNxHItUr3an0s4kgY&q=${city}">
    </iframe>
    
    `
    
}

async function forecast(city){
    let secSearch=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=474b8c611d11180ad3d73644d069118f`);
    let data=await secSearch.json();
    console.log(data);
    document.querySelector("#weatherBottom").innerHTML=""
    for(let i=5; i<40; i+=8){
        var card=document.createElement("div");
        var icon=document.createElement("img");
        icon.src=`http://openweathermap.org/img/wn/${data["list"][i].weather[0].icon}@2x.png`  
        var desc=document.createElement("p");
        desc.textContent=data["list"][i].weather[0].description
        card.setAttribute("class","forecastCards");
        var date=document.createElement("h2");
        date.textContent=data["list"][i].dt_txt.split(" ")[0];
        var minMax=document.createElement("div");
        minMax.setAttribute("id","minMaxTemp");
        var minTemp=document.createElement("p");
        minTemp.textContent="Min Temp :"+data["list"][i].main.temp_min+" °C";
        var maxTemp=document.createElement("p");
        maxTemp.textContent="Max Temp :"+data["list"][i].main.temp_max+" °C";
        
        minMax.append(minTemp,maxTemp)
        card.append(date,icon,desc,minMax);
        document.querySelector("#weatherBottom").append(card);
    }
    
}

forecast("Ayodhya");
weatherSearch("ayodhya");
