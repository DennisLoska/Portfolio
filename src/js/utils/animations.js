$(function () {
    let skillset = [100, 90, 65, 60, 80, 50, 40, 20];
    let once = false
    let timeOut;

    function stopTimer() {
        clearTimeout(timeOut)
    }

    let waypoints = $('#skills').waypoint({
        handler: function () {
            console.log(once);

            function loadBars(time) {
                $('.skill-percent').each(function (i) {
                    if (time <= skillset[i])
                        $(this).css('width', time + '%');
                    else stopTimer()
                });
                timeOut = setTimeout(function () {
                    loadBars(time + 4)
                }, 20)
            }
            if (!once) {
                loadBars(0)
                once = true
            }
        },
        offset: '40%'
    })
})