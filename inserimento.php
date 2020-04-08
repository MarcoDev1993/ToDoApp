<?php


require("./conn/conn.php");

//header('Access-Control-Allow-Origin: http://localhost/ToDoApp/inserimento.php');

//print_r($_POST);

if(isset($_POST["prom"]) && isset($_POST["descrizione"]) && $_POST["descrizione"] !== "" && $_POST["prom"] !== ""){

    //Riceve i dati dalla Ajax call
    $prom = $_POST["prom"];
    $descrizione = $_POST["descrizione"];
    $sql_id = "SELECT COUNT(id) AS N FROM ToDoApp";
    $result = $conn->query($sql_id);
    $id = $result->fetch_assoc();
    $n_id = $id["N"];
    $n_id++;

    $sql = "INSERT INTO ToDoApp(id, promemoria, descrizione) VALUES(".$n_id.",'".$prom."', '".$descrizione."')";
    if ($conn->query($sql) === TRUE) {
        //Risposta http
        echo("Hai inserito il promemoria: " . $prom);
    } else {
        echo "Errore, assicurati che i campi non siano vuoti e/o che siano stati compilati correttamente";
        //echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
}else{
    echo "Errore, assicurati che i campi non siano vuoti e/o che siano stati compilati correttamente";
}




?>