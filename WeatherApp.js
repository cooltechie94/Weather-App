var api="https://fcc-weather-api.glitch.me/api/current?";
//var api1="https://fcc-weather-api.glitch.me/api/current?lat=longitude&lon=latitude";
var url1="";
var request = new XMLHttpRequest();
$(document).ready(function()
{
 	if (navigator.geolocation) 
 	{
 	   navigator.geolocation.getCurrentPosition(function(position)
	   { 	
	   		api+="lat="+position.coords.latitude+"&lon="+position.coords.longitude;
   		    console.log(api);
   		    getWeatherdetails(api);
	    });
	 } 
	 else 
	 { 
		console.log("Geolocation is not supported by this browser.");
	 }
 }); 
 function getWeatherdetails(api)
 {
 	request.open('GET',api,true);
	request.onload=function()
	{
		var data=JSON.parse(this.response);
		if(request.status>=200 && request.status<400)
		{
			console.log(data);
			const logo=document.getElementById('logo');
			let weather_icon_url=data.weather[0].icon;
			logo.setAttribute('src',weather_icon_url);
			logo.setAttribute('height','120px');
			logo.setAttribute('width','120px');
			document.getElementById("location").textContent=data.name+','+data.sys.country;
			let details=data.weather[0].main;
			document.getElementById("weatherCondition").textContent=details;

			let temperature=data.main.temp;
			document.getElementById("temp").textContent='Temp: '+temperature+'°';
			console.log(temperature);
			var tempElem=document.getElementById("tempUnits");

			tempElem.addEventListener('click',function()
			{
					temperature=myFunction(temperature);
					document.getElementById("temp").textContent='Temp: '+temperature+'°';
					console.log("Updated temperature is "+ temperature);
			});
		}
		else
		{
			const err=document.createElement('Error');
			errorMessage.textContext = `Shit!! Something's wrong with the API`;
			app.appendChild(errorMessage);
		}	
	};
	request.send();
 }
 function myFunction(temp1) 
 {
		if(document.getElementById("tempUnits").innerHTML==="C")
		{
			//console.log(typeof(t));
			//var temp1=parseInt(t);
			console.log(typeof(temp1));
			document.getElementById("tempUnits").innerHTML = "F";
			temp1=(temp1*9)/5+32;
			document.getElementById("temp").innerHTML='Temp: '+temp1+'°';
			return temp1.toFixed(2);
		}
		else 
		{
			//var temp1=parseInt(t);
			console.log("Fahrenheit conversion to Celsius "+temp1);
		 	document.getElementById("tempUnits").innerHTML="C";
			temp1=((temp1-32)*5)/9;
			console.log("Fahrenheit conversion to Celsius "+temp1);
		 	document.getElementById("temp").innerHTML='Temp: '+temp1+'°';
			return temp1.toFixed(2);
		}
 }