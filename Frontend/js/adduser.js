// window.addEventListener('click', (ev)=>{
//     if (ev.target.classList.contains("")) {
        
//     }
// })
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
}

function _(str){
  return document.getElementById(str);
}

function loginpage(){
    _('full-section').style.zIndex = "0";
    console.log("login page called");
    ADDED_DIV.style.opacity="0";
    USERNAME.value="";
    USERPASS.value = "";
    IP.value = "";
    USERMAIL.value = "";
  _('login').style.transform = "translateY(50%)";
  _('login').style.zIndex = "102";
  _('black-bg').style.zIndex="101";
}
function showTermsAndConditions(){
  _('terms').style.scale = "1";
}
function acceptTerms(){
  
  _('terms').style.scale = "0";
  _('termsCheckBox').checked = true;
}
function closeTerms(){
  _('terms').style.scale = "0";
}

// for checking ip address

const IP=document.getElementById("ipa");

const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function validateIP(ip) {
    return ipPattern.test(ip);
}



const USERNAME = document.getElementById('user-inp');
const USERPASS = document.getElementById('user-pass');
const USERMAIL = document.getElementById('email-id');

function checkInputDetails(){
        
    checkIP();

    
    if(USERNAME.value === "" || USERPASS.value === "" || IP.value === "" || _('termsCheckBox').checked == false ){
        console.log("heyy itz null= false");
    }else{
        apiCall();
        
        _('termsCheckBox').checked = false;
        ADDED_DIV.style.opacity="0";
    }
}

const ADDED_DIV = _('added-success');

// let jsonUser = {
//     username:USERNAME.value,
//     password:USERPASS.value,
//     ip:IP.value
// }
let dataJson;

let setIntervalCpu;
function apiCall(){

    dataJson = {
        username :USERNAME.value,
        password :USERPASS.value,
        ipaddress :IP.value,
        mail :USERMAIL.value
    }
    document.querySelector('.loader').style.display="block";
    
    fetch("http://10.52.0.215:8080/SysVue/Checkuser",{
        method: 'POST',
		    headers: {
		        // 'Content-Type': 'application/json',
		    },
		    body:JSON.stringify(dataJson)
    })
    .then(response => {
        
        if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
        }
            return response.json(); // Get the response as a JSON   
    }).then(data => {
        document.querySelector('.loader').style.display="none";

        const userCheckString = JSON.stringify(data);
        const userCheckJson = JSON.parse(userCheckString);

        console.log(userCheckJson.result + "in checkuser 112");

        if(userCheckJson.result == true || userCheckJson.result == 'true' ){
            ADDED_DIV.style.opacity="1";
            console.log(IP.value,USERNAME.value);
            clearInterval(setIntervalCpu);

            addUserDiv(dataJson,USERNAME.value+'@');

            
        }
        else{
            ADDED_DIV.style.opacity="1";
            ADDED_DIV.innerText = "Invalid Credentials! ";
            ADDED_DIV.style.color = "red";
        }
    })
    checkIP();
}
const VALID_IP = document.getElementById('inv-ip');

function checkIP(){
    console.log(IP); 
    console.log(validateIP(IP.value));

    if(!validateIP(IP.value)){
        console.log("invalid ip");
        VALID_IP.style.opacity="1";
    }else{
        return console.log("ip valid");
    }

}
let count = 0;
function addUserDiv(obj,id){

    
    count++;
    console.log(count);
    console.log(obj.username +id);
    
    let p = document.createElement('div');
    p.className="user-div";
    p.innerHTML=(`<div class="navs user-div border">
    
    <img src="./Customer.png" class="nav-logo add-ic1">
    <img src="./Customer 1.png" class="nav-logo add-ic2">
        <p class="tab-text" id="cpu-txt" onclick="displayProduct('${obj.username}','${obj.password}','${obj.ipaddress}')" 
        value='${obj.username+" "+obj.password+" "+obj.ipaddress}'>${obj.username}</p>
        <i class="fa-solid fa-trash-can icon delete-icon" id='${id}' onclick="deleteUserDiv('${id}')"></i>
    </div>`);

    _('login').style.zIndex="99";
    _('black-bg').style.zIndex="-5";
    // sendMail(obj.username,"added");
    document.querySelector('.machines-list').appendChild(p);
    displayProduct(obj.username,obj.password,obj.ipaddress ,obj.mail );

    changeNav();
}

function deleteUserDiv(id){
    console.log(id);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById(`${id}`).parentElement.remove();
            count--;
            
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(()=>{
            if(count==0){
                loginpage(document.location.href="#no-users");
                _('login').style.transform = "translateY(-150%)";
                _('login').style.zIndex = "90";
                _('black-bg').style.zIndex="-5";
            }
            else{
               let user =document.querySelector(".user-div").childNodes[0].childNodes[4].getAttribute('value').split(" ");
               sendMail(obj.username,"removed");
            //    console.log(user + "200 in add user");
               displayProduct(user[0],user[1],user[2],user[3])
            }
          })
           
        }

      });
    
}


function closeLogin(){
    _('login').style.transform = "translateY(-150%)";
    _('black-bg').style.zIndex="-5";
}
let cpuCall;
let jsonUser;

function displayProduct(n,p,i,m){

    jsonUser = {
        username:n,
        password:p,
        ipaddress:i,
        mail:m
    }
    console.log("run in 151",jsonUser);

    _('name').textContent = capitalizeFirstLetter(jsonUser.username);

    _('full-section').style.zIndex = "105";
    onAjaxForBasic(jsonUser);
    onAjaxForMemorySpace(jsonUser);
    onAjaxForDiskSpace(jsonUser);
    onAjaxForWifi(jsonUser);
    networkCheck();
    sample2(jsonUser);
    sample(jsonUser);
    checkedFalse();
    getLimitations();
}

function capitalizeFirstLetter(str) {
    let words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}



function changeNav(){
    const machines = document.querySelectorAll('.user-div');

    machines.forEach((ele) => {
        ele.addEventListener("click", () => {
            ele.classList.add("border");
            document.querySelectorAll('.user-div').forEach(ele2 => {
                if (ele2 !== ele){
                    ele2.classList.remove("border");
                }
            })
        })
    });
}


