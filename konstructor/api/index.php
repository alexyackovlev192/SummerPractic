<?php

namespace Api;
header('Content-type: json/application');
use DOMDocument;
use DOMXPath;
use Model\Descipline;
use Model\Document;
use Model\DoljnostLica;
use Model\XmlToJson;

require_once 'vendor/autoload.php';

//echo "Test228";

////делаю json file-----//////-----------------------------------//////-----------------------------------
//$xmlNode = simplexml_load_string(file_get_contents("uploads/test2.xml"));
//$arrayData1 = new Document();
//$arrayData2 = $arrayData1->xmlToArray($xmlNode);
////echo json_encode($arrayData2);
//
//file_put_contents('sss.json', json_encode($arrayData2,JSON_UNESCAPED_UNICODE));
/////-------//////-----------------------------------//////-----------------------------------


//выдает мне Дисциплины
//////-----------------------------------//////-----------------------------------
//$from_json_file = file_get_contents('sss.json');
//$decoded_json = json_decode($from_json_file, true);
//
//
//$hz = new Descipline();
//
//echo $hz -> all($decoded_json);
//////-----------------------------------//////-----------------------------------


//создает файл дисциплина_xxx_xxx.json
//////-----------------------------------//////-----------------------------------
//$from_json_file = file_get_contents('sss.json');
//$decoded_json = json_decode($from_json_file, true);
//
//
//$hz = new Descipline();
//
//$string = $hz -> all($decoded_json);
//$name = $hz -> name($decoded_json);
//
//$hz -> toDocument($name,$string);


//////-----------------------------------//////-----------------------------------


//выдает мне Должностные лица
//////-----------------------------------//////-----------------------------------

//$from_json_file = file_get_contents('sss.json');
//$decoded_json = json_decode($from_json_file, true);
//
//$hz = new DoljnostLica();
//$hz -> all($decoded_json);
//////-----------------------------------//////-----------------------------------



//создает файл должность_xxx_xxx.json
//////-----------------------------------//////-----------------------------------
//$from_json_file = file_get_contents('sss.json');
//$decoded_json = json_decode($from_json_file, true);
//
//
//$hz = new DoljnostLica();
//
//$string = $hz -> all($decoded_json);
//$name = $hz -> name($decoded_json);
//
//$hz -> toDocument($name,$string);
//////-----------------------------------//////-----------------------------------
























//$html_data = file_get_contents('s.xml');
//
////libxml_use_internal_errors(TRUE);
//$dom = new DOMDocument();
//$dom->loadHtml($html_data);
//$dom->formatOutput = TRUE;
//
//echo $dom->saveXml();


//
//echo $from_json_file;
//
//echo '<br><br>';
//
//
//print_r($decoded_json);
//
//print("<pre>".print_r($decoded_json,true)."</pre>");
//
//echo '<br><br>';
//
////echo $decoded_json['1']['@Дисциплина'];
//
//echo '<br><br>';


//берет название тегов

//////-----------------------------------//////-----------------------------------

//$doc = new DOMDocument();
//$doc->loadXML(file_get_contents('test.xml'));
//
//$xpath = new DOMXpath($doc);
//$nodes = $xpath->query('//*');
//$names = array();
//foreach ($nodes as $node)
//{
//    $names[] = $node->nodeName;
//}
//
//echo join(PHP_EOL, array_unique($names));

//////-----------------------------------//////-----------------------------------


//$string = "
//<example>
//   <example>
//      <example_value>EXAMPLE</example_value>
//   </example>
//</example> ";
//
//$doc = new DOMDocument();
//$doc->loadXML(file_get_contents('test.xml'));
//
//
//
//echo '<pre>',  $doc->extContent, '</pre>';
//header('Content-Type: text/xml');

//header('Content-Type: text/plain');



//$xml_content = file_get_contents('test.xml');
//
//$html_data =
//    '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
//   <body>'.$xml_content.'</body>';
//
////libxml_use_internal_errors(TRUE);
//$dom = new DOMDocument();
//$dom->loadHtml($html_data);
//$dom->formatOutput = TRUE;
//
//echo $dom->saveHTML();


//$data = file_get_contents('test.xml');
//
//print_r($data);

//
//$data = file_get_contents("test.xml");
//echo $data;

//libxml_use_internal_errors(TRUE);
//$dom = new DOMDocument();
//$dom->loadHtml($data);
//$dom->formatOutput = TRUE;
//
//echo $dom->saveXml();
//
//
//
////$xml = simplexml_load_file('test.xml');
//$xpath = new DOMXpath($dom);
//$root = simplexml_import_dom($xpath->evaluate('/Документ/diffgr:diffgram')->item(0));
//var_dump($root);









