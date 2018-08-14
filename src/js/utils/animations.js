/* skillbar-animation BEGIN */
//http://imakewebthings.com/waypoints/guides/jquery-zepto/
function loadSkills() {
    let once = false;
    let waypoints_skills = $('#skills').waypoint({
        handler: function () {
            let skillset = [97.5, 90, 65, 60, 80, 50, 40, 20];

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
        offset: 350
    });
}
/* skillbar-animation END */

/* fade-in animations based on animate.css BEGIN */
$(document).ready(function () {
    $('.component-l').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInRight',
        offset: 350,
    });
    $('.component-r').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInLeft',
        offset: 350,
    });
    $('#skills').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp',
        offset: 350,
        callbackFunction: loadSkills()
    });
    $('#form-wrapper').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp',
        offset: 350,
    });
    $('.floating-square').addClass("hidden").viewportChecker({
        classToAdd: 'circle-visible animated bounceInUp',
        offset: 150,
    });
    $('#project-info').addClass("hidden").viewportChecker({
        classToAdd: 'circle-visible animated bounceInRight',
        offset: 350,
    });
    $('.card-wrapper').addClass("hidden").viewportChecker({
        classToAdd: 'circle-visible animated bounceInRight',
        offset: 350,
    });
});
/* fade-in animations based on animate.css END */

/* navigation animation BEGIN */
function showNavigation() {
    $('#nav-list').fadeToggle();
}

$(document).ready(function () {
    $(".js-link").click(function () {
        let destination;
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
    $('#up-btn').click(function(){
        $('html,body').animate({
            scrollTop: $('#nav-list').offset().top
        }, 'slow');
    })
});
/* navigation animation END */