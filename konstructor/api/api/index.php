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
        if(isset($id)){
            echo $post->getDetail($id);
        }
    }
    //ОТПРАВКА С СЕРВЕРА ВСЕХ ДИСЦИПЛИН
    if ($type === 'getAllDetail') {
        if(isset($id)){
            echo $post->getAllDetail($id);
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

    //ОТПРАВКА С СЕРВЕРА СПИСОК СВЗЯЕЙ
    if ($type === 'getConnections') {
        echo $post->getConnections();
    }

    //ОТПРАВКА С СЕРВЕРА СПИСОК
    if ($type === 'getList') {

        echo $post->getList();

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
} elseif ($method === 'PATCH') {

    //ОБНОВЛЕНИЕ ЮЗЕРОВ ДАННЫХ В ТАБЛИЦЕ USERS
    if ($type === 'updateUser') {
        if(isset($id)){
            echo $post->updateUser($id);
        }
    }

    //ОБНОВЛЯЕТ СВЯЗИ В ТАБЛИЦЕ DISP_USERS_CON
    if ($type === 'updateConnection') {
        if(isset($id)){
            echo $post->updateConnection($id);
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

