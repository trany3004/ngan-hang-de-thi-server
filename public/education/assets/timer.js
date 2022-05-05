
function secondPassed() {
    var cur_date = new Date();
    var hour = cur_date.getHours();
    var minutes = cur_date.getMinutes();
    var seconds = cur_date.getSeconds();
    var minutes_remain = parseInt(59 - parseInt(minutes));
    var seconds_remain = parseInt(60 - parseInt(seconds));

    var timers = document.getElementsByClassName('timer');
    for (var i = 0; i < timers.length; i++) {
        timers[i].innerHTML = minutes_remain+":"+seconds_remain;
    }

}

var countdownTimer = setInterval(secondPassed, 1000);

