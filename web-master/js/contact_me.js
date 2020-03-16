$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // Mensagens adicional de erros ou eventos
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // Pegando os valores do formulario
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // Para o sucesso/Falha mensagem
      // verifica se há espaço em branco no nome para o sucesso/Falha mensagem
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Desativar o botão enviar até completa do AJAX para evitar duplicação da mensagem.
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Mensagem de sucesso
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Sua mensagem foi enviada. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //limpar todos os campos
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Caso a mesagem falhe
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Desculpe "+ firstName +", parece que meu servidor de e-mail não está respondendo. Por favor, tente novamente mais tarde!"));
          $('#success > .alert-danger').append('</div>');
          //Limpar todos os campos
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Reativar o botão enviar quando a chamada AJAX se completar
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
