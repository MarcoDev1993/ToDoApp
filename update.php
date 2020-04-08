<?php

require("./conn/conn.php");


if(isset($_POST["prom"]) && isset($_POST["descrizione"])){
    $sql = "UPDATE ToDoApp SET  promemoria = '" .$_POST['prom']."', descrizione = '".$_POST['descrizione']."' WHERE id = ".$_POST['id'];
    //echo $sql;
    if ($conn->query($sql) === TRUE) {
        echo "Promemoria aggiornato";
    } else {
        //echo "Error updating record: " . $conn->error;
        echo "Errore nella modifica";

    }

}