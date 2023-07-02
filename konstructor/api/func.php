<?php

function upload(): string
{
    $target_dir = "../uploads/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $result = "The file has been uploaded.222";
    } else {
        $result = "Sorry, there was an error uploading your file.333";
    }
    return $result;

//    $target_dir = "uploads/";
//    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
//    $uploadOk = 1;
//    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
//
//// Check if file already exists
//    if (file_exists($target_file)) {
//        echo "Sorry, file already exists.";
//        $uploadOk = 0;
//    }
//
//// Check if $uploadOk is set to 0 by an error
//    if ($uploadOk == 0) {
//        echo "Sorry, your file was not uploaded.";
//        // if everything is ok, try to upload file
//    } else {
//        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
//            echo "The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.";
////        echo "<script>alert(\"The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.\");</script>";
//        } else {
////        echo "<script>alert(\"Sorry, there was an error uploading your file.\");</script>";
//            echo "Sorry, there was an error uploading your file.";
//        }
//    }




//    $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'redirect-form.html';
//    header("Location: $redirect");
//    exit();
}

function deleteString(){

}


