const totalram = document.getElementById("totalram");
const usedram = document.getElementById("usedram");
const freeram = document.getElementById("freeram");
const sharedram = document.getElementById("sharedram");
const cacheram = document.getElementById("cacheram");
const availram = document.getElementById("availram"); 

function buildPieChart(allocation,usage){
    var ctx = document.getElementById("myPieChart").getContext('2d');

    var keys = [allocation[0],allocation[2],allocation[3],allocation[4],allocation[5]];
    var values = [usage[0],usage[2],usage[3],usage[4],usage[5]];

    ramLimitCheck(usage[0]);

    totalram.textContent=usage[1];
    usedram.textContent=usage[0];
    freeram.textContent=usage[2];
    sharedram.textContent=usage[3];
    cacheram.textContent=usage[4];
    availram.textContent=usage[5];
    
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels:keys,
            datasets: [{    
                data: values, // Specify the data values array
              
                 // Add custom color border 
                backgroundColor: ['#22CECE', '#36A2EB', '#FF3D67', '#FF9124','#FFC233'], // Add custom color background (Points and Fill)
                borderWidth: 2,
                 // Specify bar border width
            }]},        
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
          plugins: {
            legend: {
                labels: {
                    fontSize: 6 // Set the font size for the labels
                }
            }
        }

        },
        
    });
}
function onAjaxForMemorySpace(dataJson){
    console.log("ram memory");
    fetch("http://10.52.0.215:8080/SysVue/MemorySpace", {
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
                        const memorySpaceString = JSON.stringify(data);
    
                        const memorySpaceJson = JSON.parse(memorySpaceString);

                        const keys = Object.keys(memorySpaceJson);

                        const values = keys.map(key => memorySpaceJson[key]/1000);

                        console.log(keys,values);
                        buildPieChart(keys,values);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
    
                });
            }