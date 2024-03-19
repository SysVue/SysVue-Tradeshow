const wifiName = document.getElementById("wifi-name");
const wifiFrequency = document.getElementById("wifi-frequency");
const wifiSignal = document.getElementById("wifi-signal");

function onAjaxForWifi(dataJson){
    fetch("http://10.52.0.215:8080/SysVue/WifiDetails",{
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
        },
        body:JSON.stringify(dataJson)
    }).then(response =>{
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`); 
        }
        return response.json();
    }).then(data =>{
        const wifiDetailsString = JSON.stringify(data);
        const wifiDetailsJson = JSON.parse(wifiDetailsString);
    
        wifiName.textContent = wifiDetailsJson.name;
        wifiFrequency.textContent = wifiDetailsJson.frequency;
        
    
        var tempsignal = wifiDetailsJson["signal level"];
    
        if(tempsignal == 'good' | tempsignal == 'Good'){
            wifiSignal.textContent = tempsignal;
            wifiSignal.style.color = "rgba(1, 204, 152, 1)";
        }else{
            wifiSignal.textContent = tempsignal;
            wifiSignal.style.color = "bad";
        }
    })
    
}
