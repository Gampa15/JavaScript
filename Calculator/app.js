const inputValue = document.getElementById("userinput");
const special = document.querySelectorAll(".special-keys").forEach(function(item){
    console.log(item);
    item.addEventListener("click", function(e){
        if(e.target.innerText === "AC"){
            inputValue.innerText = "0";
        }
        else if(e.target.innerText === "DEL"){
            inputValue.innerText = inputValue.innerText.substring(0, inputValue.innerText.length - 1);
            if(inputValue.innerText.length == 0){
                inputValue.innerText = "0";
            }
        }
    });
});
const calculate = document.querySelectorAll(".math-operations").forEach(function(item){
    console.log(item);
    item.addEventListener("click", function(e){
        let lastValue = inputValue.innerText.substring(inputValue.innerText.length, inputValue.innerText.length - 1);
        console.log(lastValue);
        if(!isNaN(lastValue) && e.target.innerText === "="){
            inputValue.innerText = eval(inputValue.innerText);
        }
        else{
            if(!isNaN(lastValue)){
                inputValue.innerText += e.target.innerText;
            }
        }
    });
});
const number = document.querySelectorAll(".numbers").forEach(function(item){
    console.log(item);
    item.addEventListener("click", function(e){
        if(inputValue.innerText === "0")
            inputValue.innerText = "";
        inputValue.innerText += e.target.innerText.trim();
    });
});