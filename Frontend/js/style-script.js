let navs = document.querySelectorAll(".navs");
let main_sec = document.querySelectorAll(".main-sec"); 

navs.forEach((ele) => {
  ele.addEventListener("click", () => {
    let init_ele = document.querySelectorAll(".border");

    init_ele.forEach((ev)=>{
      ev.classList.remove("border");
    })
    
    ele.classList.add("border");
  })
  
})

let side_navs = document.querySelectorAll('.right-top-nav');

side_navs.forEach((ele) => {
  ele.addEventListener("click",()=>{
    
    let st_ele=document.querySelector(".border_bot");
    st_ele.classList.remove("border_bot");
    ele.classList.add("border_bot");
    console.log(ele);

    let ide = ele.id;
    
    if(ide == "cpu-nav"){
      upperSection("cpu-cont");
      upperdetails("cpu-con");
    }
    else if(ide == "ram-nav"){
       upperSection("ram-cont");
       upperdetails("ram-con");
       onAjaxForMemorySpace();
    }

    else if(ide=="disk-nav"){
       upperSection("disk-cont");
       upperdetails("disk-con");
    } 
    else if(ide=="net-nav"){
       upperSection("net-cont");
       upperdetails("net-con");
    }    
  })
})


function upperSection(eve){
  
  let graph= document.querySelectorAll(".graph-section");
  graph.forEach((ele)=>{
      let disp = document.getElementById(ele.id);
      if(ele.id==eve){

        disp.style.zIndex="99";
        console.log(ele.id);
      }
      else{
         disp.style.zIndex="0";
      }
  })
}

function upperdetails(eve){
  
  let details= document.querySelectorAll(".cpu-details");
  details.forEach((ele)=>{
      let disp = document.getElementById(ele.id);
      if(ele.id==eve){

        disp.style.zIndex="99";
        console.log(ele.id);
      }
      else{
         disp.style.zIndex="0";
      }
  })
}


let a = document.querySelectorAll('.ischecked');
a.forEach(e => {
  e.addEventListener('click', () => {
    let parent = e.parentElement.parentElement.nextElementSibling;
    if (e.checked == true) {
      parent.style.height = "fit-content";
      parent.style.transition = "0.3s";
      parent.style.padding = "15px";
    }
    else if(e.checked == false){
      console.log(parent.children[1].id+"//");
      sendMail(parent.children[1].id,"enabled");
      removeLimitation(parent.children[1].id);
      parent.style.height = "0px";
      parent.style.padding = "0px";
    }
  })
})

function setRange() {
  let set = document.querySelectorAll("#set_btn");
  set.forEach(e => {
    e.addEventListener('click', () => {
      let hideRange = e.parentElement;
      hideRange.style.height="0px";
      hideRange.style.padding = "0px";
      let preId=e.previousElementSibling.id;
      let preValue=e.previousElementSibling.value;
      sendMail(hideRange.children[1].id,"disabled");
      setLimitation(preId,preValue);
    })
  })
}
setRange();







// -------- Notify Button Click --------//
function notifyButton(){
  document.getElementById('notify-toggle').style.height = 'fit-content';
  // document.getElementById('notify-toggle').style.width = '400px';
  document.getElementById('notify-toggle').style.zIndex = "114";
  document.getElementById('notify-toggle').style.transform="translatex(0)";
}

function hideNotify(){
  document.getElementById('notify-toggle').style.zIndex = "114";
  document.getElementById('notify-toggle').style.transform="translatex(110%)";
}






// To change theme 

function _qs(e){
  return document.querySelector(e);
}

function changeTheme(){
  let themeCheck = document.getElementById('theme-c');
  let small_box=document.querySelectorAll('.info-div');
  let graph_sec = document.querySelectorAll('.graph-section');
  let graph_det = document.querySelectorAll('.cpu-details');
  let theme_const = document.querySelectorAll('.theme-d');
  let os_title = document.querySelectorAll('.basic-content-title');
  let icon1 = document.querySelectorAll('.first-icon');
  let icon2 = document.querySelectorAll('.sec-icon');
  let uicon1 = document.querySelectorAll('.add-ic1');
  let uicon2 = document.querySelectorAll('.add-ic2');
  let accordian = document.querySelectorAll('.accordion');
  let okButton = document.querySelectorAll('.set-btn');
  let allColor=document.querySelectorAll('*');
 
  if(themeCheck.checked==true){
   _qs('.nav-sec').style.backgroundColor="#282828";
   _qs('.pro-name').style.color="#fff";
   _qs('.navs').style.color="#fff";
   _qs('.navs').style.backgroundColor="#121212";
   _qs(".tab-text").style.color="#fff";
   _qs('.line').style.backgroundColor="#282828";
   _qs('.full-section').style.backgroundColor="#121212";
   _qs('.no-users').style.backgroundColor="#121212";
   _qs('.battery-section').style.backgroundColor="#282828";
   _qs('.dial').style.backgroundColor="#282828";
   _qs('.performance-nav').style.backgroundColor="#282828";
   _qs('.name').style.color="#fff";
   _qs('.arrow').style.borderBottom="32px solid #ffffff";
   _qs('.battery-header').style.color="#fff";
   _qs('.battery-animation').style.border="15px solid rgb(63,63,63)";
   _qs('.os-circle').style.fill="#fff";
   _qs('.os-icon-txt').style.fill="#151E53";
   _qs('.moon').style.zIndex="1";
   _qs('.allow-toggle').style.backgroundColor="#282828";
   _qs('.enable-not').style.backgroundColor="#4318FF";
  

   document.getElementsByTagName('p').color="#fff";
   okButton.forEach((ele)=>{
    ele.style.backgroundColor="#4318FF";
   })

   theme_const.forEach((ele)=>{
    ele.style.color="#fff";
   })
   accordian.forEach((ele)=>{
    ele.style.backgroundColor="rgb(63,63,63)";
   })

   allColor.forEach((ele)=>{
    ele.style.color="#fff";
  })
   icon1.forEach((ele1)=>{
    ele1.style.display="none";
   })
   icon2.forEach((ele2)=>{
    ele2.style.display="block";
   })

   uicon1.forEach((ele2)=>{
    ele2.style.display="none";
   })
   uicon2.forEach((ele2)=>{
    ele2.style.display="block";
   })
  os_title.forEach((ele2)=>{
    ele2.style.color="rgba(255,255,255,0.7)";
  })

    small_box.forEach((ele) => {
      ele.style.backgroundColor="#282828";
    })

    graph_sec.forEach((ele)=>{
      ele.style.backgroundColor="#282828";
    })

    graph_det.forEach((ele)=>{
      ele.style.backgroundColor="#282828";
    })

    
    
  }
  else{
   _qs('.nav-sec').style.backgroundColor='#fff';
   _qs('.line').style.backgroundColor="#F4F7FE";
   _qs('.no-users').style.backgroundColor="#F4F7FE";
   _qs('.navs').style.backgroundColor='#F4F7FE';
   _qs('.full-section').style.backgroundColor="#F4F7FE"; 
   _qs('.dial').style.backgroundColor="#fff";
   _qs('.battery-section').style.backgroundColor="#fff";
   _qs('.performance-nav').style.backgroundColor="#fff";
   _qs('.arrow').style.borderBottom="32px solid black";
   _qs('.battery-animation').style.border="15px solid #F4F7FE";
   _qs('.os-icon-txt').style.fill="#fff";
   _qs('.os-circle').style.fill="#151E53";
   _qs('.moon').style.zIndex="-1";
   _qs('.enable-not').style.backgroundColor="#2B3674";
   _qs('.allow-toggle').style.backgroundColor="#fff";

   okButton.forEach((ele)=>{
    ele.style.backgroundColor="#2B3674";
   })
   accordian.forEach((ele)=>{
    ele.style.backgroundColor="#efefef";
   })
  allColor.forEach((ele)=>{
    ele.style.color="#2B3674";
  })
  icon1.forEach((ele1)=>{
    ele1.style.display="block";
   })
   icon2.forEach((ele2)=>{
    ele2.style.display="none";
   })

   os_title.forEach((ele2)=>{
    ele2.style.color="#A3AED0";
  })
  
    small_box.forEach((ele) => {
      ele.style.backgroundColor="#fff";
    })
    graph_sec.forEach((ele)=>{
      ele.style.backgroundColor="#fff";
    })
    graph_det.forEach((ele)=>{
      ele.style.backgroundColor="#fff";
    })

    document.getElementById('cpu-txt');
    theme_const.forEach((ele)=>{
      ele.style.color="#fff";  
     })

     uicon1.forEach((ele2)=>{
      ele2.style.display="block";
     })
     uicon2.forEach((ele2)=>{
      ele2.style.display="none";
     })

  }
}