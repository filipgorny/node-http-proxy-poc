<?php

sleep(5);

$log = "REQUEST: ".$_SERVER['REQUEST_URI']."\n\n";
$log .= file_get_contents('php://input');

file_put_contents("logs/".date("Y-m-d-H-i-s").".log", $log);