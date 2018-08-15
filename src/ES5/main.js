'use strict';

/* AJAX contact form BEGIN */
$(function () {
    $('#contact-form').submit(function (event) {
        /* stop form from submitting normally */
        event.preventDefault();
        $('#form-btn').addClass('blue-border');
        /* get the action attribute from the <form action=""> element */
        var form = $(this);
        var url = form.attr('action');

        var name = $('#input-name').val();
        var email = $('#input-email').val();
        var phone = $('#input-phone').val();
        var subject = $('#input-subject').val();
        var message = $('#input-message').val();

        var contact_info = {
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
            success: function success(data) {
                if (data.success) {
                    var response = '<div class="row justify-content-center align-items-center" id="form-response">\n                      <div class="col-12 text-center">\n                        <h2 class="component-l">Everything worked this time!</h2>\n                        <img id="success-img" src="img/mail_checked.png" alt=Email successsfully send!">\n                       </div>\n                      </div>';
                    $('#form-wrapper').addClass("hidden").html(response);
                    $('#form-response').viewportChecker({
                        classToAdd: 'visible animated bounceInDown',
                        offset: 100
                    });
                } else if (!data.success && data.responseCode != 1) {
                    var failed = '<div class="row justify-content-center align-items-center" id="form-response-failed">\n                      <div class="col-12 text-center">\n                        <h2 class="component-l">Sorry, something went wrong here. Please try it again later, if it does not work anytime soon!</h2>\n                       </div>\n                      </div>';
                    $('#form-info').addClass("hidden").html(failed).viewportChecker({
                        classToAdd: 'visible animated bounceInDown',
                        repeat: true,
                        offset: 100
                    });
                } else if (data.responseCode == 1) {
                    var no_captcha = '<div class="row justify-content-center align-items-center" id="form-response-failed">\n                  <div class="col-12 text-center">\n                    <h2 class="component-l">Don\'t forget to solve the captcha!</h2>\n                   </div>\n                  </div>';
                    $('#form-info').addClass("hidden").html(no_captcha).viewportChecker({
                        classToAdd: 'visible animated bounceInDown',
                        repeat: true,
                        offset: 100
                    });
                }
            }
        });
    });
});
/* AJAX contact form END */
