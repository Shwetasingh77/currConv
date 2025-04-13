const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select"); 
const msg = document.querySelector(".msg");

for(let select of dropdowns){  
for( code in countryList){
    let newOption= document.createElement("option");
    newOption.innerText=code;
    newOption.value=code;
    select.append(newOption);
    if(select.name==="from" && code==="USD"){
        newOption.selected="selected";
    }else if(select.name==="to" && code==="INR"){ 
        newOption.selected="selected";
        
    }
    select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}

const updateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
   evt.preventDefault(); 
    let amount =document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
     try {
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    if (!rate) {
      msg.innerText = "Exchange rate not available.";
      return;
    }
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error(error);
  }
});

