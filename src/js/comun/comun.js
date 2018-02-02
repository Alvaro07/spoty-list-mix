// Globals variables
var audioObject = null;

// DOM Elements
var mainApp = document.getElementById('mainApp'),
    pageWrap = document.getElementById('pageWrap'),
    mask = document.getElementById('mask');
    


/**
 * Función generica AJAX para las consultas
 * @param {string} url - la URL enviada al back para su consulta a la api, asi como su deviolución de datos.
 * @param {fuction} cb - Callback para el uso de los datos devueltos.
 * @function
 */
 
function peticionAJAX(url, cb) {
  var xmlHttp = new XMLHttpRequest();

  document.querySelector(".loader-content").style.display = 'flex';
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4) {

      if (xmlHttp.status >= 100 && xmlHttp.status <= 300) {
        var datosCrudos = JSON.parse(xmlHttp.responseText);
        cb(datosCrudos);

      } else {
         console.error("ERROR AJAX! en", url ,JSON.parse(xmlHttp.responseText));
      }
      document.querySelector(".loader-content").style.display = 'none';
    } 
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send();  
}
    

/**
 * Escucha el evento click para construir el audio
 * Crea un objeto audio y lo reproduce con un click
 * @function
 */
 mainApp.addEventListener("click", function(e){
        var target = e.target;
        
        // si el click es en la portada del disco
        if (target !== null && target.classList.contains('play-preview')) { 
            
                
            if (target.getAttribute('data-preview') === 'null'){
                
                smallModal.open();
                smallModal.setContent("No funciona el audio ostia");
                
                return
            } 
                
            if ( target.classList.contains('playing') ){
                 audioObject.pause();
                 
            } else {
                 
                 
                if (audioObject) {
                    audioObject.pause();
                }
                
                var preview = target.getAttribute("data-preview");
                
                audioObject = new Audio(preview);
                audioObject.play();
                audioObject.setAttribute("data-id", target.getAttribute("data-id"));
                
                target.classList.add('playing');
                target.querySelector(".fa").classList.add('fa-pause');
                target.querySelector(".fa").classList.remove('fa-play');
                target.setAttribute('title', 'pause track');
                target.parentNode.classList.add('active');
                
                audioObject.addEventListener('ended', function () {
                    target.classList.remove('playing');
                    target.querySelector(".fa").classList.remove('fa-pause');
                    target.querySelector(".fa").classList.add('fa-play');
                    target.setAttribute('title', 'play track');
                    target.parentNode.classList.remove('active');
                });
                
                audioObject.addEventListener('pause', function () {
                    target.classList.remove('playing');
                    target.querySelector(".fa").classList.remove('fa-pause');
                    target.querySelector(".fa").classList.add('fa-play');
                    target.setAttribute('title', 'play track');
                    target.parentNode.classList.remove('active');
                });
            }
        };
 });        