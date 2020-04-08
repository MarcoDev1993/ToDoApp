
var inserimento = document.querySelector("#invio");
var visualizza = document.querySelector("#visualizza");
console.log(inserimento);      
console.log(visualizza);      

$( "#datepicker" ).datepicker();

$( "#elimanzioneDiv" ).dialog({
autoOpen: false,
show: {
  effect: "blind",
  duration: 1000
},
hide: {
  effect: "explode",
  duration: 1000
}
});

$("#inserimentoDiv").dialog({
autoOpen: false,
show: {
  effect: "blind",
  duration: 1000
},
hide: {
  effect: "explode",
  duration: 1000
}
});

//INSERIMENTO
inserimento.onclick = function(){
  var prom = document.querySelector("#prom").value;
  console.log(prom);
  var descrizione = document.querySelector("#descrizione").value;
  console.log(descrizione);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    $("#inserimentoParag").text(this.responseText);
    $("#inserimentoDiv").dialog("open");
    $("#prom,#descrizione").val("");
    //alert(this.responseText);
  }else{
    console.log(this.responseText);
  }
};
xhttp.open("POST", "http://localhost/ToDoApp/inserimento.php?", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("prom="+prom+"&descrizione="+descrizione);
}

//VISUALIZZAZIONE
visualizza.onclick = ()=>{
 $("tr").remove();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var risp = this.responseText;
      var risposta = JSON.parse(risp);
      for (let i = 0; i < risposta.length; i++) {              
        var div_visuale = document.querySelector("#div_visual");
        div_visuale.style.display = "block";
        var table = document.querySelector("table");
        var tr = document.createElement("tr");
        table.appendChild(tr);
        //Prima colonna
        //var td = document.createElement("td");
        //td.textContent = risposta[i]["id"];
        //tr.appendChild(td);
        //Seconda colonna
        var td = document.createElement("td");
        td.textContent = risposta[i]["promemoria"];
        tr.appendChild(td);
        //Terza colonna
        var td = document.createElement("td");
        td.textContent = risposta[i]["descrizione"];
        tr.appendChild(td);
        //Quarta colonna
        var td = document.createElement("td");
        delButton = document.createElement("input");
        delButton.setAttribute("type", "button");
        delButton.setAttribute("id", risposta[i]["id"]);
        delButton.setAttribute("class", "btn btn-danger");
        delButton.setAttribute("value", "Elimina");
        td.appendChild(delButton);
        tr.appendChild(td);
        id_risp = risposta[i]["id"];
        //eliminazione
        delButton.addEventListener("click", (e)=>{
          let id = e.target.id;
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
             //alert(this.responseText);
             $("#elimanzioneParag").text(this.responseText);
             $("#elimanzioneDiv").dialog( "open" );
             visualizza.click();
             }else{
          console.log(this.responseText);
         }
           };
          xhttp.open("POST", "http://localhost/ToDoApp/eliminazione.php?", true);
           xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         xhttp.send("id="+id);
        });
        
        //Quinta colonna
        var td = document.createElement("td");
        updateButton = document.createElement("input");
        updateButton.setAttribute("type", "button");
        updateButton.setAttribute("id", risposta[i]["id"]);
        updateButton.setAttribute("class", "btn btn-primary");
        updateButton.setAttribute("value", "Modifica");
        td.appendChild(updateButton);
        tr.appendChild(td);
        //modifica
        updateButton.addEventListener("click", (e)=>{
          let updateButton = e.target;
          let id = e.target.id;
          var confirmBtn = document.createElement("button");
          confirmBtn.innerHTML = "Conferma";
          confirmBtn.setAttribute("class", "btn btn-success");
          confirmBtn.setAttribute("id", id);
                    
          //sostituzione button da modifica a conferma
          cella = updateButton.parentElement;
          cella.replaceChild(confirmBtn, updateButton);
          var primaColonna = cella.previousSibling.previousSibling.previousSibling;
          var secondaColonna = cella.previousSibling.previousSibling;

          //settaggio td e input-text sostitutive prima cella
          var firstTd = document.createElement("td");
          var inputFirst = document.createElement("input");
          inputFirst.setAttribute("type","text");
          inputFirst.value = primaColonna.childNodes["0"].nodeValue;
          firstTd.appendChild(inputFirst);
          primaColonna.parentElement.replaceChild(firstTd, primaColonna);

          //settaggio td e input-text sostitutive seconda cella
          var secondtTd = document.createElement("td");
          var inputSecond = document.createElement("input");
          inputSecond.setAttribute("type","text");
          inputSecond.value = secondaColonna.childNodes["0"].nodeValue;
          secondtTd.appendChild(inputSecond);
          secondaColonna.parentElement.replaceChild(secondtTd, secondaColonna);

          //conferma modifica
          confirmBtn.addEventListener("click", (e)=>{
            var primaCella = e.target.parentElement.previousSibling.previousSibling.previousSibling.childNodes["0"].value;
            var secondaCella = e.target.parentElement.previousSibling.previousSibling.childNodes["0"].value;
            var id_Confirm = e.target.getAttribute("id");
            console.log(id_Confirm);
            console.log(primaCella);
            console.log(secondaCella);
            //invio richiesta http e ricezione risposta
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
              alert(this.responseText);
              visualizza.click();

            }else{
              //console.log(this.responseText);
            }
          };
          xhttp.open("POST", "http://localhost/ToDoApp/update.php?", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send("prom="+primaCella+"&descrizione="+secondaCella+"&id="+id_Confirm);
          });
        })
      }
      
    }
  };
  xhttp.open("POST", "http://localhost/ToDoApp/visualizzazione.php?", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}
  