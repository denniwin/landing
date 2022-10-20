<?php

/* https://api.telegram.org/bot5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$price = $_POST['price'];
$count = $_POST['count']."м2";
$checkbox = $_POST['checkbox'];
$comfortable = $_POST['comfortable'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = $_POST['password'];
$tags = $_POST['tags'];
$token = "5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM";
$chat_id = "-1001686101709";
$arr = array(
  'Название проекта: ' => $field__name,
  'Стоимость: ' => $field__price,
  'Площадь: ' => $count,
  'Отделка: ' => $checkbox,
  'Удобства: ' => $comfortable,
  'Пожелания: ' => $feedback__crypto,
  'Телефон: ' => $phone,
  'Почта: ' => $email,
  'Пароль: ' => $tags,
);

$sendValue = '';

if ($_POST['checkbox'] === "on") {
  $checkbox = "Да";
 } else {
  $checkbox = "Нет";
 };

foreach($arr as $key => $value) {
  $sendValue = $sendValue."<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$sendValue}","r");

if ($sendToTelegram) {
  echo "ok";
} else {
  echo "Error";
}
?>