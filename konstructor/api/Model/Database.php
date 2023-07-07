<?php
declare(strict_types=1);

namespace Model;

require_once "../inc/config.php";


use Con;
use \PDO;
use PDOException;


/**
 *
 * Класс для входа в базу данных
 */
class Database
{
    private string $hostname;         // MySQL Hostname
    private string $username;         // MySQL Username
    private string $password;         // MySQL Password
    private string $database;         // MySQL Database
    public $pdo;

    /**
     *
     * Конструктор
     *
     */
    public function __construct()
    {
        $this->Connect();
    }

    /**
     *
     * Функция подлкючения к базе данных
     *
     * @param $host
     * @param $db
     * @param $user
     * @param $pass
     * @return PDO
     */


     
    public function Connect(): PDO
    {

       //$host = "127.0.0.1", $db = "rpd", $user = "root", $pass = "root"

        $this->hostname = DB_HOST; // MySQL Hostname
        $this->username = DB_USER; // MySQL Username
        $this->password = DB_PASS; // MySQL Password
        $this->database = DB_NAME;   // MySQL Database

        try {
            $this->pdo = new PDO("mysql:host=$this->hostname; dbname=$this->database", "$this->username", "$this->password");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->pdo;
        } catch (PDOException $e) {
            echo "Connection fail:" . $e->getMessage();

        }
        return $this->pdo;
    }

    /**
     *
     * Функция вывода указанных значений из класса
     *
     * @param $query
     * @return mixed
     */
    public function select($query)
    {
        return $this->pdo->prepare($query);
    }



}