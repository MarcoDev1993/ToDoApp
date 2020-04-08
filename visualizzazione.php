<?php



require("./conn/conn.php");



    $sql = "SELECT * FROM ToDoApp";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data["id"] = $row["id"];
            $data["promemoria"] = $row["promemoria"];
            $data["descrizione"] = $row["descrizione"];
            //var_dump($data);
            $dati[] = $data;

        }
        //var_dump($dati);
        echo json_encode($dati);

    } 





?>