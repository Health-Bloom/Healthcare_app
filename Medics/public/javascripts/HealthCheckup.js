var box1=document.querySelector('#box1');
var box2=document.querySelector('#box2');
var box3=document.querySelector('#box3');
var bmi=document.querySelector('#BMI');

//-----------------------------------------//

function handleSubmit1(){
var n = document.querySelector('#input1');
var age = document.querySelector('#input2');
var gender = document.querySelector('#input3');
var height = document.querySelector('#input4');
var weight = document.querySelector('#input5');
var activity = document.querySelector('#input6');

 box1.style.display="inline-block";
 bmi.style.display="block";

age=parseInt(age.value);
height=parseInt(height.value);
weight=parseInt(weight.value);
activity=parseInt(activity.value);

var name=document.querySelector('.name');
var BMI=document.querySelector('.bmi');
var health=document.querySelector('.health');
var d1=document.querySelector('.cal');
var p1=document.querySelector('.bprotein');
var f1=document.querySelector('.bfat');
var c1=document.querySelector('.bcarbs');

name.innerHTML=n.value;

fetch('https://mega-fitness-calculator1.p.rapidapi.com/bmi?weight='+weight+'&height='+height, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "mega-fitness-calculator1.p.rapidapi.com",
		"x-rapidapi-key": "ee57f911c9msh54de0a6c51c79a3p153facjsn8e9674e30bb6"
	}
})
.then(response =>  response.json())
.then(data=>{
console.log(data.info.bmi);
BMI.innerHTML=data.info.bmi;
health.innerHTML=data.info.health;
})



  fetch('https://fitness-calculator.p.rapidapi.com/macrocalculator?age='+age+'&gender='+gender.value+'&height='+height+'&weight='+weight+'&activitylevel='+activity+'&goal=extremelose', {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ee57f911c9msh54de0a6c51c79a3p153facjsn8e9674e30bb6",
		"x-rapidapi-host": "fitness-calculator.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data=>{
    d1.innerHTML="Calories intake required : "+data.data.calorie+ " gm";
    p1.innerHTML=(data.data.balanced.protein).toFixed(2)+" gm";
    f1.innerHTML=(data.data.balanced.fat).toFixed(2)+ " gm";
    c1.innerHTML=(data.data.balanced.carbs).toFixed(2)+ " gm";
})
}

function handleSubmit2(){

var age = document.querySelector('#input2');
var gender = document.querySelector('#input3');
var height = document.querySelector('#input4');
var weight = document.querySelector('#input5');
var activity = document.querySelector('#input6');
    
var p2=document.querySelector('.hprotein');
var f2=document.querySelector('.hfat');
var c2=document.querySelector('.hcarbs');

box2.style.display="inline-block";

age=parseInt(age.value);
height=parseInt(height.value);
weight=parseInt(weight.value);
activity=parseInt(activity.value);
   
   
    fetch('https://fitness-calculator.p.rapidapi.com/macrocalculator?age='+age+'&gender='+gender.value+'&height='+height+'&weight='+weight+'&activitylevel='+activity+'&goal=extremelose', {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ee57f911c9msh54de0a6c51c79a3p153facjsn8e9674e30bb6",
            "x-rapidapi-host": "fitness-calculator.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data=>{
        console.log(data);
        p2.innerHTML=(data.data.highprotein.protein).toFixed(2)+" gm";
        f2.innerHTML=(data.data.highprotein.fat).toFixed(2)+ " gm";
        c2.innerHTML=(data.data.highprotein.carbs).toFixed(2)+ " gm";
    })

}
function handleSubmit3(){

var age = document.querySelector('#input2');
var gender = document.querySelector('#input3');
var height = document.querySelector('#input4');
var weight = document.querySelector('#input5');
var activity = document.querySelector('#input6');

box3.style.display="inline-block";
age=parseInt(age.value);
height=parseInt(height.value);
weight=parseInt(weight.value);
activity=parseInt(activity.value);
 
var p3=document.querySelector('.lfprotein');
var f3=document.querySelector('.lffat');
var c3=document.querySelector('.lfcarbs');
   
    fetch('https://fitness-calculator.p.rapidapi.com/macrocalculator?age='+age+'&gender='+gender.value+'&height='+height+'&weight='+weight+'&activitylevel='+activity+'&goal=extremelose', {
       "method": "GET",
       "headers": {
           "x-rapidapi-key": "ee57f911c9msh54de0a6c51c79a3p153facjsn8e9674e30bb6",
           "x-rapidapi-host": "fitness-calculator.p.rapidapi.com"
       }
   })
   .then(response => response.json())
   .then(data=>{
       console.log(data);
       p3.innerHTML=(data.data.lowfat.protein).toFixed(2)+" gm";
       f3.innerHTML=(data.data.lowfat.fat).toFixed(2)+ " gm";
       c3.innerHTML=(data.data.lowfat.carbs).toFixed(2)+ " gm";
   })
}
   