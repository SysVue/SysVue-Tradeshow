const cpuProcess = document.getElementById("cpu-process");
const cpuCore = document.getElementById("cpu-core");
const cpuSocket = document.getElementById("cpu-socket");
const cpuThread = document.getElementById("cpu-thread");
const cpuTemp = document.getElementById("cpu-temp");
const cpuMinSpeed= document.getElementById("cpu-min-speed");
const cpuMaxSpeed= document.getElementById("cpu-max-speed");

var ctx_live = document.getElementById("mycanvas").getContext('2d');

var myChart = new Chart(ctx_live, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      data: [0,0,0],
      borderWidth: 5,
      borderColor: 'rgba(68, 32, 255, 0.8)',
      label: 'tin',
      lineTension: 0.5,
      pointRadius: 0,
      fill:false
    }]
  },
  options: {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          fontSize: 16,
          display: true
        },
        gridLines: {
          display: false // remove y-axis grid lines
        }
      }],
      xAxes: [{
        ticks: {
          fontSize: 16,
          display: false
        },
        gridLines: {
          display: false // remove x-axis grid lines
        }
      }]
    }
  }
});

var getData = function(dataJson) {
  fetch("http://10.52.0.215:8080/SysVue/CpuUsage", {
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
    })
    .then(data => {
      const cpuUsage = data.usage;
      // console.log(cpuUsage);
      cpuLimitCheck(cpuUsage);
      myChart.data.labels.push(new Date().toLocaleTimeString());
      myChart.data.datasets[0].data.push(cpuUsage);

      if (myChart.data.labels.length > 20) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
      }

      myChart.update();
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
};

function onAjaxForCpu(dataJson){

  // console.log("called in cpu-chart"); 
  getData(dataJson);
  fetch("http://10.52.0.215:8080/SysVue/CpuDetails",{
    method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
        },
        body:JSON.stringify(dataJson)
  })
  .then(response =>{
    if(!response.ok){
      throw new Error(`HTTP error! Status:${response.status}`)
    }
    return response.json();
  })
  .then(data =>{
    const cpuDetailsString = JSON.stringify(data);

    const cpuDetailsJson = JSON.parse(cpuDetailsString);


    cpuProcess.textContent = cpuDetailsJson.process;
    cpuCore.textContent = cpuDetailsJson.cores;
    cpuTemp.textContent = cpuDetailsJson.temperature;
    cpuThread.textContent = cpuDetailsJson.thread;
    cpuSocket.textContent = cpuDetailsJson.socket;
    cpuMaxSpeed.textContent = parseFloat(cpuDetailsJson.maxspeed).toFixed(1).replace(/\.0+$/, '');
    cpuMinSpeed.textContent = parseFloat(cpuDetailsJson.minspeed).toFixed(1).replace(/\.0+$/, '');

  })
}
let tempinterval;
function sample(dataJson){
  clearInterval(tempinterval);
  // console.log("Sample yet to call" + JSON.stringify(dataJson));

  tempinterval = setInterval(function(){onAjaxForCpu(dataJson)},1000);
  // console.log("sample called");

}


