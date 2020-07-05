
function init(){

    document.getElementById('pitch_hometeam').style.visibility="visible";
    document.getElementById('resultsdata_hometeam').style.display="";

    document.getElementById('pitch_awayteam').style.visibility="hidden";
    document.getElementById('resultsdata_awayteam').style.display="none";

    selectedTeam = 'hometeam'

    event_name_list = ['Shot','Header','Freekick','Penalty']; 
    active_event_id = 0
    click_counter = 0

    hometeamcanvas = []
    awayteamcanvas = []

    document.getElementById('selectedTeam').innerHTML = selectedTeam

    
}

function changeEventType(cell){
  
  active_event_id = active_event_id+1
  if (active_event_id >= event_name_list.length){
      active_event_id =0
  }
  
  cell.innerHTML = event_name_list[active_event_id] 

}
function deleteRow(o, pitchname, id, tn){
     
    var p = o.parentNode;
    p.parentNode.removeChild(p);
    // var table = document.getElementById("resultstable");
     //table.deleteRow(row);

    canvas = pitchname // document.getElementById(pitchname);
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(tn == 'hometeam'){
      hometeamcanvas = hometeamcanvas.filter(function(arrayItem) {
        return arrayItem.id !== id
      })

      // hometeamcanvas.splice(id-1, id-1);
      //re-draw
      hometeamcanvas.forEach(function (arrayItem) {
        var itm = arrayItem;
        itm.ctx.fillText(itm.id+"", itm.x, itm.y);
      });
  }
  else{

    awayteamcanvas = awayteamcanvas.filter(function(arrayItem) {
      return arrayItem.id !== id
    })

    // hometeamcanvas.splice(id-1, id-1);
    //re-draw
    awayteamcanvas.forEach(function (arrayItem) {
      var itm = arrayItem;
      itm.ctx.fillText(itm.id+"", itm.x, itm.y);
    });

  }

}
function changeTeam(){

    if (selectedTeam == 'hometeam'){
      
      document.getElementById('pitch_hometeam').style.visibility="hidden";
      document.getElementById('resultsdata_hometeam').style.display="none";

      document.getElementById('pitch_awayteam').style.visibility="visible";
      document.getElementById('resultsdata_awayteam').style.display="";
      
      selectedTeam = 'awayteam'

    }
    else{
      
      document.getElementById('pitch_awayteam').style.visibility="hidden";
      document.getElementById('resultsdata_awayteam').style.display="none";

      document.getElementById('pitch_hometeam').style.visibility="visible";
      document.getElementById('resultsdata_hometeam').style.display="";

      selectedTeam = 'hometeam'
    }

    document.getElementById('selectedTeam').innerHTML = selectedTeam

}

function addevent(event) {
  

    if (document.getElementsByClassName("event")[0].getAttribute("contenteditable") == "false") {

      click_counter = click_counter +1


    let rect = event.target.getBoundingClientRect() //get pitch dimensions
    
    let x = ((event.clientX - rect.left)/document.getElementById("pitch_"+selectedTeam).offsetWidth); //x position within the element.
    let y = ((event.clientY - rect.top)/document.getElementById("pitch_"+selectedTeam).offsetHeight);  //y position within the element.
    let y2 = ((event.clientY - rect.top)/document.getElementById("pitch_"+selectedTeam).offsetHeight);  //y position within the element.
    
    //y = (y*39)/61 //TODO 40/60
    y = (y*40)/60
    y = y * 0.93//to m
    y2 = (y2*60)/40 //just for visualization
    //y2 = y2 / 0.9144 //to m
    
    var x2 = event.clientX - rect.left;
    // var y2 = event.clientY - rect.top;
    var ctx = document.getElementById("pitch_"+selectedTeam).getContext("2d");
    
    ctx.font = "7px Comic Sans MS";
  
    if(selectedTeam=='hometeam'){
        ctx.fillStyle = "#ff2626"; // Red color
        hometeamcanvas.push({
          'id':click_counter,
          'x': x2,
          'y':y2*100,
          'ctx': ctx,
        })
      }
    else{
       ctx.fillStyle = "blue"; // Red color
       awayteamcanvas.push({
        'id':click_counter,
        'x': x2,
        'y':y2*100,
        'ctx': ctx,
      })

    }
    ctx.fillText(click_counter+"", x2, y2*100);

    
    let action = document.getElementById('selected').innerHTML;
    
    // document.getElementById("demo").innerHTML = coords2 //test
    
    let table = document.getElementById("resultsdata_"+selectedTeam);
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0); //id
    let cell2 = row.insertCell(1); //event
    let cell3 = row.insertCell(2); //x
    let cell4 = row.insertCell(3);  //y
    let cell5 = row.insertCell(4); //goal
    let cell6 = row.insertCell(5); //cross
    let cell7 = row.insertCell(6); //freekick or corner
    let cell8 = row.insertCell(7); //pass
    let cell9 = row.insertCell(8); //minutes selector
    let cell10 = row.insertCell(9); //del button
    
    cell1.innerHTML = click_counter+""

    // cell1.innerHTML = action;
    cell2.innerHTML = event_name_list[0] 
    cell2.setAttribute("onClick", "changeEventType(this,"+click_counter+")");
    
    //cell7.setAttribute('id',table.rows.length-1)
    cell10.innerHTML = 'X'
    cell10.setAttribute('onClick',"deleteRow(this,"+("pitch_"+selectedTeam)+","+click_counter+","+("'"+selectedTeam)+"')");//+(table.rows.length)+")");

    x = x*100;
    y = y*100;
    if(selectedTeam == 'hometeam'){

     // x = 100 -x;
      y = 100 - y;
    }
    else{
      x = 100 -x; //
    }
    

    cell3.innerHTML = Math.round(x);
    cell4.innerHTML = Math.round(y);
    
    var cb1 = document.createElement("INPUT");
    cb1.setAttribute("type", "checkbox");
    cb1.setAttribute("name", "isgoal");
    cb1.setAttribute("value", "goal");
    cell5.appendChild(cb1)

    var cb1 = document.createElement("INPUT");
    cb1.setAttribute("type", "checkbox");
    cb1.setAttribute("name", "fromcross");
    cb1.setAttribute("value", "Cross");
    cell6.appendChild(cb1)

    var cb1 = document.createElement("INPUT");
    cb1.setAttribute("type", "checkbox");
    cb1.setAttribute("name", "fromsetpiece");
    cb1.setAttribute("value", "SetPiece");
    cell7.appendChild(cb1)

    var cb1 = document.createElement("INPUT");
    cb1.setAttribute("type", "checkbox");
    cb1.setAttribute("name", "pass");
    cb1.setAttribute("value", "Pass");

    cell8.appendChild(cb1)

    var cb1 = document.createElement("INPUT");
    cb1.setAttribute("type", "text");
    cb1.setAttribute("name", "minutes");
    cb1.setAttribute("value", "5");
    cb1.setAttribute("maxlength",2);
    cb1.setAttribute("size",2);
    cb1.setAttribute("id","minutes");
    cell9.appendChild(cb1)

  
    document.getElementById("resultscontainer").scrollTop = document.getElementById("resultscontainer").scrollHeight; 
    
    } else {
      console.log("locked");
      document.getElementById("editON").innerHTML=("Turn off edit|");
    }
  }
  
  function changeEventFocus(event){
    document.getElementById("selected").removeAttribute('id');
    event.setAttribute("id", "selected");
  }
  
  function eventsEditable(){
    events = document.getElementsByClassName("event");
    
    
     if (events[0].getAttribute("contenteditable") == "false"){
       for (var i = 0; i < events.length; i++){
        events[i].setAttribute("contenteditable", true);
        //events[i].setAttribute("class", "editable");
        document.getElementById("editON").style.display = "inline";
        document.getElementById("editOFF").style.display = "none";

      }
     } else {
      
       for (var i = 0; i < events.length; i++){
        events[i].setAttribute("contenteditable", false);
        //events[i].classList.remove("editable");
        document.getElementById("editON").style.display = "none";
        document.getElementById("editOFF").style.display = "inline";
        document.getElementById("editON").innerHTML=("ON|");


      }
       
        }
      
  }

  function downloadCSV(csv, filename,filetype) {
      // CSV file
      csvFile = new Blob([csv], {type: filetype});

      // Download link
      downloadLink = document.createElement("a");

      // File name
      downloadLink.download = 'shots_'+new Date().valueOf()+'.csv';

      // Create a link to the file
      downloadLink.href = window.URL.createObjectURL(csvFile);

      // Hide download link
      downloadLink.style.display = "none";

      // Add the link to DOM
      document.body.appendChild(downloadLink);

      // Click download link
      downloadLink.click();
  }
  function apiCall(csv, apiname,filetype) {
      
          
      var csvFile;
      var downloadLink;
  
      // CSV file
      // csvFile = new Blob([csv], {type: filetype});


      var xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
         
              csvFile = this.response //new Blob([this.response], {type: 'image/jpeg'}); 
                    // Download link
              downloadLink = document.createElement("a");
          
              // File name
              downloadLink.download = 'shots_'+new Date().valueOf()+'.png';
          
              // Create a link to the file
              downloadLink.href = window.URL.createObjectURL(csvFile);
          
              // Hide download link
              downloadLink.style.display = "none";
          
              // Add the link to DOM
              document.body.appendChild(downloadLink);
          
              // Click download link
              downloadLink.click();
          }
          if (this.readyState == 4 && this.status != 200) {

                            // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                var modal = document.getElementById("myModal");

                // When the user clicks the button, open the modal 
             
                modal.style.display = "block";
                

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                  modal.style.display = "none";
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                  if (event.target == modal) {
                    modal.style.display = "none";
                  }
                }

          }
      };
      xhttp.open("POST", "https://jjay.pythonanywhere.com/"+apiname, true);
      xhttp.open("POST", "http://127.0.0.1:5000/"+apiname, true);
      
      //xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader('Authorization','Basic dXNlcjp1c2Vy');
      xhttp.responseType = 'blob';
      

      xhttp.send(csv);
  
      
  }

  function downloadData(){

    var rows = document.querySelectorAll("table tr");
    var csv = [];
    //home team name, away team name, language selected
    hometeam = document.getElementsByTagName('input').hometeamid.value;
    awayteam = document.getElementsByTagName('input').awayteamid.value;
    cb = document.getElementsByTagName('input').cblanguage;

    //csv.push([hometeam,awayteam,cb.checked?'1':'0'].join(","))
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
      
      for (var j = 0; j < cols.length-1; j++) //ignore last column because is delete button


          if (i> 0 && j >=4 && j <=7)
          {
            row.push(cols[j].firstElementChild.checked?1:0);
          }
          else if (i> 0 && j==8){

            row.push(cols[j].firstElementChild.value);
          }
          
          else{
            if(j==0 && i>0){

              row.push(cols[0].parentNode.parentNode.id.split("_")[1]) //teamname
            }
            else
              row.push(cols[j].innerText);
          }

         
      
      csv.push(row.join(","));        
    }
    
    downloadCSV(csv.join("\n"),'name','text/csv')
  }
  
  function generateReport(apiname) {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //      if (this.readyState == 4 && this.status == 200) {
    //          alert(this.responseText);
    //      }
    // };
    // xhttp.open("POST", "https://jjay.pythonanywhere.com/test", true);
    // xhttp.setRequestHeader("Content-type", "application/json");

    // xhttp.send("213");
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    hometeam = document.getElementsByTagName('input').hometeamid.value;
    awayteam = document.getElementsByTagName('input').awayteamid.value;
    cb = document.getElementsByTagName('input').cblanguage;

    csv.push([hometeam,awayteam,cb.checked?'1':'0'].join(","))
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
      
      for (var j = 0; j < cols.length-1; j++) //ignore last column because is delete button


          if (i> 0 && j >=4 && j <=7)
          {
            row.push(cols[j].firstElementChild.checked?1:0);
          }
          else if (i> 0 && j==8){

            row.push(cols[j].firstElementChild.value);
          }
          
          else{
            if(j==0 && i>0){

              row.push(cols[0].parentNode.parentNode.id.split("_")[1]) //teamname
            }
            else
              row.push(cols[j].innerText);
          }

         
      
      csv.push(row.join(","));        
    }

    // Download CSV file
    apiCall(JSON.stringify(Object.assign({}, csv)), apiname,"text/json");

  }
  
  
  function exportTableToCSV(filename) {
      var csv = [];
      var rows = document.querySelectorAll("table tr");
      
      for (var i = 0; i < rows.length; i++) {
          var row = [], cols = rows[i].querySelectorAll("td, th");
          
          for (var j = 0; j < cols.length; j++)
              row.push(cols[j].innerText);
          
          csv.push(row.join(","));        
      }
  
      // Download CSV file
      downloadCSV(csv.join("\n"), filename,"text/csv");
  }
  

  //Set max event size

  var textfields = document.getElementsByClassName("event"); 
  for(i=0; i<textfields.length; i++){
    textfields[i].addEventListener("textInput", function(e) {
        if(this.innerHTML.trim().length >= 10){
            e.preventDefault();
            console.log(this.innerHTML.trim());
            return false;
        }
    }, false);
}
  //# sourceURL=userscript.js