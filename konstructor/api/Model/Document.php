<?php

namespace Model;


use DOMDocument;
use JsonException;
use Model\Descipline;
use Model\Database;
use Model\PostsModel;

require_once '../vendor/autoload.php';


/**
 *
 * Класс для работы с документом .plx
 *
 */
class Document
{

    /**
     *
     * Метод загружает файл
     *
     * @return string
     */
    public function upload():string
    {
        $target_dir = "../uploads/";
        $target_file = $target_dir . basename($_FILES["file"]["name"]);

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            $result = "The file has been uploaded - ";
        } else {
            $result = "Sorry, there was an error uploading your file.";
        }
        return $result;
    }

    /**
     *
     * Метод удаляет ненужные строки в .plx файле
     *
     * @return string
     */
    public function deleteString()
    {

        $target_dir = "../uploads/";
        $target_file = $target_dir . basename($_FILES["file"]["name"]);
//        $from_json_file = file_get_contents($target_file);
//        file_put_contents("../uploads/test.xml", $from_json_file);

//        $file = file("../uploads/test.xml");
        $file = file($target_file);

        $iMax = count($file);

        unset($file[1], $file[2], $file[2888]);
        unset($file[2889]);

        file_put_contents($target_file, $file);

        return "Delete string done - ";
    }

    /**
     *
     * Метод превращает файл в json
     *
     * @return string
     */
    public function toJson()
    {
        $target_dir = "../uploads/";
        $target_file = $target_dir . basename($_FILES["file"]["name"]);

        $xmlNode = simplexml_load_string(file_get_contents($target_file));
        $arrayData = $this->xmlToArray($xmlNode);
        //echo json_encode($arrayData2);

        $target_dir2 = "../uploads/";
        $target_file2 = $target_dir2 . basename($_FILES["file"]["name"], ".plx");

        file_put_contents($target_file2 . '.json', json_encode($arrayData,JSON_UNESCAPED_UNICODE));
        unlink($target_file);
        return "toJson done - ";
    }

    /**
     * @param $filePath
     * @return array|string
     */
    public function filePath($filePath) {
        $fileParts = pathinfo($filePath);

        if (!isset($fileParts['filename'])) {
            $fileParts['filename'] = substr($fileParts['basename'], 0, strrpos($fileParts['basename'], '.'));
        }
        return $fileParts;
    }

    /**
     *
     * Метод берет данные из .plx и заполняет в тбалицы DETAIL / DISCIPLINES / DOCUMENTS
     *
     * @return string
     */
    public function insertData(): string
    {
        $path = "../uploads/";
        $files = scandir($path);
        $target_file = $path . $files[2];
        $from_json_file = file_get_contents($target_file);
        $decoded_json = json_decode($from_json_file, true);

//        return print_r($decoded_json, true);

        $db = new PostsModel();
        $hz = new Descipline();


        ///--- ДОБАВЛЕНИЕ ДОКУМЕНТА---

        $idDoc = $db->getDocId();
//        $d_id[0]['MAX(D_ID)'] тут вот так
        $idDocInt = (int)$idDoc[0]['MAX(D_ID)'] + 1;

        $nameDoc = $this->getName($decoded_json);
        $dateDocument = (int)$this->dateDocument($decoded_json);

        $dataDocuments = [
            'nameDoc' => $nameDoc,
            'DOC_ID' => $idDocInt,
            'd_id' => $idDocInt,
            'yearDoc' => $dateDocument
        ];

       $db->addInDocuments($dataDocuments); // DOCUMENTS

        ///--- ДОБАВЛЕНИЕ ДОКУМЕНТА---
        ///
        ///
        ///
        ///--- ДОБАВЛЕНИЕ ДОКУМЕНТА---

        $test = $hz -> all($decoded_json);

//        $test228 = $hz -> getCurs($decoded_json,'-1');
//        die(print_r($test228));


        $arr2 = json_decode($test, true);
        $iMax = count($arr2);

        for ($i = 0; $i < $iMax; $i++) {
            $hz->getCurs($decoded_json, $arr2[$i]['kod']);
        }

        $end = $hz->getEnd($decoded_json);

        $idDes = $db->getDocId(); ///
        $D_ID = (int)$idDes[0]['MAX(D_ID)']; /// D_ID ДЛЯ ДИСЦИПЛИНЫ

        for ($i = 0; $i < $end; $i++) {


            ///--- ДОБАВЛЕНИЕ ДЕСЦИПЛИН---
            ///
            ///
            ///
            ///--- ДОБАВЛЕНИЕ ДЕСЦИПЛИН---

            $name = $arr2[$i]['rpdName']; // ИМЯ ДЛЯ ДИСЦИПЛИНЫ
            $val = $db->getDetailIdFromDesciplins(); /// DETAIL_ID ДЛЯ ДИСЦИПЛИНЫ
            $D_IDforDescipl = (int)$val[0]['MAX(DETAIL_ID)'] + 1;

            $dataDesciplines = [
                'rpdName' => $name,
                'd_id' => $D_ID,
                'idDetail' => $D_IDforDescipl
            ];

//            die(print_r($arr2[$i]['rpdName']));

            $db->addInDesciplines($dataDesciplines); // DESCIPLINES

            ///--- ДОБАВЛЕНИЕ ДЕТАЛЬНО---
            ///
            ///
            ///
            ///--- ДОБАВЛЕНИЕ ДЕТАЛЬНО---

            $val2 = $db->getDetailIdFromDesciplins(); /// DETAIL_ID ДЛЯ ДИСЦИПЛИНЫ
            $DeslID = (int)$val2[0]['MAX(DETAIL_ID)'];

            $nameA = $arr2[$i]['rpdName'];
            $hoursZetA = $arr2[$i]['creditUnits'];




            $direction = $arr2[$i]['direction'];
            $code = $arr2[$i]['code'];
            $kod = $arr2[$i]['kod'];
            $educLvl = $arr2[$i]['educLvl'];
            $educForm = $arr2[$i]['educForm'];
            $year = $arr2[$i]['year'];
            $hours = $arr2[$i]['hours'];
            $semester = $arr2[$i]['semester'];
            $course = $arr2[$i]['course'];



            $dataDetail = [
                'DETAIL_ID' => $DeslID,
                'rpdName' => $nameA,
                'kod' => $kod,
                'direction' => $direction,
                'code' => $code,
                'educLvl' => $educLvl,
                'educForm' => $educForm,
                'year' => $year,
                'hours' => $hours,
                'semester' => $semester,
                'course' => $semester,
                'creditUnits' => $hoursZetA
            ];

            $db->addInDetail($dataDetail); // DETAIL

        }

        return "insertData done - ";

    }


    /**
     *
     * Метод дающий название документу
     *
     * @param $json
     * @return string|true
     */
    public function getName($json)
    {
        foreach ($json as $key => $value) {
            $array[] = $value['ООП']['ООП'];
            foreach ($array as $locationObj) {
                $string = $locationObj["@Название"];
            }
        }
        $namee2 = (string)json_encode($string, JSON_UNESCAPED_UNICODE);

        //
        //тут нужно сделать проверку на другие файлы либо сделать так чтобы просто было название
        //
        if ($namee2 == '"Технологии разработки программного обеспечения"') {
            $namee = 'ИВТ_ТРПО';
        } else {
            $namee = 'ИВТ_АСОИУ';
        }

        return print_r($namee,true);

    }

    /**
     *
     * Метод дающий дату документа
     *
     * @param $json
     * @return mixed
     */
    private function dateDocument($json){
        foreach ($json as $key => $value) {
            $array[] = $value['Планы'];
            foreach ($array as $locationObj) {
                $string2 = $locationObj["@ГодНачалаПодготовки"];
            }
        }
        return $string2;
    }


    /**
     *
     * Метод конвертирующий xml в json
     *
     * @param $xml
     * @param $options
     * @return array|string[]
     */
    public function xmlToArray($xml, $options = array())
    {
        $defaults = array(
            'namespaceRecursive' => false,  //setting to true will get xml doc namespaces recursively
            'removeNamespace' => false,     //set to true if you want to remove the namespace from resulting keys (recommend setting namespaceSeparator = '' when this is set to true)
            'namespaceSeparator' => ':',    //you may want this to be something other than a colon
            'attributePrefix' => '@',       //to distinguish between attributes and nodes with the same name
            'alwaysArray' => array(),       //array of xml tag names which should always become arrays
            'autoArray' => true,            //only create arrays for tags which appear more than once
            'textContent' => '$',           //key used for the text content of elements
            'autoText' => true,             //skip textContent key if node has no attributes or child nodes
            'keySearch' => false,           //optional search and replace on tag and attribute names
            'keyReplace' => false           //replace values for above search values (as passed to str_replace())
        );
        $options = array_merge($defaults, $options);
        $namespaces = $xml->getDocNamespaces($options['namespaceRecursive']);
        $namespaces[''] = null; //add base (empty) namespace

        //get attributes from all namespaces
        $attributesArray = array();
        foreach ($namespaces as $prefix => $namespace) {
            if ($options['removeNamespace']) {
                $prefix = '';
            }
            foreach ($xml->attributes($namespace) as $attributeName => $attribute) {
                //replace characters in attribute name
                if ($options['keySearch']) {
                    $attributeName =
                        str_replace($options['keySearch'], $options['keyReplace'], $attributeName);
                }
                $attributeKey = $options['attributePrefix']
                    . ($prefix ? $prefix . $options['namespaceSeparator'] : '')
                    . $attributeName;
                $attributesArray[$attributeKey] = (string)$attribute;
            }
        }

        //get child nodes from all namespaces
        $tagsArray = array();
        foreach ($namespaces as $prefix => $namespace) {
            if ($options['removeNamespace']) {
                $prefix = '';
            }

            foreach ($xml->children($namespace) as $childXml) {
                //recurse into child nodes
                $childArray = $this->xmlToArray($childXml, $options);
                $childTagName = key($childArray);
                $childProperties = current($childArray);

                //replace characters in tag name
                if ($options['keySearch']) {
                    $childTagName =
                        str_replace($options['keySearch'], $options['keyReplace'], $childTagName);
                }

                //add namespace prefix, if any
                if ($prefix) {
                    $childTagName = $prefix . $options['namespaceSeparator'] . $childTagName;
                }

                if (!isset($tagsArray[$childTagName])) {
                    //only entry with this key
                    //test if tags of this type should always be arrays, no matter the element count
                    $tagsArray[$childTagName] =
                        in_array($childTagName, $options['alwaysArray'], true) || !$options['autoArray']
                            ? array($childProperties) : $childProperties;
                } elseif (
                    is_array($tagsArray[$childTagName]) && array_keys($tagsArray[$childTagName])
                    === range(0, count($tagsArray[$childTagName]) - 1)
                ) {
                    //key already exists and is integer indexed array
                    $tagsArray[$childTagName][] = $childProperties;
                } else {
                    //key exists so convert to integer indexed array with previous value in position 0
                    $tagsArray[$childTagName] = array($tagsArray[$childTagName], $childProperties);
                }
            }
        }

        //get text content of node
        $textContentArray = array();
        $plainText = trim((string)$xml);
        if ($plainText !== '') {
            $textContentArray[$options['textContent']] = $plainText;
        }

        //stick it all together
        $propertiesArray = !$options['autoText'] || $attributesArray || $tagsArray || ($plainText === '')
            ? array_merge($attributesArray, $tagsArray, $textContentArray) : $plainText;

        //return node as array
        return array(
            $xml->getName() => $propertiesArray
        );
    }
}