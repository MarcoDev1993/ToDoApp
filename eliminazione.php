<?php
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/x-www-form-urlencoded'); 
header('Access-Control-Request-Headers: X-PINGOTHER, Content-Type'); 


require("./conn/conn.php");


if(isset($_POST["id"])){

    //Riceve i dati dalla Ajax call
    $id = $_POST["id"];

    $sql = "SELECT promemoria FROM ToDoApp WHERE id = ".$id;    
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
    $promemoria = $row["promemoria"];
  
    $sql = "DELETE FROM ToDoApp WHERE id = ".$id;
    if ($conn->query($sql) === TRUE) {
        //Risposta http
        echo("Eliminazione promemoria: " . $promemoria );
    } else {
        echo("Errore eliminazione promemoria");
        //echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
}




?>