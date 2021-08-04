var poll_submit= document.querySelector('.submit');
var lat = document.querySelector('#latitude');
var long = document.querySelector('#longitude');
console.log(lat.value);
var input1 = document.querySelector('.input1');
var input2 = document.querySelector('.input2');
var input3 = document.querySelector('.input3');
var input4 = document.querySelector('.input4');
var input5 = document.querySelector('.input5');

poll_submit.addEventListener('click', function(){
    fetch('https://air-quality.p.rapidapi.com/current/airquality?lat='+lat.value+'&lon='+long.value,{
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "ee57f911c9msh54de0a6c51c79a3p153facjsn8e9674e30bb6",
        "x-rapidapi-host": "air-quality.p.rapidapi.com"
    }
})
.then(response => response.json())
.then(data=>{
    console.log(data.data[0]);
    var i1=data.data[0].co;
    var i2=data.data[0].no2;
    var i3=data.data[0].o3;
    var i4=data.data[0].pm10;
    var i5=data.data[0].pm25;

    input1.innerHTML=i1+ " ppm";
    input2.innerHTML=i2+ " ppm";
    input3.innerHTML=i3+ " ppm";
    input4.innerHTML=i4;
    input5.innerHTML=i5;


})
.catch(err => {
    console.error(err);
});
})