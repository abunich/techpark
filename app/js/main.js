$(document).ready(function() {
  var eMail = $('#e-mail'),
      password = $("#password"),
      sendBtn = $('#send-btn'),
      authLogin = $('#auth-login'),
      authBlock = $('#auth-block'),
      authBlockClose = $('#auth-block-close'),
      checkbox = $('#checkbox'),
      validEmail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

  eMail.on('keyup input', function() {
    validateForm(eMail, password);
  });
  password.on('keyup input', function() {
    validateForm(eMail, password);
  });
  authLogin.click(function(){
    checkClass(authLogin, authBlock, "auth-wrap_db-none");
  });
  authBlockClose.click(function(){
    checkClass(authBlock, authLogin, "auth-wrap_db-none");
  });
  sendBtn.click(function(){
    checkClass(authBlock, authLogin, "auth-wrap_db-none");
  });

  function validateForm(eMail, password) {
    if(password.val().length > 4 && eMail.val() != '' && validEmail.test(eMail.val()) ) {
      sendBtn.prop('disabled', false);
    }
    else {
      sendBtn.prop('disabled', true);
    }
  };

  function checkClass(clickEl, checkEl, classEl) {
    if (checkEl.hasClass("auth-wrap_db-none")) {
      checkEl.removeClass("auth-wrap_db-none")
      clickEl.addClass("auth-wrap_db-none")
    }
    else {
      clickEl.addClass("auth-wrap_db-none")
      checkEl.removeClass("auth-wrap_db-none")
    }
    eMail.val('');
    password.val('');
    checkbox.prop('checked', false);
    sendBtn.prop('disabled', true);
  }
})