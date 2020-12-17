'use strict';

/* fade-in animations based on animate.css BEGIN */
$(document).ready(function () {
    if (window.innerWidth > 1024) {
        $('.component-l').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated bounceInRight',
            offset: 350
        });
        $('.component-r').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated bounceInLeft',
            offset: 350
        });
        $('#form-wrapper').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated bounceInUp',
            offset: 350
        });
        $('#project-info').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated bounceInRight',
            offset: 350
        });
        $('.demo-wrapper').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated bounceInLeft',
            offset: 350
        });
        $('.info-wrapper').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated bounceInRight',
            offset: 350
        });
    }
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
    $('#up-btn').click(function () {
        $('html,body').animate({
            scrollTop: $('#nav-list').offset().top
        }, 'slow');
    });
});
/* navigation animation END */
