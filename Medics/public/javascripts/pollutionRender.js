var poll_submit= document.querySelector('.submit');
var lat = document.querySelector('#latitude');
var long = document.querySelector('#longitude');
// console.log(lat.value);
var input0 = document.querySelector('.input0');
var input1 = document.querySelector('.input1');
var input2 = document.querySelector('.input2');
var input3 = document.querySelector('.input3');
var input4 = document.querySelector('.input4');
var input5 = document.querySelector('.input5');
var input6 = document.querySelector('.input6');


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
    var i0=data.data[0].aqi;
    var i1=data.data[0].co;
    var i2=data.data[0].no2;
    var i3=data.data[0].o3;
    var i6=data.data[0].so2;

    input0.innerHTML=" : "+i0+ " ppm";
    input1.innerHTML=" : "+i1+ " ppm";
    input2.innerHTML=" : "+i2+ " ppm";
    input3.innerHTML=" : "+i3+ " ppm";
    input6.innerHTML=" : "+i6+" ppm";


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

