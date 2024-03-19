let cpuLimit;
let diskLimit;
let ramlimit;
let batteryLife;

function getLimitations(){

    console.log("running");
    fetch('http://10.52.0.215:8080/SysVue/GetLimit',{
        method: 'POST',
        body:JSON.stringify(jsonUser)
    }).then(response =>{
        if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        let limitString = JSON.stringify(data);
        let limitJson = JSON.parse(limitString);

        cpuLimit = limitJson.cpu;
        diskLimit = limitJson.disk;
        ramlimit = limitJson.ram;
        batteryLife =  limitJson.batteryCapacity;

        if(cpuLimit != undefined){
            document.getElementById('cpu-toggle').checked = true;
            document.getElementById('cpu').value = cpuLimit;
        }
        if(diskLimit != undefined){
            document.getElementById('disk-toggle').checked = true;
            document.getElementById('disk').value = diskLimit;
        }if(ramlimit != undefined){
            document.getElementById('ram-toggle').checked = true;
            document.getElementById('ram').value = ramlimit;
        }if(batteryLife != undefined){
            document.getElementById('battery-toggle').checked = true;
            document.getElementById('battery').value = batteryLife;
        }


    })
}
// let tempNotification;
function checkedFalse(){
    // clearInterval(tempNotification);

    document.getElementById('cpu-toggle').checked = false;
    document.getElementById('disk-toggle').checked = false;
    document.getElementById('ram-toggle').checked = false;
    document.getElementById('battery-toggle').checked = false;

    // console.log("battery called");
    // tempNotification = setInterval(function(){getLimitations()},1000);
}


function setLimitation(metricValue,limitValue){
    // console.log("set limitations called" + JSON.stringify(dataJson));
    // console.log(document.getElementById('set_btn').previousSibling.id+" in previous element");
    // console.log(document.getElementById('set_btn').previousSibling.value+" in previous element");

    console.log(jsonUser.username+"in 51 notification");

    let inputlimit = {
        username:jsonUser.username,
        metric:metricValue,
        limit_value:limitValue
    }

    console.log(inputlimit + " limitations details");
    fetch('http://10.52.0.215:8080/SysVue/Insertlimit',{
        method: 'POST',
        body:JSON.stringify(inputlimit)
    }).then(response =>{
        if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        let limitString = JSON.stringify(data);
        let limitJson = JSON.parse(limitString);
        notification("Limit added Successfully!");
        console.log(limitJson +"in 43 notification.js");
    })
}


function removeLimitation(metricValue){
    // console.log("set limitations called" + JSON.stringify(dataJson));
    // console.log(document.getElementById('set_btn').previousSibling.id+" in previous element");
    // console.log(document.getElementById('set_btn').previousSibling.value+" in previous element");

    console.log(jsonUser.username+"in 51 notification");

    let inputlimit = {
        username:jsonUser.username,
        metric:metricValue
    }

    console.log(inputlimit + " limitations details");
    fetch('http://10.52.0.215:8080/SysVue/RemoveLimit',{
        method: 'POST',
        body:JSON.stringify(inputlimit)
    }).then(response =>{
        if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        let limitString = JSON.stringify(data);
        let limitJson = JSON.parse(limitString);

        

        console.log(limitJson +"in 114 notification.js");
        if(limitJson){
            notification("Limit removed Successfully!");
        }
    })

}
        function cpuLimitCheck(cpuValue){
            console.log("cpulimitcheck")
            if(cpuLimit != 0 || cpuLimit != undefined){
                let cpuCurrent = (cpuValue/25)*100;

                if(cpuCurrent == cpuLimit || cpuCurrent > cpuLimit){
                    sendMail("cpu","limit exceeded");
                    notification("cpu consumption is exceeding limit!");
                }
            }
        }
        
        function ramLimitCheck(ramValue){
            console.log("ramlimitcheck")
            if(ramlimit != 0 || ramlimit != undefined){

                let ramCurrent = (ramValue/15)*100;

                if(ramCurrent == ramlimit || ramCurrent > ramlimit){
                    sendMail("ram","limit exceeded");
                    notification("ram is exceeding limit! ");
                }
            }
        }
        

        function diskLimitCheck(diskValue,diskTotalValue){
            console.log("disklimitcheck")
            if(diskLimit != 0 || diskLimit != undefined){
                let diskCurrent = (diskValue/diskTotalValue)*100;

                if(diskCurrent == diskLimit || diskCurrent > diskLimit){
                    sendMail("disk","limit exceeded");
                    notification("Disk Space is exceeding limit! ");
                }
            }
        }
        
        function batteryCapacityCheck(batteryCapacity){
            console.log("batterycpcheck")
            if(batteryLife == 0 || batteryLife == undefined){
            let batteryCurrent = batteryCapacity;

            if(batteryCurrent < batteryLife){
                sendMail("battery","is weak !");
                notification("Battery is weak!");
            }
        }
        }

        function notification(content){
            console.log("notification")
            Notification.requestPermission().then(perm =>{
                if(perm === 'granted'){
                    const notification = new Notification(`${jsonUser.username}`,{
                            body:content
                    })
                }
            })
        }

     
        function sendMail(metricValue,actionValue){

            let maildata = {
                mail:jsonUser.mail,
                metric:metricValue,
                action:actionValue
            }

            console.log("mail sent to "+maildata.mail);

            fetch('http://10.52.0.215:8080/SysVue/MailSender',{
                method: 'POST',
                body:JSON.stringify(maildata)
            }).then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            }).then(data => {
            let limitString = JSON.stringify(data);
            let limitJson = JSON.parse(limitString);
            console.log(limitJson+"in 189");
            })
        }
        
        