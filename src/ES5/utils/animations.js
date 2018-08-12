'use strict';

$(function () {
    var skillset = [100, 90, 65, 60, 80, 50, 40, 20];
    var once = false;
    var timeOut = void 0;

    function stopTimer() {
        clearTimeout(timeOut);
    }

    var waypoints = $('#skills').waypoint({
        handler: function handler() {
            console.log(once);

            function loadBars(time) {
                $('.skill-percent').each(function (i) {
                    if (time <= skillset[i]) $(this).css('width', time + '%');else stopTimer();
                });
                timeOut = setTimeout(function () {
                    loadBars(time + 4);
                }, 20);
            }
            if (!once) {
                loadBars(0);
                once = true;
            }
        },
        offset: '40%'
    });
});
