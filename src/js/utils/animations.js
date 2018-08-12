/* skillbar-animation BEGIN */
//http://imakewebthings.com/waypoints/guides/jquery-zepto/
$(function () {
    let once = false;
    let waypoints_skills = $('#skills').waypoint({
        handler: function () {
            let skillset = [100, 90, 65, 60, 80, 50, 40, 20];

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

/* fade-in animations based on animate.css BEGIN */
$(document).ready(function () {
    $('.component-l').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInRight',
        offset: 300
    });
    $('.component-r').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInLeft',
        offset: 300
    });
    $('#skills').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated slideInUp',
        offset: 300
    });
});
/* fade-in animations based on animate.css END */

/* navigation animation BEGIN */
$(document).ready(function () {
    $(".js-link").click(function () {
        console.log("hi");
        console.log(this.id);

        let destination
        switch (this.id) {
            case 'js-l1':
                destination = '#skills-row'
                break;
            case 'js-l2':
                destination = '#about-row'
                break;
            case 'js-l3':
                destination = '#project-row'
                break;
            case 'js-l4':
                destination = '#contact-row'
                break;
            default:
                break;
        }
        console.log(destination);

        $('html,body').animate({
                scrollTop: $(destination).offset().top
            },
            'slow');
    });
});
/* navigation animation END */