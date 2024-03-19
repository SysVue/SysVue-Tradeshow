
function _(str){
    return document.getElementById(str);
}

function onAjaxForBasic(dataJson){
    document.querySelector('.loader').style.display="block";
    fetch(`http://10.52.0.215:8080/SysVue/BasicDetails`,{
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
        

        let basicString = JSON.stringify(data);
        let basicJson = JSON.parse(basicString);

        console.log(basicJson);
        
        _('os').textContent = basicJson.osname;
        _('hostname').textContent = basicJson.hostname;
        _('osversion').textContent = basicJson.osversion;
        _('ip').textContent = basicJson.ip;

        document.querySelector('.loader').style.display="none";

    })
}
