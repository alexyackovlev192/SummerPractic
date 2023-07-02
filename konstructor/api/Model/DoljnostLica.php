<?php
declare(strict_types=1);
namespace Model;

class DoljnostLica extends XmlToJson
{

    private
        $indexDescipl
    ,   $nameDescipl
    ,   $kodKafedriDescipl
    ,   $zEDescipl
    ;

    public function all($json){
        foreach($json["dsMMISDB"]["ДолжностныеЛица"] as $locationObj){
            $this->nameDescipl = $locationObj["@ФИО"];
            $this->indexDescipl = $locationObj["@Должность"];
            $array[] = array('ФИО' => $this->nameDescipl, 'Должность' => $this->indexDescipl);
        }
        return json_encode($array,JSON_UNESCAPED_UNICODE)."\n";
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

        return 'doljnost_' . $namee . '_' . $this->dateDocument($json);

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