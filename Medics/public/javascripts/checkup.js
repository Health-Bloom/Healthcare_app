
var box1=document.querySelector('#box1');
var box2=document.querySelector('#box2');
var box3=document.querySelector('#box3');

//-----------------------------------------------------------------
function handleSubmit1(){
    var age = document.querySelector('#input2');
var gender = document.querySelector('#input3');
var height = document.querySelector('#input4');
var weight = document.querySelector('#input5');
var activity = document.querySelector('#input6');

 box1.style.display="inline-block";
  age=parseInt(age.value);
  height=parseInt(height.value);
  weight=parseInt(weight.value);
  activity=parseInt(activity.value);

  var d1=document.querySelector('.cal');
var p1=document.querySelector('.bprotein');
var f1=document.querySelector('.bfat');
var c1=document.querySelector('.bcarbs');

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
    d1.innerHTML="Calories intake : "+data.calorie+ " gms";
    p1.innerHTML=data.balanced.protein+" gms";
    f1.innerHTML=data.balanced.fat+ " gms";
    c1.innerHTML=data.balanced.carbs+ " gms";
   
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
       p2.innerHTML=data.highprotein.protein+" gms";
       f2.innerHTML=data.highprotein.fat+ " gms";
       c2.innerHTML=data.highprotein.carbs+ " gms";
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
       p3.innerHTML=data.lowfat.protein+" gms";
       f3.innerHTML=data.lowfat.fat+ " gms";
       c3.innerHTML=data.lowfat.carbs+ " gms";
   })
   
   }
   