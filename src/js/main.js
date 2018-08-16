/* AJAX contact form BEGIN */
$(function () {
    $('#contact-form').submit(function (event) {
        /* stop form from submitting normally */
        event.preventDefault();
        $('#form-btn').addClass('blue-border');
        /* get the action attribute from the <form action=""> element */
        let form = $(this);
        let url = form.attr('action');

        let name = $('#input-name').val();
        let email = $('#input-email').val();
        let phone = $('#input-phone').val();
        let subject = $('#input-subject').val();
        let message = $('#input-message').val();

        let contact_info = {
            "name": name,
            "email": email,
            "phone": phone,
            "subject": subject,
            "message": message,
            "recaptcha": grecaptcha.getResponse()
        };

        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(contact_info),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    let response =
                        `<div class="row justify-content-center align-items-center" id="form-response">
                      <div class="col-12 text-center">
                        <h2 class="component-l">Everything worked this time!</h2>
                        <img id="success-img" src="img/mail_checked.png" alt=Email successsfully send!">
                       </div>
                      </div>`;
                    $('#form-wrapper').addClass("hidden").html(response);
                    $('#form-response').viewportChecker({
                        classToAdd: 'visible animated bounceInDown',
                        offset: 100,
                    });
                } else if (!data.success && data.responseCode != 1) {
                    let failed =
                        `<div class="row justify-content-center align-items-center" id="form-response-failed">
                      <div class="col-12 text-center">
                        <h2 class="component-l">Sorry, something went wrong here. Please try it again later, if it does not work anytime soon!</h2>
                       </div>
                      </div>`
                    $('#form-info').addClass("hidden").html(failed).viewportChecker({
                        classToAdd: 'visible animated bounceInDown',
                        repeat: true,
                        offset: 100,
                    });
                } else if (data.responseCode == 1) {
                    let no_captcha =
                        `<div class="row justify-content-center align-items-center" id="form-response-failed">
                  <div class="col-12 text-center">
                    <h2 class="component-l">Don't forget to solve the captcha!</h2>
                   </div>
                  </div>`
                    $('#form-info').addClass("hidden").html(no_captcha).viewportChecker({
                        classToAdd: 'visible animated bounceInDown',
                        repeat: true,
                        offset: 100,
                    });
                }
            }
        });
    })
})
/* AJAX contact form END */

/* day-night BEGIN */
$(function () {
    $('#toggle--daynight').click(function () {
        let checked = $(this).prop('checked');
        if (checked) {
            $('html').css('background-color', '#ffffff');
            $('html').css('color', '#000000');
            $('body').css('background-color', '#ffffff');
            $('main').css('background-color', '#ffffff');
            $('main').css('color', '#000000');
            if (window.innerWidth <= 768)
                $('#nav-list').css('background-color', '#ffffff');
            $('header').css('background-color', '#ffffff');
            $('.nav-item>a').css('color', '#000000');
            $('#form-btn').css('color', '#000000');
            $('#form-btn').css('background-color', '#ffffff');
            $('#skills').css('background-color', '#dee2e6')
            $('.form-control').css('background-color', '#dee2e6')

            $("#form-btn").hover(function () {
                $(this).css("background-color", "#dee2e6")
            }, function () {
                $(this).css("background-color", "#ffffff");
            });
            $("#up-btn").hover(function () {
                $(this).css("background-color", "#ffffff")
            }, function () {
                $(this).css("background-color", "#333333");
            });
        } else {
            $('html').css('background-color', '#1a1a1a');
            $('html').css('color', '#ffffff');
            $('body').css('background-color', '#1a1a1a');
            $('main').css('background-color', '#1a1a1a');
            $('main').css('color', '#ffffff');
            if (window.innerWidth <= 768)
                $('#nav-list').css('background-color', '#1a1a1a');
            $('header').css('background-color', '#1a1a1a');
            $('.nav-item>a').css('color', '#ffffff');
            $('#form-btn').css('color', '#ffffff');
            $('#form-btn').css('background-color', '#1a1a1a');
            $('#skills').css('background-color', '#333333')
            $('.form-control').css('background-color', '#333333')

            $("#form-btn").hover(function () {
                $(this).css("background-color", "#333333")
            }, function () {
                $(this).css("background-color", "#1a1a1a");
            });
            $("#up-btn").hover(function () {
                $(this).css("background-color", "#1a1a1a")
            }, function () {
                $(this).css("background-color", "#33333");
            });
        }
    })
})

/* day-night END */