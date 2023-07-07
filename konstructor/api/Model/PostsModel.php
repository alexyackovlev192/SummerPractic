<?php

namespace Model;

use PDO;

/**
 *
 * Класс для работы с базой данных
 *
 */
class PostsModel extends Database
{

    //------------------------------
    //------------------------------
    //------------------------------
    //----------DOCUMENTS-----------
    //------------------------------
    //------------------------------
    //------------------------------

    /**
     *
     * Метод дает список всех дисциплин и их полей
     *
     * @return string
     */
    public function getAllEducDirection(): string
    {
        $stmt = $this->select("SELECT DISTINCT direction, code, educlvl, year, educForm from `rpd`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    /**
     *
     * Метод дает список всех дисциплин и их полей
     *
     * @return string
     */
    public function getAllDetail(): string
    {
        $stmt = $this->select("SELECT ID, rpdName, code, year, educlvl, educForm, direction from `DETAIL`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    /**
     *
     * Метод заносит все поля десциплины
     *
     * @param $data
     * @return string
     */
    public function addInDetail($data)
    {
        $id = $data['DETAIL_ID'];
        $rpdName = $data['rpdName'];
        $kod = $data['kod'];
        $direction = $data['direction'];
        $code = $data['code'];
        $educLvl = $data['educLvl'];
        $educForm = $data['educForm'];
        $year = $data['year'];
        $hours = $data['hours'];
        $creditUnits = $data['creditUnits'];
        $semester = $data['semester'];
        $course = $data['course'];

        $stmt = $this->select("INSERT INTO `DETAIL` (`ID`, `DES_ID`, `kod`, `rpdName`, `direction`, `code`, `educLvl`, `educForm`, `year`, `hours`, `creditUnits`) VALUES (NULL, '$id', '$kod', '$rpdName', '$direction', '$code', '$educLvl', '$educForm', '$year', '$hours', '$creditUnits') ");
        $stmt->execute();

        return "addInDetail done - ";
    }

    /**
     *
     * Метод дает detail данные для десциплины
     *
     * @param $name
     * @return mixed
     */
    public function getDetailId($kod)
    {
        $stmt = $this->select("SELECT `ID`, `rpdName`, `direction`, `code`, `educLvl`, `educForm`, `year`, `hours`, `creditUnits` FROM `DETAIL` WHERE kod = '$kod'");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//        return "addInDetail done - ";
        return $results;

    }

    /**
     *
     * Метод дает максимальный эллемент D_ID из DOCUMENTS
     *
     * @return mixed
     */
    public function getDocId()
    {
        $stmt = $this->select("SELECT MAX(D_ID) FROM `DOCUMENTS`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;

    }

    /**
     *
     * Метод дает максимальный эллемент D_ID из DESCIPLINS
     *
     * @return mixed
     */
    public function getDetailIdFromDesciplins()
    {
        $stmt = $this->select("SELECT MAX(DETAIL_ID) FROM `DESCIPLINS`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;

    }

    /**
     *
     * Метод заносит все десциплины
     *
     * @param $data
     * @return string
     */
    public function addInDesciplines($data)
    {
        $name = $data['rpdName'];
        $idDocInt = $data['d_id'];
        $idDetail = $data['idDetail'];

        $stmt = $this->select("INSERT INTO `DESCIPLINS` (`ID`, `NAME`, `D_ID`, `DETAIL_ID`) VALUES (NULL, '$name', '$idDocInt', '$idDetail' ) ");
        $stmt->execute();

        return "addInDesciplines done - ";
    }

    /**
     *
     * Метод заносит все документы
     *
     * @param $data
     * @return string
     */
    public function addInDocuments($data)
    {
        $name = $data['nameDoc'];
        $ID_FOR_CS = $data['DOC_ID'];
        $idDocInt = $data['d_id'];
        $year = $data['yearDoc'];

        $stmt = $this->select("INSERT INTO `DOCUMENTS` (`ID`, `D_ID`, `DOC_ID`, `NAME`, `YEAR`) VALUES (NULL, '$idDocInt', '$ID_FOR_CS', '$name', '$year' ) ");
        $stmt->execute();

        return "addInDocuments done - ";
    }

    /**
     *
     * Метод выдает список документов
     *
     * @return false|string
     */
    public function getDocuments()
    {
        $stmt = $this->select("SELECT NAME, YEAR FROM `DOCUMENTS`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    /**
     *
     * Метод выдает список десциплин
     *
     * @return false|string
     */
    public function getDesciplines()
    {
        $stmt = $this->select("SELECT NAME FROM `DESCIPLINS`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    /**
     *
     * Метод выдает 1 десциплину
     *
     * @param $id
     * @return false|string
     */
    public function getDescipline($id)
    {
        $stmt = $this->select("SELECT SQL_CALC_FOUND_ROWS NAME FROM `DESCIPLINS` WHERE D_ID = '$id'");
        $stmt->execute();
        $stmt2 = $this->select("SELECT FOUND_ROWS()");
        $stmt2->execute();
        $row_count =$stmt2->fetchColumn();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($row_count === 0){
            $res = [
                "status" => false,
                "message" => "Descipline not found"
            ];
            return json_encode($res);
        }else{
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }
    }

    public function deleteDoc($id)
    {
        $stmt = $this->select("DELETE FROM `DOCUMENTS` WHERE `ID` =  '$id'");
        $stmt->execute();
        $stmt->fetchAll(PDO::FETCH_ASSOC);

        return "deleteDoc done - ";
    }

    //------------------------------
    //------------------------------
    //------------------------------
    //-------------RPD--------------
    //------------------------------
    //------------------------------
    //------------------------------


    public function DES_IDfromDetail($kod)
    {
        $stmt = $this->select("SELECT `DES_ID` FROM `Detail` WHERE kod = '$kod'");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    public function NamefromDesciplins($kod)
    {
        $stmt = $this->select("SELECT `ID` FROM `DESCIPLINS` WHERE DETAIL_ID = '$kod'");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    public function idUSERfromLINKS($kod)
    {
        $stmt = $this->select("SELECT `ID_USER` FROM `DISP_USERS_CON` WHERE ID_DISCP = '$kod'");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    public function nameUSERS($kod)
    {
        $stmt = $this->select("SELECT `NAME` FROM `USERS` WHERE ID = '$kod'");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }

    /**
     *
     * Метод добавляет РПД
     *
     * @return string
     * @throws \JsonException
     */
    public function createRpd()
    {

        $jsonCursSession = $this->getCursAndSession();
        $arrayCursSession = json_decode($jsonCursSession,true );

        $iMax = count($arrayCursSession);

        // мне тут надо получить массив data

        for ($i = 0; $i < $iMax; $i++) {


            //----
            //----DETAIL
            //----

            $ID_D = $arrayCursSession[$i]['ID_D'];

            $data = $this->getDetailId($ID_D);

            $rpdName = $data[0]['rpdName'];                            //DATA
            $direction = $data[0]['direction'];                        //DATA
            $code = $data[0]['code'];                                  //DATA
            $educLvl = $data[0]['educLvl'];                            //DATA
            $educForm = $data[0]['educForm'];                          //DATA
            $year = $data[0]['year'];                                  //DATA

            $SEMESTR = $arrayCursSession[$i]['SEMESTR'];               //DATA
            $CURS = $arrayCursSession[$i]['CURS'];                     //DATA
            $hours = $data['hours'];                                   //DATA
            $creditUnits = (int)$data['creditUnits'];                       //DATA

            $jsonList =  $this->getAllList();
            $arrayList = json_decode($jsonList, true );


            //----
            //----listsogltable
            //----

            $protocol = $arrayList[0]['rasmotr'];                              //LIST-
            $date = $arrayList[0]['protocolNumber'];                           //LIST-
            $surname = $arrayList[0]['surName'];                               //LIST-
            $name = $arrayList[0]['firstName'];                                 //LIST-
            $fname = $arrayList[0]['lastName'];                                //LIST-


            //----
            //----SAM
            //----


            $goals = "";                               //
            $tasks = "";                                 //
            $objectives = "";                      //
            $disciplinePlace = "Обязательное";
//            $competencies = json_encode($data['competencies']);     //
            $competencies = json_encode("");                             //
            $sectionsTopics = "";             //
            $smthElse = "";                          //
            $supportList = "";                  //
            $fundList = "Перечень учебно-методического обеспечения";
            $literatureList = "";             //
            $periodicalsList = "";        //
            $internetResList = "";            //
            $infoTechResList = "";           //
            $profDataInfList = "";            //
            $reqSoftwareList = "";            //
            $TReqLogistics = json_encode("");      //
//            $TReqLogistics = json_encode($data['TReqLogistics']);


            //----
            //----USER_ID
            //----

            $arrayDetail = $this->DES_IDfromDetail($ID_D);
            $desDetail = (int)$arrayDetail[0]['DES_ID'];

            $arrayNameDesc = $this->NamefromDesciplins($desDetail);
            $nameDesc = (int)$arrayNameDesc[0]['ID'];

            $arrayidUSER = $this->idUSERfromLINKS($nameDesc);
            $idUSER = (int)$arrayidUSER[0]['ID_USER'];

            $arrayUSERS = $this->nameUSERS($idUSER);
            $USER = $arrayUSERS[0]['NAME'];

            $USERS = $idUSER;

            //----
            //----STATUS
            //----

            $STATUS = 'X';

            $stmt = $this->select("INSERT INTO `RPD` (`ID`, `USER`, `STATUS`,`rpdName`, `direction`, `code`, `educLvl`, `educForm`, `year`, `protocol`, `date`, `surname`, `name`, `fName`, `goals`, `tasks`, `objectives`, `disciplinePlace`, `semester`, `course`, `competencies`, `hours`, `creditUnits`, `sectionsTopics`, `smthElse`, `supportList`, `fundList`, `literatureList`, `periodicalsList`, `internetResList`, `infoTechResList`, `profDataInfList`, `reqSoftwareList`, `TReqLogistics`) VALUES
                                                     (NULL,'$USERS' ,'$STATUS','$rpdName', '$direction', '$code', '$educLvl', '$educForm', '$year', '$protocol', '$date', '$surname', '$name', '$fname', '$goals', '$tasks', '$objectives', '$disciplinePlace', '$SEMESTR', '$CURS', '$competencies', '$hours', '$creditUnits', '$sectionsTopics', '$smthElse', '$supportList', '$fundList', '$literatureList', '$periodicalsList', '$internetResList', '$infoTechResList', '$profDataInfList', '$reqSoftwareList', '$TReqLogistics') ");
          
            
            $stmt->execute();

//        return "addInRpd done - ";




        }




        return "addInRpd done - ";



        // получить массив list
        // понять как написать курс и семестр



//        $goals = $data['goals'];                                //
//        $tasks = $data['tasks'];                                //
//        $objectives = $data['objectives'];                      //
//        $disciplinePlace = "Обязательное";
//        $competencies = json_encode($data['competencies']);     //
//        $sectionsTopics = $data['sectionsTopics'];              //
//        $smthElse = $data['smthElse'];                          //
//        $supportList = $data['supportList'];                    //
//        $fundList = "Перечень учебно-методического обеспечения";
//        $literatureList = $data['literatureList'];              //
//        $periodicalsList = $data['periodicalsList'];            //
//        $internetResList = $data['internetResList'];            //
//        $infoTechResList = $data['infoTechResList'];            //
//        $profDataInfList = $data['profDataInfList'];            //
//        $reqSoftwareList = $data['reqSoftwareList'];            //
//        $TReqLogistics = json_encode($data['TReqLogistics']);   //
//
//        $stmt = $this->select("INSERT INTO `RPD` (`ID`, `rpdName`, `direction`, `code`, `educLvl`, `educForm`, `year`, `protocol`, `date`, `surname`, `name`, `fName`, `goals`, `tasks`, `objectives`, `disciplinePlace`, `semester`, `course`, `competencies`, `hours`, `creditUnits`, `sectionsTopics`, `smthElse`, `supportList`, `fundList`, `literatureList`, `periodicalsList`, `internetResList`, `infoTechResList`, `profDataInfList`, `reqSoftwareList`, `TReqLogistics`) VALUES (NULL, '$rpdName', '$direction', '$code', '$educLvl', '$educForm', '$year', '$protocol', '$date', '$surname', '$name', '$fName', '$goals', '$tasks', '$objectives', '$disciplinePlace', '$semester', '$course', '$competencies', '$hours', '$creditUnits', '$sectionsTopics', '$smthElse', '$supportList', '$fundList', '$literatureList', '$periodicalsList', '$internetResList', '$infoTechResList', '$profDataInfList', '$reqSoftwareList', '$TReqLogistics') ");
//        $stmt->execute();

//        return "addInRpd done - ";


    }


    /**
     *
     * Метод выдает список РПД
     *
     * @param $id
     * @return false|string
     */
    public function getRpd($id)
    {
        $stmt = $this->select("SELECT SQL_CALC_FOUND_ROWS `ID`, `rpdName`, `direction`, `code`, `educLvl`, `educForm`, `year`, `protocol`, `date`, `surname`, `name`, `fName`, `goals`, `tasks`, `objectives`, `disciplinePlace`, `semester`, `course`, `competencies`, `hours`, `creditUnits`, `sectionsTopics`, `smthElse`, `supportList`, `fundList`, `literatureList`, `periodicalsList`, `internetResList`, `infoTechResList`, `profDataInfList`, `reqSoftwareList`, `TReqLogistics` FROM `RPD` WHERE `ID` = $id");
        $stmt->execute();
        $stmt2 = $this->select("SELECT FOUND_ROWS()");
        $stmt2->execute();
        $row_count =$stmt2->fetchColumn();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);




        if($row_count === 0){
            $res = [
                "status" => false,
                "message" => "Rpd not found"
            ];
            return json_encode($res);
        }else{
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

//            $competencies = json_encode($results[0]['competencies']);
//            $TReqLogistics = json_encode($results[0]['TReqLogistics']);
//
//            $results[0]['competencies'] = $competencies;
//            $results[0]['TReqLogistics'] = $TReqLogistics;

//            $results2 = json_encode($results[0]['competencies'], JSON_THROW_ON_ERROR);

//            $data = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);


//            return print_r($results);

            return json_encode($results);
        }
    }

    /**
     * @param $id
     * @return false|string
     */
    public function getAllRpd()
    {
        $stmt = $this->select("SELECT * FROM `RPD`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }


    /**
     * @param $id
     * @return false|string
     */
    public function updateRpd($id_rpd)
    {
        $jsonString = file_get_contents("php://input");
        if (empty($jsonString)) {
            return "No data received";
        }

        $data  = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);
        
        $goals = $data['goals'];
        $tasks = $data['tasks'];
        $objectives = $data['objectives'];
        $hours = $data['hours'];
        $creditUnits = $data['creditUnits'];
        
      
        $stmt = $this->select("UPDATE `rpd` SET `goals`='$goals',`tasks`='$tasks',`objectives`='$objectives', `hours`='$hours',`creditUnits`='$creditUnits' WHERE `ID`='$id_rpd'");
        
        // Проверяем количество затронутых строк
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->execute();
        $rowCount = $stmt->rowCount();

        return "Rpd updated successfully" ;
    }
    public function getCountRazdel($id_rpd)
    {
        $stmt = $this->select("SELECT COUNT(`id_rpd`),  `id_rpd` FROM `dics_razdels` WHERE `id_rpd`=$id_rpd");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    public function updateRazdel($id_rpd)
    {
        $jsonString = file_get_contents("php://input");
        if (empty($jsonString)) {
            return "No data received";
        }

        
        $data  = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);
        
        $id_rpd = $data['id_rpd'];
        $id_razdel = $data['id_razdel'];
        $razdel_name = $data['razdel_name'];
        $hours_lec = $data['hours_lec'];
        $hours_sem = $data['hours_sem'];
        $hours_lab = $data['hours_lab'];
        $hours_krp = $data['hours_krp'];
        $hours_samost = $data['hours_samost'];
          
        $stmt = $this->select("UPDATE `dics_razdels` SET `id_rpd`='$id_rpd',`id_razdel`='$id_razdel', `razdel_name`='$razdel_name', 
    `hours_lec`='$hours_lec', `hours_sem`='$hours_sem', `hours_lab`='$hours_lab', `hours_krp`='$hours_krp', `hours_samost`='$hours_samost' WHERE `id_rpd`='$id_rpd'");

        // Проверяем количество затронутых строк
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->execute();
        $rowCount = $stmt->rowCount();

        return "Rpd updated successfully" ;
    }


    public function addRazdel()
    {
        $jsonString = file_get_contents("php://input");
        if (empty($jsonString)) {
            return "No data received";
        }

        $data  = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);
        
        $id_rpd = $data['id_rpd'];
        $id_razdel = $data['id_razdel'];
        $razdel_name = $data['razdel_name'];
        $hours_lec = $data['hours_lec'];
        $hours_sem = $data['hours_sem'];
        $hours_lab = $data['hours_lab'];
        $hours_krp = $data['hours_krp'];
        $hours_samost = $data['hours_samost'];
        
        
        $stmt = $this->select("INSERT INTO `dics_razdels`(`id_rpd`, `id_razdel`, `razdel_name`, `hours_lec`, `hours_sem`, `hours_lab`, `hours_krp`, `hours_samost`) 
    VALUES ('$id_rpd', '$id_razdel', '$razdel_name', '$hours_lec', '$hours_sem', '$hours_lab', '$hours_krp', '$hours_samost') WHERE `id_rpd`='$id_rpd'");
    
        // Проверяем количество затронутых строк
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->execute();
        $rowCount = $stmt->rowCount();

        return "Rpd updated successfully" ;
    }

    /**
     * @param $id
     * @return false|string
     */
    public function getDetail($rpdName)
    {
        $stmt = $this->select("SELECT * FROM `DETAIL` WHERE `rpdName`='$rpdName'");
        $stmt->execute();
        $row_count = $stmt->rowCount();
    
        if ($row_count === 0) {
            $res = [
                "status" => false,
                "message" => $rpdName
            ];
            return json_encode($res);
        } else {
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }
    }



    /**
     * @param $id
     * @return false|string
     */
    public function getDetailByKod($kod)
    {
        $stmt = $this->select("SELECT SQL_CALC_FOUND_ROWS `rpdName`, `direction`,`code`,`educLvl`,`educForm`, `year`, `semester`, `course`, `hours`, `creditUnits` FROM `DETAIL` WHERE kod = '$kod'");
        $stmt->execute();
        $stmt2 = $this->select("SELECT FOUND_ROWS()");
        $stmt2->execute();
        $row_count =$stmt2->fetchColumn();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($row_count === 0){
            $res = [
                "status" => false,
                "message" => "Descipline not found"
            ];
            return json_encode($res);
        }else{
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }
    }

    //------------------------------
    //------------------------------
    //------------------------------
    //------------USERS-------------
    //------------------------------
    //------------------------------
    //------------------------------

    /**
     *
     * Метод добавляет юзеров в USERS
     *
     * @return string
     * @throws \JsonException
     */
    public function addInUser()
    {
        $data = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);

        $name = $data['NAME'];
        $login = $data['LOGIN'];

        $stmt = $this->select("INSERT INTO `USERS` (`ID`, `NAME`, `LOGIN`) VALUES (NULL, '$name', '$login' ) ");
        $stmt->execute();

        return "addInUser done - ";
    }


    /**
     *
     * Метод дает пользователей из таблицы USERS
     *
     * @return string
     * @throws \JsonException
     */
    public function getUsers()
    {
        $stmt = $this->select("SELECT `ID`, `NAME`, `LOGIN` FROM `USERS`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);

        return "getUsers done - ";
    }

    /**
     *
     * Метод дает пользователя из таблицы USERS
     *
     * @return string
     * @throws \JsonException
     */
    public function getUser($id)
    {

        $stmt = $this->select("SELECT SQL_CALC_FOUND_ROWS `ID`, `NAME`, `LOGIN` FROM `USERS` WHERE `ID` = '$id'");
        $stmt->execute();
        $stmt2 = $this->select("SELECT FOUND_ROWS()");
        $stmt2->execute();
        $row_count =$stmt2->fetchColumn();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($row_count === 0){
            $res = [
                "status" => false,
                "message" => "Descipline not found"
            ];
            return json_encode($res);
        }else{
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return json_encode($results);
        }
    }

    /**
     *
     * Метод удаляет пользователей из таблицы USERS
     *
     * @return string
     * @throws \JsonException
     */
    public function deleteUser($id)
    {
        $stmt = $this->select("DELETE FROM `USERS` WHERE `ID` =  '$id'");
        $stmt->execute();
        $stmt->fetchAll(PDO::FETCH_ASSOC);

        return "deleteUser done - ";
    }


    /**
     *
     * Метод обновляет пользователя из таблицы USERS
     *
     * @return string
     * @throws \JsonException
     */
    public function updateUser($id)
    {
        $data  = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);

        $name = $data['NAME'];
        $login = $data['LOGIN'];

        $stmt = $this->select("UPDATE `USERS` SET `NAME` = '$name', `LOGIN` = '$login' WHERE `ID` = '$id' ");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return "updateUser done - ";

    }


    //------------------------------
    //------------------------------
    //------------------------------
    //-------USERS_DISCIPLINS-------
    //------------------------------
    //------------------------------
    //------------------------------

    /**
     *
     * Метод создает связь между предмтеом и юзером
     *
     * @return string
     * @throws \JsonException
     */
    public function addConnection(): string
    {
        $data = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);

        $idUser = $data['ID_USER'];
        $idDisc = $data['ID_DISCP'];

        $stmt = $this->select("INSERT INTO `DISP_USERS_CON` (`ID`, `ID_USER`, `ID_DISCP`) VALUES (NULL, '$idUser', '$idDisc')");
        $stmt->execute();

        return "addConnection done - ";
    }


    /**
     *
     * Метод дает список связей из таблицы DISP_USERS_CON
     *
     * @return string
     * @throws \JsonException
     */
    public function getConnections(): string
    {
        $stmt = $this->select("SELECT `ID`, `ID_USER`, `ID_DISCP` FROM `DISP_USERS_CON`");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);

        return "getConnections done - ";
    }

    /**
     *
     * Метод УДАЛЯЕТ связь из таблицы DISP_USERS_CON
     *
     * @return string
     * @throws \JsonException
     */
    public function deleteConnection($id)
    {
        $stmt = $this->select("DELETE FROM `DISP_USERS_CON` WHERE `ID` =  '$id'");
        $stmt->execute();
        $stmt->fetchAll(PDO::FETCH_ASSOC);

        return "deleteConnection done - ";
    }


    /**
     *
     * Метод ОБНОВЛЯЕТ связь в таблицы DISP_USERS_CON
     *
     * @return string
     * @throws \JsonException
     */
    public function updateConnection($id)
    {
        $data  = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);

        $idUser = $data['ID_USER'];
        $idDesc = $data['ID_DISCP'];

        $stmt = $this->select("UPDATE `DISP_USERS_CON` SET `ID_USER` = '$idUser', `ID_DISCP` = '$idDesc' WHERE `ID` = '$id' ");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return "updateConnection done - ";

    }


    //------------------------------
    //------------------------------
    //------------------------------
    //-----------CUR_SES------------
    //------------------------------
    //------------------------------
    //------------------------------

    /*
     *
     * Метод создает связь между предмтеом и юзером
     *
     * @return string
     * @throws \JsonException
     */
    public function addCursAndSession($data): string
    {

        $iMax = count($data);
        $idDes = $this->getDocId();
        $DOC_ID = (int)$idDes[0]['MAX(D_ID)'];

        for ($i = 0; $i < $iMax; $i++) {
            $ID_D = $data[$i]['kod'];
            $CURS = $data[$i]['curs'];
            $SEMESTR = $data[$i]['semestr'];

            $stmt = $this->select("INSERT INTO `CURS_SEMESTR` (`ID`, `DOC_ID`, `ID_D`, `CURS`, `SEMESTR`) VALUES (NULL,'$DOC_ID', '$ID_D', '$CURS', '$SEMESTR')");
            $stmt->execute();
        }

        return "addCursAndSession done - ";
    }

    /*
     *
     * Метод показывает список семестров и курсов
     *
     * @return string
     * @throws \JsonException
     */
    public function getCursAndSession(): string
    {
        $stmt = $this->select('SELECT * from CURS_SEMESTR');
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }


    //------------------------------
    //------------------------------
    //------------------------------
    //---------listSoglTable--------
    //------------------------------
    //------------------------------
    //------------------------------

    /*
     *
     * Метод добавляет информацию для листа соглашения
     *
     * @return string
     * @throws \JsonException
     */
    public function addInList($data): string
    {
        $rasmotr = $data['rasmotr'];
        $protocolNumber = $data['protocolNumber'];
        $surName = $data['surName'];
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];

        $stmt = $this->select("INSERT INTO `listSoglTable` (`ID`, `rasmotr`, `protocolNumber`, `surName`, `firstName`, `lastName`) VALUES (NULL, '$rasmotr', '$protocolNumber', '$surName', '$firstName', '$lastName') ");
        $stmt->execute();

        return "addInList done - ";
    }

    /*
     *
     * Метод показывает информацию для листа соглашения
     *
     * @return string
     * @throws \JsonException
     */
    public function getAllList(): string
    {
        $stmt = $this->select('SELECT * from listSoglTable');
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results);
    }

    /*
     *
     * Метод обновляет информацию для листа соглашения
     *
     * @return string
     * @throws \JsonException
     */
    public function updateList($id): string
    {

        $data  = json_decode(file_get_contents("php://input"), true, 512, JSON_THROW_ON_ERROR);


        $rasmotr = $data['rasmotr'];
        $protocolNumber = $data['protocolNumber'];
        $surName = $data['surName'];
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];

        $stmt = $this->select("UPDATE `listSoglTable` SET `rasmotr` = '$rasmotr', `protocolNumber`= '$protocolNumber', `surName`= '$surName', `firstName`= '$firstName', `lastName` = '$lastName'  WHERE `ID` = '$id' ");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
//        return json_encode($results);

        return "addInList done - ";
    }



    /*
     *
     * Метод удаляет информацию для листа соглашения
     *
     * @return string
     * @throws \JsonException
     */
    public function deleteList($id): string
    {
        $stmt = $this->select("delete from listSoglTable where ID = '$id' ");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
//        return json_encode($results);

        return "addInList done - ";
    }

}