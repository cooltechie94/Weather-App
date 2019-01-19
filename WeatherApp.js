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
	   	/*
		 		 api=api.replace('longitude',position.coords.latitude);
				 api=api.replace('latitude',position.coords.longitude);
				 console.log(api);
				 url1=api;
				 */
	    });
	 } 
	 else 
	 { 
		console.log("Geolocation is not supported by this browser.");
	 }
	
	console.log("API: "+api+"URL1 :"+url1);
	const app= document.getElementById('root');

 });

function myFunction(t) {
			if(document.getElementById("tempUnits").innerHTML==="C")
			{
				//var temp1=parseFloat(t);
				var temp1=parseInt(t);
				console.log(typeof(temp1));
				document.getElementById("tempUnits").innerHTML = "F";
				temp1=(temp1*9)/5+32;
				document.getElementById("temp").innerHTML='Temp: '+temp1+'°';
			}
		  	else 
		  	{
		  		var temp1=parseInt(t);
		  		console.log("Fahrenheit conversion to Celsius "+temp1);
		 	 	document.getElementById("tempUnits").innerHTML="C";
		  		temp1=((temp1-32)*5)/9;
		  		console.log("Fahrenheit conversion to Celsius "+temp1);
		  	 	document.getElementById("temp").innerHTML='Temp: '+temp1+'°';
		  	}
 }
 
 function	getWeatherdetails(api)
 {
 	request.open('GET',api,true);
	console.log("URL  "+url1);
	request.onload=function()
	{
		console.log("Working till here");
		var data=JSON.parse(this.response);
		if(request.status>=200 && request.status<400)
		{
			console.log(data);
			const logo=document.getElementById('logo');
			let weather_icon_url=data.weather[0].icon;
			logo.setAttribute('src',weather_icon_url);
			logo.setAttribute('height','100px');
			logo.setAttribute('width','100px');
			document.getElementById("location").textContent=data.name;
			document.getElementById("temp").textContent='Temp: '+data.main.temp+'°';
			console.log(data.main.temp);
			var tempElem=document.getElementById("tempUnits");
			tempElem.addEventListener('click',function()
				{
					//console.log(data.main.temp);
					myFunction(data.main.temp)
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