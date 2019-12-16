function myFunction(a) {
  document.getElementById("inicio").style.display = "none";
  document.getElementById(a).style.display = "block";
  document.getElementById("box1").innerHTML = '<a href="#inicio"><img onclick="volver()" src="styles/img/volver.png" style="height:394px;width:394px; "alt=""></a>';
}

function volver() {
  document.getElementById("c2").style.width = "100%";
  document.getElementById("inicio").style.display = "block";
  document.getElementById("games").style.display = "none";
  document.getElementById("teams").style.display = "none";
  document.getElementById("contact").style.display = "none";
  document.getElementById("forum").style.display = "none";
  document.getElementById("box1").innerHTML = '<img src="styles/img/nysl_logo.png" alt="">';
  document.getElementById("t1").style.display = "block";
  document.getElementById("t2").style.display = "block";
  document.getElementById("t3").style.display = "block";  
  document.getElementById("dropdownMenu").innerHTML = 'All';
  document.getElementById("dropdownMenu2").innerHTML = 'All';  
  document.getElementById("September").style.display = "block";
  document.getElementById("October").style.display = "block";
  location.href="#top";
}

function month(mes) {
  if (mes == "September") {
    document.getElementById("September").style.display = "block";
    document.getElementById("October").style.display = "none";
  } else if (mes == "All") {
    document.getElementById("September").style.display = "block";
    document.getElementById("October").style.display = "block";
  } else {
    document.getElementById("September").style.display = "none";
    document.getElementById("October").style.display = "block";
  }
  document.getElementById("dropdownMenu2").innerHTML = mes;
  location.href = "#top";
}

function team(team) {
  if(team=="all"){
    document.getElementById("t1").style.display = "block";
    document.getElementById("t2").style.display = "block";
    document.getElementById("t3").style.display = "block";
  }
  if (team == "t1") {
    document.getElementById("t1").style.display = "block";
    document.getElementById("t2").style.display = "none";
    document.getElementById("t3").style.display = "none";
  } else if (team == "t2") {
    document.getElementById("t2").style.display = "block";
    document.getElementById("t1").style.display = "none";
    document.getElementById("t3").style.display = "none";
  } else if (team == "t3") {
    document.getElementById("t3").style.display = "block";
    document.getElementById("t2").style.display = "none";
    document.getElementById("t1").style.display = "none";
  }
  (team=="all") ? document.getElementById("dropdownMenu").innerHTML = 'All': document.getElementById("dropdownMenu").innerHTML = 'Team '+team[1];
  location.href="#top";  
}

//Esto mdifica el contenido de mi Modal
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var time = button.data('time') // Extract info from data-* attributes
  var team = button.data('team')
  var adress = button.data('adress')
  var iframe = button.data('iframe') 
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-body h1').text(team)
  modal.find('.modal-body h2').text(time)  
  modal.find('.modal-body h3').text(adress)
  $('iframe').attr("src",iframe)
})