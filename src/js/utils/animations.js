/* skillbar-animation BEGIN */
$(function () {
    let waypoints = $('#skills').waypoint({
        handler: function () {
            let skillset = [100, 90, 65, 60, 80, 50, 40, 20];
            let once = false;

            function loadBars(time) {
                let timeOut;
                $('.skill-percent').each(function (i) {
                    if (time <= skillset[i])
                        $(this).css('width', time + '%');
                    else clearTimeout(timeOut);
                });
                timeOut = setTimeout(function () {
                    loadBars(time + 4)
                }, 20)
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