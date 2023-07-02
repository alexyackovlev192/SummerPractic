<?php
declare(strict_types=1);

namespace Model;

use JsonSerializable;




class Descipline extends Document
//    implements JsonSerializable
{

    public $rpdName;
    public $direction;
    public $code;
    public $educLvl;
    public $educForm;
    public $year;
    public $hours;
    public $creditUnits;
    public $semester;
    public $course;
    public $kod;
    public $kod2;

    public $curs;
    public $test;

    public $arr = [];






    public $string1 = null;


    public function all($json)
    {

//        die(print_r($json));

        foreach ($json["dsMMISDB"]["ПланыСтроки"] as $value) {

            $this->rpdName = $value["@Дисциплина"];                            // rpdName: "Операционные системы" // Компетенции Дисциплина="Иностранный язык"
            $this->direction = $json["dsMMISDB"]["ООП"]["ООП"]["@Название"];   // ООП ООП  Название="Технологии разработки программного обеспечения"
            $this->code = $json["dsMMISDB"]["ООП"]["@Шифр"];                   // ООП Шифр="09.03.01"
            $this->educLvl = $json["dsMMISDB"]["Планы"]["@Квалификация"];      // Планы Квалификация="бакалавр"
            $this->educForm = $json["dsMMISDB"]["Планы"]["@КодФормыОбучения"]; // Планы КодФормыОбучения="1"
            if($this->educForm === '1'){
                $this->educForm = 'Очная';
            }
            if($this->educForm === '2'){
                $this->educForm = 'Заочная';
            }
            if($this->educForm === '3'){
                $this->educForm = 'Очно-заочная';
            }
            $this->year = $json["dsMMISDB"]["Планы"]["@ГодНачалаПодготовки"];  // Планы ГодНачалаПодготовки="2023"
            $this->kod = $value["@Код"];
//            $this->getCurs($this->kod);
            $this->hours = '148';                                              // hours: "148"
            $this->creditUnits = $value["@ЗЕТфакт"];                           // ПланыСтроки ЗЕТфакт="10"
            $this->arr[] = array
            (
                'rpdName' => $this->rpdName,
                'direction' => $this->direction,
                'code' => $this->code,
                'educLvl' => $this->educLvl,
                'educForm' => $this->educForm,
                'year' => $this->year,
                //'semester' => $this->semester,
                //'course' => $this->course,
                'kod' => $this->kod,
                'hours' => $this->hours,
                'creditUnits' => $this->creditUnits
            );

        }


//        $this->kod = $json["dsMMISDB"]["ПланыСтроки"]["@Код"];




        return json_encode($this->arr, JSON_UNESCAPED_UNICODE) . "\n";

    }

//    public function getKods($json){
//
//        foreach ($json["dsMMISDB"]['ПланыСтроки'] as $value)
//        {
//            $kod = $value['@Код'];
//            $this->getCurs($json, $kod);
//        }
//    }

    public function getCurs($json, $kod)
    {
        foreach ($json["dsMMISDB"]['ПланыНовыеЧасы'] as $value)
        {
            if($value['@КодОбъекта'] == $kod){

                $curs .= $value['@Курс'];
                $sem .= $value['@Семестр'];
            }
        }

        foreach (count_chars($curs, 1) as $i => $val) {
          foreach (count_chars($sem, 1) as $i2 => $val2) {
            $arr3[] = array
            (
                'kod' => $kod,
                'curs' => chr($i),
                'semestr' => chr($i2),
            );
          }
        }



//        $iMax = count($arr3);

        $post = new PostsModel();


        $post->addCursAndSession($arr3);

//        $result = $arr3[0]['kod'];


//        return json_encode($result, JSON_UNESCAPED_UNICODE) . "\n";

        return "insertInDone - yopo";


    }

    public function toDocument($name, $data)
    {
        file_put_contents($name . '.json', $data);
    }

    public function name($json)
    {
        foreach ($json as $key => $value) {
            $array[] = $value['ООП']['ООП'];
            foreach ($array as $locationObj) {
                $string = $locationObj["@Название"];
            }
        }
        $namee2 = strval(json_encode($string, JSON_UNESCAPED_UNICODE));

        //
        //тут нужно сделать проверку на другие файлы либо сделать так чтобы просто было название
        //
        if ($namee2 == '"Технологии разработки программного обеспечения"') {
            $namee = 'ИВТ_ТРПО';
        } else {
            $namee = 'ИВТ_АСОИУ';
        }

        return 'desciplina_' . $namee . '_' . $this->dateDocument($json);

    }

    public function getEnd($json)
    {
        foreach ($json["dsMMISDB"]["ПланыСтроки"] as $locationObj) {
            $this->rpdName = $locationObj["@Дисциплина"];
            $this->creditUnits = $locationObj["@ЧасовВЗЕТ"];
            $array[] = array
            (
                '$rpdName' => $this->rpdName,
                'hoursZet' => $this->creditUnits
            );
            $k++;
        }
        return $k;
    }

    private function dateDocument($json){
        foreach ($json as $key => $value) {
            $array[] = $value['Планы'];
            foreach ($array as $locationObj) {
                $string2 = $locationObj["@ГодНачалаПодготовки"];
            }
        }
        return $string2;
    }



}