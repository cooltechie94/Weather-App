$(document).ready(function()
{
	var url='https://fcc-weather-api.glitch.me/api/current?lat=longitude&lon=latitude';
	var url1="";
	let request = new XMLHttpRequest();
	request.open('GET',url1,true);
	const app= document.getElementById('root');
  	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position)
    { 	
 		 url1=url.replace('longitude',position.coords.latitude);
		 url1=url1.replace('latitude',position.coords.longitude);
		 console.log("URL1-----"+url1);
    }); 
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
//var data=JSON.parse(this.response);
request.onload=function()
{
	var data=JSON.parse(this.response);
	if(request.status>=200 && request.status<400)
	{
		console.log(request.status);
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
		console.log("It is working till here");
		
		tempElem.addEventListener('click',function()
			{
				//console.log(data.main.temp);
				myFunction(data.main.temp)
			});
/*		
if(document.getElementById("tempUnits").click()===true)
		{
			console.log("It is working");
			myFunction(data.main.temp);

		}	
*/
		//document.getElementById("tempUnits").textContent='C';
		//app.appendChild(tempType);
		//var a=myFunction2(data.main.temp);
	}
	else
	{
		const err=document.createElement('Error');
		errorMessage.textContext = `Shit!! Something's wrong with the API`;
		app.appendChild(errorMessage);
	}	
}
request.send();
 });

function myFunction(t) {
			if(document.getElementById("tempUnits").textContent==="C")
			{
				//var temp1=parseFloat(t);
				var temp1=parseInt(t);
				console.log(typeof(temp1));
				document.getElementById("tempUnits").textContent = "F";
				temp1=(temp1*9)/5+32;
				document.getElementById("temp").textContent='Temp: '+temp1+'°';
			}
		  	else 
		  	{
		  		var temp1=parseInt(t);
		  		console.log("Fahrenheit conversion to Celsius "+temp1);
		 	 	document.getElementById("tempUnits").textContent="C";
		  		temp1=((temp1-32)*5)/9;
		  		console.log("Fahrenheit conversion to Celsius "+temp1);
		  	 	document.getElementById("temp").textContent='Temp: '+temp1+'°';
		  	}
 }