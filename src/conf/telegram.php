<?php

/* https://api.telegram.org/bot5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$price = $_POST['price'];
$count = $_POST['count'];
$checkbox = isset($_POST['checkbox']);
$comfortable = $_POST['comfortable'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = $_POST['password'];
$tags = $_POST['tags'];
$token = "5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM";
$chat_id = "-1001686101709";

if (isset($name)) {

if ($checkbox) {
  $checkbox = "Да";
 } else {
  $checkbox = "Нет";
 };

 if ($_POST['comfortable'] === "") {
  $comfortable = "Любые.";
 } else {
  $comfortable = $_POST['comfortable'];
 };

 if ($_POST['count'] === "  1 м²") {
  $count = "Площадь не указана.";
 } else {
  $count = $_POST['count'];
 };

 if ($_POST['price'] === " ₽") {
  $price = "Стоимость не указана.";
 } else {
  $price = $_POST['price'];
 };

 if ($_POST['tags'] === "") {
  $tags = "Без дополнительных опций.";
 } else {
  $tags = $_POST['tags'];
 };

$arr = array(
  'Название проекта: ' => $name,
  'Стоимость: ' => $price,
  'Площадь: ' => $count,
  'Отделка: ' => $checkbox,
  'Удобства: ' => $comfortable,
  'Пожелания: ' => $tags,
  'Телефон: ' => $phone,
  'Почта: ' => $email,
  'Пароль: ' => $password,
);

$sendValue = '';

foreach($arr as $key => $value) {
  $sendValue = $sendValue."<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$sendValue}","r");

if ($sendToTelegram) {
  echo "ok";
} else {
  echo "Error!";
}
} else {

  echo "Error";
}
?>