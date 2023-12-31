<?php


//die($_GET['q']);
//die(print_r($_POST));


declare(strict_types=1);

namespace Api;

require_once '../vendor/autoload.php';
require_once "../func.php";

use Model;
use Model\Descipline;
use Model\Document;
use Model\XmlToJson;
use PDO;
use \PDOException;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');


header('Content-type: json/application');

//require_once "functions.php";
require_once "../func.php";


$method = $_SERVER['REQUEST_METHOD'];

@$q = $_GET['q'];
@$params = explode('/', $q ?: "");

$type = $params[0];
@$id = (int)$params[1]; ///  можно ????
@$rpdName = $_GET['rpdName'];
@$id_rpd = $_GET['id_rpd'];

$doc = new Document();
$post = new Model\PostsModel();
$rpd = new Model\Rpd();

if ($method === 'GET') {
    //ОТПРАВКА С СЕРВЕРА СПИСОК ДОКУМЕНТОВ
    if ($type === 'getDocs') {
        echo $post->getDocuments();
    }
    //ОТПРАВКА С СЕРВЕРА СПИСОК ДЕСЦИПЛИН
    if ($type === 'getDscplns') {
        if(isset($id)){
            echo $post->getDescipline($id);
        }
    }
    //ОТПРАВКА С СЕРВЕРА ПОЛЯ ВЫБРАННОЙ ДЕСЦИПЛИНЫ
    if ($type === 'getDetail') {
        if(isset($rpdName)){
            echo $post->getDetail($rpdName);
        }
    }
    if ($type === 'getAllEducDirection') {
        if(isset($id)){
            echo $post->getAllEducDirection($id);
        }
    }
    //ОТПРАВКА С СЕРВЕРА ВСЕХ ДИСЦИПЛИН
    if ($type === 'getAllDetail') {
        if(isset($id)){
            echo $post->getAllDetail($id);
        }
    }
    //ОТПРАВКА С СЕРВЕРА ДИСЦИПЛИН с именем $rpdName 
    if ($type === 'getDetailByrpdName') {
        if(isset($id)){
            echo $post->getDetailByrpdName($id);
        }
    }
    //ОТПРАВКА С СЕРВЕРА СПИСОК РПД
    if ($type === 'getAllRpd') {
        echo $post->getAllRpd();
    }
    //ОТПРАВКА С СЕРВЕРА ПОЛЯ ВЫБРАННОГО РПД
    if ($type === 'getRpd') {
        if(isset($id)){
            echo $post->getRpd($id);
        }
    }

    //ОТПРАВКА С СЕРВЕРА ВСЕХ ДАННЫХ ИЗ ТАБЛИЦЫ USERS
    if ($type === 'getUsers') {
        echo $post->getUsers();
    }

    //ОТПРАВКА С СЕРВЕРА ДЛЯ 1 USERS
    if ($type === 'getUser') {
        if(isset($id)){
            echo $post->getUser($id);
        }
    }

    //ОТПРАВКА С СЕРВЕРА СПИСОК СВЯЗЕЙ
    if ($type === 'getConnections') {
        echo $post->getConnections();
    }

    //ОТПРАВКА С СЕРВЕРА СПИСОК
    if ($type === 'getList') {

        echo $post->getList();

    }

    //ОТПРАВКА С СЕРВЕРА РАЗДЕЛОВ
    if ($type === 'getCountRazdel') {
        if(isset($id)){
            echo $post->getCountRazdel($id);
        }
    }

} elseif ($method === 'POST') {
    //ОТПРАВКА НА СЕРВЕР ФАЙЛА
    if ($type === 'uploadFile') {

        echo $doc->upload(); // загружает файл
        echo "\n ================= \n";
        echo $doc->deleteString(); // вырезает ненужные строки
        echo "\n ================= \n";
        echo $doc->toJson(); // превращает файл в json
        echo "\n ================= \n";
        echo $doc->insertData(); // заполняет в DETAIL / DISCIPLINES / DOCUMENTS / CURS_SEMESTR
        echo "\n ================= \n";
        echo $post->createRpd(); // Создание рпд
        echo "\n ================= \n";
    }
    //СОЗДАНИЕ РПД
    if ($type === 'createRpd') {

        echo $post->createRpd();

    }
    //ОТПРАВКА НА СЕРВЕР СОЗДАННЫХ ЮЗЕРОВ/ПРЕПОДАВАТЕЛЕЙ
    if ($type === 'addInUser') {

        echo $post->addInUser();

    }
    //ОТПРАВКА НА СЕРВЕР СОЗДАННУЮ СВЯЗЬ
    if ($type === 'addConnection') {

        echo $post->addConnection();

    }
    //СОЗДАТЬ ЛИСТ
    if ($type === 'addInList') {

        echo $post->addInList();

    }
    //СОЗДАТЬ РАЗДЕЛ
    if ($type === 'addRazdel') {
        if(isset($id_rpd)){
            echo $post->addRazdel($id_rpd);
        }
    }
} elseif ($method === 'PATCH') {

    //ОБНОВЛЕНИЕ ЮЗЕРОВ ДАННЫХ В ТАБЛИЦЕ USERS
    if ($type === 'updateUser') {
        if(isset($id)){
            echo $post->updateUser($id);
        }
    }

    //ОБНОВЛЕНИЕ РАЗДЕЛОВ ДИСЦИПЛИН 
    if ($type === 'updateRazdel') {
        if(isset($id_rpd)){
            echo $post->updateRazdel($id_rpd);
        }
    }

    //ОБНОВЛЯЕТ СВЯЗИ В ТАБЛИЦЕ DISP_USERS_CON
    if ($type === 'updateConnection') {
        if(isset($id)){
            echo $post->updateConnection($id);
        }
    }
    
    //ОБНОВЛЯЕТ ПОЛЯ В ТАБЛИЦЕ RPD 
    if ($type === 'updateRpd') {
        if(isset($id_rpd)){
            echo $post->updateRpd($id_rpd);
        }
    }

} elseif ($method === 'DELETE') {

    //УДАЛЕНИЕ ЮЗЕРА ИЗ USERS
    if ($type === 'deleteUser') {
        if(isset($id)){
            echo $post->deleteUser($id);
        }
    }

    //УДАЛЕНИЕ ЮЗЕРА ИЗ DOCUMENTS
    if ($type === 'deleteDoc') {
        if(isset($id)){
            echo $post->deleteDoc($id);
        }
    }

    //УДАЛЕНИЕ связь ИЗ таблицы связей
    if ($type === 'deleteConnection') {
        if(isset($id)){
            echo $post->deleteConnection($id);
        }
    }

}

