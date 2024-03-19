var imageAddr = "https://4k-uhd.nl/wp-content/uploads/2018/08/4K-3840x2160-Wallpaper-Uitzicht-5.jpg";
var downloadSize = 5739426; //bytes


function InitiateSpeedDetection() {
  window.setTimeout(MeasureConnectionSpeed, 1);
};
function MeasureConnectionSpeed() {
  var startTime, endTime;
  var download = new Image();
  download.onload = function() {
    endTime = (new Date()).getTime();
    showResults();
  }

  startTime = (new Date()).getTime();
  var cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;

  function showResults() {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    // showResultMessage(speedMbps + " Mbps");
    display(speedMbps);
  }
}

function display(str) {
  console.log(str)
  var dial = $(".dial .inner");
  var gauge_value = $(".gauge .value");


  var deg = 0;
  var value = str;
  deg = (value * 177.5) / 100;

  gauge_value.html(value + "mbps");

  dial.css({ 'transform': 'rotate(' + deg + 'deg)' });
  dial.css({ '-ms-transform': 'rotate(' + deg + 'deg)' });
  dial.css({ '-moz-transform': 'rotate(' + deg + 'deg)' });
  dial.css({ '-o-transform': 'rotate(' + deg + 'deg)' });
  dial.css({ '-webkit-transform': 'rotate(' + deg + 'deg)' });


}
function networkCheck(){setInterval(InitiateSpeedDetection,1000)};