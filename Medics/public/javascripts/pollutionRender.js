var poll_submit= document.querySelector('.submit');
var lat = document.querySelector('#latitude');
var long = document.querySelector('#longitude');
// console.log(lat.value);
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

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FwdGFrMTAiLCJhIjoiY2tyeXB4cHYyMDY2NzJ2cGp5MzRoN21xdSJ9.zdeg5V6RN8vcfFZrZ2rBmw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [long.value, lat.value], // starting position [lng, lat]
zoom: 14 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl({ "visualizePitch": "true" }));

new mapboxgl.Marker({ "color": "#b40219" })
    .setLngLat([long.value, lat.value])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h6>${long.value.substring(0, 10)}, ${lat.value.substring(0, 10)}</h6>`
            )
    )
    .addTo(map);

})
.catch(err => {
    console.error(err);
});
})

