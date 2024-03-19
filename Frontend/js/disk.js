
const totalDisk = document.getElementById("totaldisk");
const useddisk = document.getElementById("useddisk");
const availdisk = document.getElementById("availdisk");


function buildSemiDonut(used,avail,total){

  totalDisk.textContent = total;
  useddisk.textContent = used;
  availdisk.textContent = avail;

const data = {
  labels: ['Total', 'Used', 'Available'],
  datasets: [{
    data: [total, used, avail],
    // label: ' GB',
    borderWidth: 3,
    backgroundColor: [
      'rgb(255, 99, 132)',   // Red
      'rgb(54, 162, 235)',   // Blue
      'rgb(255, 205, 86)'    // Yellow
    ],
    hoverOffset: 4,
  }],

};


// config 
const config = {
  type: 'doughnut',
  data:data,
  options: {
    aspectRatio:1.5,
    rotation:-(Math.PI),
    circumference:Math.PI
  }
};


// render init block
const myChart = new Chart(
  document.getElementById('diskSpaceChart'),
  config
);
console.log(myChart.options.circumference+" in 45");
// Instantly assign Chart.js version
const chartVersion = document.getElementById('diskSpaceChart');
chartVersion.textContent = Chart.version;
}


function onAjaxForDiskSpace(dataJson){
    console.log("ajax in disk space called");
    
    fetch(`http://10.52.0.215:8080/SysVue/DiskSpace`, {
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
                        const diskSpaceString = JSON.stringify(data);
                        
                        const diskSpaceJson = JSON.parse(diskSpaceString);
                        diskLimitCheck(diskSpaceJson.used,diskSpaceJson.total);

                        buildSemiDonut(diskSpaceJson.used,diskSpaceJson.available,diskSpaceJson.total);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
    
                });
}

