  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      { path: '/about/', url: 'about.html', },
      { path: '/registro/', url: 'registro.html', },
      { path: '/inicio/', url: 'inicio.html', },
      { path: '/crear-alerta/', url: 'crear-alerta.html', },
      { path: '/ayuda/', url: 'ayuda.html', },
      { path: '/ver-grupos/', url: 'ver-grupos.html', },
      { path: '/crear-grupo/', url: 'crear-grupo.html', },
      { path: '/agregar-contacto/', url: 'agregar-contacto.html', },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var NombreUsuario = "";
var EmailUsuario ="";
var PasswordUsuario="";
var ValorRango=0;
var latitudUsuario,longitudUsuario;
var map;
var platform;
var pos;
var latitud;
var longitud;
var db = firebase.firestore();
var Email, Titulo, Contenido, Creador;
var LatitudBD, LongitudBD, EmailBD;
var distance;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    platform = new H.service.Platform({
        'apikey': 'ZHfZ_YQ-I1kSqKnmpWU7TMZQk5Vcuhv6CVvoawrGSwY'
    });


     onSuccess = function(position) {
       // var miSetOut = setTimeout( CalcularUbicacion(latitudUser, longitudUser) , 120000 );                  

        





       /* alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');*/
        latitudUser = position.coords.latitude;
        longitudUser = position.coords.longitude;
        console.log("La latitud es: " + latitudUser + " y la longitud: " + longitudUser);

    
    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    console.log("Vista index");
        //
        
  $$("#MantenerSesion").on('click', function() {
    
  })
    $$("#BtnIngresar").on('click', function() {
        if(($$("#I-email").val() != "" )&& ($$("#I-password").val() != "")) {
            EmailUsuario = $$("#I-email").val();
            PasswordUsuario = $$("#I-password").val();
            /*console.log("El email es: " + EmailUsuario + "Y la contraseña es " + PasswordUsuario);*/
                firebase.auth().signInWithEmailAndPassword(EmailUsuario, PasswordUsuario)
                    .then((user) => {
                        EmailActivo = EmailUsuario;

                        mainView.router.navigate('/inicio/');
                      })
                      .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode= 'auth/argument-error') {
                            console.log("Entre al error de mail")
                            app.dialog.alert("E-mail o contraseña incorrecta");
                        }
                });
        } else {
            app.dialog.alert("Complete todos los campos", "Atención");
        } 
        })
    $$('.login-screen').on('loginscreen:open', function (e) {
      console.log('Login screen open')
    });
    $$('.login-screen').on('loginscreen:opened', function (e) {
      console.log('Login screen opened')
    });
    $$('.login-screen').on('loginscreen:close', function (e) {
      console.log('Login screen close')
    });
    $$('.login-screen').on('loginscreen:closed', function (e) {
      console.log('Login screen closed')
    });

    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#Ir-Registrarse").on('click', function() {
        console.log('click en Registrarse');
        mainView.router.navigate('/registro/');
              
    });

})


$$(document).on('page:init', '.page[data-name="ayuda"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
   $$("#HolaAyuda").val("Hola NOMBRE, ¿En qué puedo ayudarte?" ); 
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    alert('Hello');
})



$$(document).on('page:init', '.page[data-name="agregar-contacto"]', function (e) {
var i = 0;
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log("VISTA AgregarContactos");
    var UsuariosRef = db.collection("Usuarios").orderBy("nombre").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

            /*.onSnapshot((querySnapchot) =>{
                querySnapshot.forEach((doc) => {*/
                    console.log(doc.id, " => ", doc.data());
                    $$("#ResulBusquedaUsers").append(`<li class="item-content UserBusqueda">
                                                        <div class="item-inner">
                                                            <div class="item-title" id="${doc.id}">${doc.id}</div>
                                                        </div>
                                                    </li>`);

                });
        $$(".UserBusqueda").on('click', function() {
        console.log("hice click");
       /*var IntegrantesGrupo[i] = $$(this.id);
       for (var i = 0; i < IntegrantesGrupo.length; i++) {
           console.log("Integrantes del grupo:" + IntegrantesGrupo[i]);
       }
        i= i + 1; */
    })
            }) 
            .catch((error) => {
                console.log("Error getting documents:" + error);
            })
    var searchbar = app.searchbar.create({
    el: '.searchbar',
    searchContainer: '.list',
    searchIn: '.item-title',
    on: {
        search(sb, query, previousQuery) {
        console.log(query, previousQuery);
          }
        }
      });
   
})






$$(document).on('page:init', '.page[data-name="ver-grupos"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#NuevoGrupo").on('click', function() {
        mainView.router.navigate('/crear-grupo/');
    })
})



$$(document).on('page:init', '.page[data-name="crear-grupo"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized>
    $$("#AgregarContactos").on('click', function() {
        if ($$("#NombreGrupo").val() != "") {
            NombreGrupo = $$("#NombreGrupo").val();
            console.log("Nombre del grupo es "+NombreGrupo);
            mainView.router.navigate("/agregar-contacto/");
        } else {
            app.dialog.alert("Complete todos los campos", "Atención");
        }
    })

})

$$(document).on('page:init', '.page[data-name="crear-alerta"]', function (e) {
    var EnvioA= "";
        console.log("vista crear-alerta");
        
        var defaultLayers = platform.createDefaultLayers();
 
 
 
        // Instantiate (and display) a map object:
        var circle = new H.map.Circle(
            new H.geo.Point(latitudUser, longitudUser), //center
                600, // Radius in meters
        { style: {
          fillColor: 'rgba(0,255,128,0.25)',
          lineWidth: 3,
          strokeColor: 'rgba(0,255,128,1)'
      } }
  );

  

        map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 14,
                center: { lat: latitudUser, lng: longitudUser }
            });
            coords = {lat: latitudUser, lng: longitudUser};
            var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES')
 
  // Configuramos posicion de las opciones
            var mapSettings = ui.getControl('mapsettings');
            var zoom = ui.getControl('zoom');
            var scalebar = ui.getControl('scalebar');
 
  mapSettings.setAlignment('top-right');
  zoom.setAlignment('right-bottom');
  scalebar.setAlignment('bottom-left');

            icon = new H.map.Icon('img/ubi.png');
            marker = new H.map.Marker((coords), {icon:icon});
            // Add the marker to the map and center the map at the location of the marker:
            map.addObject(marker);
            map.setCenter(coords);
            map.addObject(circle);
            behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    console.log("Vista crear-alerta");
    var ExtenderZona = false;
    $$("#BtnExtenderZona").on('click', function() {
        if (ExtenderZona == false) {
            $$("#ZonaExt").removeClass("invisible").addClass("visible");
            ExtenderZona = true;
            console.log("deberia mostrar zonas ");
        } else {
            $$("#ZonaExt").removeClass("visible").addClass("invisible");
            ExtenderZona= false;
            console.log("deberia borrar zonas");
        }
    })
    var ExtenderDest = false;
    $$("#BtnExtenderUsuario").on('click', function() {
        if (ExtenderDest == false) {
            $$("#UsuarioExt").removeClass("invisible").addClass("visible");
            ExtenderDest = true;
            Destinatario = $$("#DestinatarioAlerta").val();
            console.log("El Destinatario es " + Destinatario)
            console.log("deberia mostrar usuarios ");
        } else {
            $$("#UsuarioExt").removeClass("visible").addClass("invisible");
            ExtenderDest= false;
            console.log("deberia borrar usuarios");
        }
    })
    var ExtenderGrupo = false;
    $$("#BtnExtenderGrupo").on('click', function() {
        if (ExtenderGrupo == false) {
            $$("#GrupoExt").removeClass("invisible").addClass("visible");
            ExtenderGrupo = true;
            console.log("deberia mostrar zona de grupos");
        } else {
            $$("#GrupoExt").removeClass("visible").addClass("invisible");
            ExtenderGrupo = false;
            console.log("deberia borrar zona de grupos");
        }
    })
    $$("#BtnEnviarAlerta").on('click', function() {
        var i = 0;
        if(($$("#TituloAlerta").val() != "") && ($$("#ContenidoAlerta").val() != "")) {
            Titulo = $$("#TituloAlerta").val();
            console.log("El titulo es " + Titulo);
            Contenido = $$("#ContenidoAlerta").val();
            console.log("El contenido es " + Contenido);
            const timestamp = Date.now(); 
            const Fecha = new Date(timestamp);
            console.log(Fecha);
            Creador = EmailActivo; 
            CrearAlerta();
        } else {
            app.dialog.alert("Complete todos los campos", "Atención");
        }
        if (ExtenderZona == true) {
            if ($$("#NroRangoAEnviar").val() != "") {
                Valor= $$("#NroRangoAEnviar").val();
            }
            var UbicacionRef = db.collection("Ubicacion").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    EmailBD = doc.id;
                    LatitudBD = doc.data().Latitud;
                    LongitudBD = doc.data().Longitud;
                    Calculardistancia(LatitudBD, LongitudBD)
                    if (Valor <= distance) {
                        Destinatarios (EmailBD, i);
                    }
                });
            })  
            
        }
    })
})





$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
         // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    var miSetOut = setTimeout( ActualizarUbicacion(latitudUser, longitudUser,EmailActivo) , 120000 );
    $$("#CrearAlerta").on('click', function() {
        mainView.router.navigate('/crear-alerta/');
    })
    $$("#BtnAyuda").on('click', function() {
        $$("#PanelLateral").on('open', function () {
            app.panel.close();
      });
        mainView.router.navigate('/ayuda/');
    })
    $$("#ContEnviadas").on('click', function() {
        $$("#PageEnviadas").removeClass("invisible").addClass("visible");
        $$("#PageRecibidas").removeClass("visible").addClass("invisible");
        $$("#TxtEnviadas").removeClass("OFF");
        $$("#Recibidas").attr('src','img/recibidasOFF.png');
        $$("#TxtRecibidas").addClass("OFF");
        $$("#Enviadas").attr('src','img/enviadasON.png');
        console.log("Remove class recibidas");
        var EnviadasRef = db.collection("Alerta");
        var query = EnviadasRef.where("Creador", "==", EmailActivo)
        .onSnapshot((querySnapchot) =>{
            querySnapchot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                TituloEnv=doc.data().Titulo;
                ContenidoEnv =doc.data().Contenido;
                $$("#AlertasEnviadas2").append(`<div id="AlertasEnviadas" class="block-title theme-dark">
                    <p>
                    <h3>` + TituloEnv +`</h3></p> <p>`+ContenidoEnv+`</p>
                    </div>
                    `);
        });
    })
    })
    $$("#ContRecibidas").on('click', function() {
        $$("#PageEnviadas").removeClass("visible").addClass("invisible");
        $$("#PageRecibidas").removeClass("invisible").addClass("visible");
        console.log("Remove class enviadas");
        $$("#TxtRecibidas").removeClass("OFF");
        $$("#Enviadas").attr('src','img/enviadasOFF.png');
        $$("#TxtEnviadas").addClass("OFF");
        $$("#Recibidas").attr('src','img/recibidasON.png');
        var RecibidasRef = db.collection("Alerta");
        var query = RecibidasRef.where("Destinatario", "==", EmailActivo)
        .onSnapshot((querySnapchot) =>{
            querySnapchot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                TituloRec=doc.data().Titulo;
                ContenidoRec =doc.data().Contenido;
                $$("#AlertasRecibidas2").append(`<div id="AlertasRecibidas" class="block-title theme-dark">
                    <p>
                    <h3>` + TituloRec +`</h3></p> <p>`+ContenidoRec+`</p>
                    </div>
                    `);
        });
            db.collection('Ubicacion').doc(EmailActivo).set({
            Latitud : latitudUser,
            Longitud : longitudUser
        })
    })    
})

    //-----------------------------------------
    console.log("El email activo es " + EmailActivo);
    var RecibidasRef = db.collection("Alerta");
    var query = RecibidasRef.where("Destinatario", "==", EmailActivo)
    .onSnapshot((querySnapchot) =>{
        querySnapchot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            TituloRec=doc.data().Titulo;
            ContenidoRec =doc.data().Contenido;
            $$("#AlertasRecibidas2").append(`<div id="AlertasRecibidas" class="block-title theme-dark">
                <p>
                <h3>` + TituloRec +`</h3></p> <p>`+ContenidoRec+`</p>
                </div>
                `);
        });
    })

})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
var Email="";
var Password="";
    $$("#BtnRegistrarse").on('click', function() {
        console.log("llegue a funcion registrarse");
        if ($$("#R-password1").val() != $$("#R-password2").val()) {
            app.dialog.alert("Las contraseñas no coinciden", "Atención");
        } else {
            if (($$("#R-nombre").val() != "") && ($$("#R-email").val() != "") && ($$("#R-password1").val() != "") ) {
                Email= $$("#R-email").val();
                Password= $$("#R-password1").val();
                NombreUsuario = $$("#R-nombre").val();
                console.log("La contraseña es " + Password + "el mail es " + Email + "y el nombre es " + NombreUsuario);
                CrearUsuario(Email,Password);    
                //var usuario = {
                   // nombre : NombreUsuario
                //};
                //db.collection("Usuarios").doc(Email).set(usuario);

            }
        }
        EmailActivo = Email; 
    });
})


function CrearUsuario(varEmail,varPassword) {
    console.log("Entre en crear usuario");
    firebase.auth().createUserWithEmailAndPassword(varEmail, varPassword)
        .then(function(){
            console.log("Usuario creado");
            mainView.router.navigate('/inicio/');
            SubirUsuario;
        } )
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                app.dialog.alert('Clave muy débil.');
            } else {
                if (errorCode == 'auth/email-already-in-use') {
                    app.dialog.alert("La dirección de correo electrónico ya está siendo utilizada por otra cuenta.", "Atencion");
                }else {
                    app.dialog.alert("Completa todos los campos","Atención");
                }
            }
            console.log(error);
        });
}

 function Calculardistancia(latitud2, longitud2){
    console.log("Entre a funcion Calculardistancia");
    // Usamos la API de google para medir la distancia entre 2 puntos
    var ubi1 = new google.maps.LatLng(latitudUser, longitudUser);
    var ubi2 = new google.maps.LatLng(latitud2, longitud2)
    distance = google.maps.geometry.spherical.computeDistanceBetween(ubi1, ubi2);
    // distancia en metros
    distance = parseInt(distance);
    console.log((distance) + ' metros');
}

function Destinatarios(Emaildest, f) {
    console.log("Entre a enviar Alerta")
    DestinatariosAlerta[f] = Emaildest;
       for (var i = 0; i < DestinatariosAlerta.length; i++) {
           console.log("Integrantes del grupo:" + IntegrantesGrupo[i]);
       }
        f= f + 1;     
}

function SubirUsuario () {
    db.collection('Usuarios').doc(Email).set({
                nombre : NombreUsuario
                })
}

function CrearAlerta () {
    db.collection('Alerta').add({
                Titulo,
                Contenido,
                Fecha,
                Creador,
                Destinatario
            })
}

function ActualizarUbicacion(latitudUser, longitudUser, EmailActivo) {
    console.log("llegue a la funcion de ActualizarUbicacion");
    var UbicacionRef = db.collection("Ubicacion").doc(EmailActivo).get()
        .then((doc) => {
           // querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                EmailBD = doc.id;
                LatitudBD = doc.data().Latitud;
                LongitudBD = doc.data().Longitud;
                if (latitudUser != LatitudBD) {
                        db.collection("Ubicacion").doc(EmailActivo).update
                        ({ Latitud: LatitudBD })
                        .then(function() {
                            console.log("latitud actualizada ok");
                        })
                        .catch(function(error) {
                            console.log("Error: " + error);
                        });
                } if (longitudUser != LongitudBD) {
                    db.collection("Ubicacion").doc(EmailActivo).update
                    ({ Longitud: LongitudBD })
                    .then(function() {
                        console.log("longitud actualizada ok");
                    })
                    .catch(function(error) {
                        console.log("Error: " + error);
                    });
                } 
            //})
        })
}

