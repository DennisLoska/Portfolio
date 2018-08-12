'use strict';

/* skillbar-animation BEGIN */
//http://imakewebthings.com/waypoints/guides/jquery-zepto/
function loadSkills() {
    var once = false;
    var waypoints_skills = $('#skills').waypoint({
        handler: function handler() {
            var skillset = [100, 90, 65, 60, 80, 50, 40, 20];

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
        offset: 350
    });
}
/* skillbar-animation END */

/* fade-in animations based on animate.css BEGIN */
$(document).ready(function () {
    $('.component-l').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInRight',
        offset: 350
    });
    $('.component-r').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInLeft',
        offset: 350
    });
    $('#skills').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp',
        offset: 350,
        callbackFunction: loadSkills()
    });
    $('#form-wrapper').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp',
        offset: 250
    });
});
/* fade-in animations based on animate.css END */

/* navigation animation BEGIN */
function showNavigation() {
    $('#nav-list').fadeToggle();
}

$(document).ready(function () {
    $(".js-link").click(function () {
        var destination = void 0;
        switch (this.id) {
            case 'js-l1':
                destination = '#skills-row';
                break;
            case 'js-l2':
                destination = '#about-row';
                break;
            case 'js-l3':
                destination = '#project-row';
                break;
            case 'js-l4':
                destination = '#contact-row';
                break;
            default:
                break;
        }
        $('html,body').animate({
            scrollTop: $(destination).offset().top
        }, 'slow');
    });
});
/* navigation animation END */
