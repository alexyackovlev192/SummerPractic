<?php

namespace Api;
//header('Content-type: json/application');
use Model\Descipline;use Model\XmlToJson;

require_once 'vendor/autoload.php';

//$xmlNode = simplexml_load_file('example.xml');
//$arrayData1 = new XmlToJson();
//$arrayData2 = $arrayData1->xmlToArray($xmlNode);
//echo json_encode($arrayData2);

//file_put_contents('myfile.json', json_encode($arrayData2,JSON_UNESCAPED_UNICODE));


//$array = ['foo' => 'bar', 'quux' => 'baz'];
//echo json_encode(new Descipline($array), JSON_PRETTY_PRINT);



$people_json = file_get_contents('myfile.json');
$decoded_json = json_decode($people_json, false);
echo $decoded_json[]['Дисциплина'];