'use strict';

/* skillbar-animation BEGIN */
//http://imakewebthings.com/waypoints/guides/jquery-zepto/
$(function () {
    var waypoints = $('#skills').waypoint({
        handler: function handler() {
            var skillset = [100, 90, 65, 60, 80, 50, 40, 20];
            var once = false;

            function loadBars(time) {
                var timeOut = void 0;
                $('.skill-percent').each(function (i) {
                    if (time <= skillset[i]) $(this).css('width', time + '%');else clearTimeout(timeOut);
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
        offset: '50%'
    });
});
/* skillbar-animation END */
