const batteryPercentage = document.getElementById("battery-percentage");
const batteryPerformance = document.getElementById("battery-performance");
const batteryEstimatedTime = document.getElementById("battery-estimated-time");
const batteryStatus = document.getElementById("battery-status");
const dayUptime = document.getElementById("uptime-day");
const hrUptime = document.getElementById("uptime-hr");
const minUptime = document.getElementById("uptime-mins");

// summa

function callBatteryUpTime(dataJson){
  // console.log(dataJson+"10th battery.js");
    fetch("http://10.52.0.215:8080/SysVue/BatteryPercent",{
      method: 'POST',
      //  mode: "no-cors",
		    headers: {
		        // 'Content-Type': 'application/json',
		    },
		    body:JSON.stringify(dataJson)
    })
    .then(response => {
      console.log(response+"18 battery.js");
        if (!response.ok) {
          
               throw new Error(`HTTP error! Status: ${response.status}`);
        }
            return response.json(); // Get the response as a JSON   
    }).then(data => {
        const batteryDetailsString = JSON.stringify(data);
    
        const batteryDetailsJson = JSON.parse(batteryDetailsString);
    
        console.log(batteryDetailsJson);
        batteryPercentage.textContent = batteryDetailsJson.Percent;
        
        
        console.log(batteryDetailsJson.capacity);
        if(batteryDetailsJson.capacity > 60){
          batteryPerformance.textContent = "Good";
        }else{
          batteryPerformance.textContent = "Bad";
        }
        batteryCapacityCheck(batteryDetailsJson.capacity);
        batteryEstimatedTime.textContent = batteryDetailsJson.time;
        batteryStatus.textContent = batteryDetailsJson.Status;
        battery(batteryDetailsJson.Percent);

        dayUptime.textContent = batteryDetailsJson.day;
        minUptime.textContent = batteryDetailsJson.min;
        hrUptime.textContent = batteryDetailsJson.hour;
        console.log(batteryDetailsJson.day+"//"+batteryDetailsJson.min+"//"+batteryDetailsJson.min);
    
    })
}


function battery(charge) {
    // console.log("battery called");
    let chargep = charge.endsWith('%') ? charge.slice(0, -1) : charge;
    
      var index = 0;
      $(".battery .bar").each(function() {
        var power = Math.round(chargep / 10);
        if (index != power) {
          $(this).addClass("active");
          index++;
        } else {
          $(this).removeClass("active");
        }
      });
    }
    
    $(".battery .bar").click(function() {
      battery(parseInt($(this).data("power")));
    });
  let temp;
    function sample2(dataJson){
      clearInterval(temp);
      temp = setInterval(function(){callBatteryUpTime(dataJson)},1000);
    }
