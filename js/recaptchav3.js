if (document.getElementById("RecaptchaV3") != null) {
  setTimeout(VerifyForm, 1000);
}

function VerifyForm() {
  //event.preventDefault();
  let key = document.getElementById("RecaptchaV3").value;
  grecaptcha.ready(function () {
    grecaptcha.execute(key, { action: 'submit' }).then(function (token) {
      document.getElementById('g-recaptcha-response').value = token;
      document.getElementsByClassName("RecaptchaV3-captchaToken")[0].value = token;
    });
  });
}