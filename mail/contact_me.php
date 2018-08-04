<?php
// Verifica se tem campos vazios
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "Nenhum argumento fornecido!";
   return false;
   }

$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Cria o email e envia a mensagem
$to = 'yourname@seudominio.com.br'; // Adicione seu endereço de e-mail entre o '' substituindo yourname@seudominio.com.br - Este é o local para onde o formulário enviará uma mensagem.
$email_subject = "Boteco do Guedes formulário de contato:  $name";
$email_body = "Você recebeu uma nova mensagem do formulário de contato do Boteco do Guedes.\n\n"."Aqui estão os detalhes:\nNome: $name\nEmail: $email_address\nTelefone: $phone\nMensagem:\n$message";
$headers = "De: noreply@yourdomain.com ";// Este é o endereço de e-mail da mensagem gerada. Recomendamos usar algo como noreply@yourdomain.com.
$headers .= " Responder-a: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
