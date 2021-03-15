  
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
      { path: '/crear-alarma/', url: 'crear-alarma.html', },
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
var map, platform;
var pos, latitud, longitud;
var db = firebase.firestore();


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    console.log("Vista index");
  $$("#MantenerSesion").on('click', function() {
    
  })
    $$("#BtnIngresar").on('click', function() {
        if(($$("#I-email").val() != "" )&& ($$("#I-password").val() != "")) {
            EmailUsuario = $$("#I-email").val();
            PasswordUsuario = $$("#I-password").val();
            /*console.log("El email es: " + EmailUsuario + "Y la contraseña es " + PasswordUsuario);*/
                firebase.auth().signInWithEmailAndPassword(EmailUsuario, PasswordUsuario)
                    .then((user) => {
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


$$(document).on('page:init', '.page[data-name="ver-grupos"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#NuevoGrupo").on('click', function() {
        mainView.router.navigate('/crear-grupo/');
    })
})



$$(document).on('page:init', '.page[data-name="crear-grupo"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#AgregarContactos").on('click', function() {
        if ($$("#NombreGrupo").val() != "") {
            NombreGrupo = $$("#NombreGrupo").val();
            console.log("Nombre del grupo es "+NombreGrupo);
            mainView.router.navigate("/agregar-contacto/");
        } else {
            app.dialog.alert("Complete todos los campos", "Atención");
        }
    })
   /* IdGrupo=;
    var grupo = {
        nombre : NombreGrupo,
    };
    db.collection("Grupos").doc(IdGrupo).set(grupo);*/
})

$$(document).on('page:init', '.page[data-name="crear-grupo"]', function (e) {
      var searchbar = app.searchbar.create({
       /* el: '.searchbar',
        searchContainer: '.list',
        searchIn: '.item-title',*/
        on: {
          search(sb, query, previousQuery) {
            console.log(query, previousQuery);
           }
        }
    })
})

$$(document).on('page:init', '.page[data-name="crear-alarma"]', function (e) {
    console.log("Vista crear-alarma");

    //------------------------------------------------------------
latitud = -32;
longitud = -60; 
platform = new H.service.Platform({
    'apikey': 'hRXfUDJNgcg6ppmlxyXIhYk6Qaolj9bM5CzsJ8B_qi0'
   });
    var defaultLayers = platform.createDefaultLayers();  
    // Instantiate (and display) a map object:
    map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
        zoom: 14,
        center: { lat: latitud, lng: longitud }
        });
 
        coords = {lat: latitud, lng: longitud};
        marker = new H.map.Marker(coords);
 
        // Add the marker to the map and center the map at the location of the marker:
        map.addObject(marker);
        map.setCenter(coords);
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
})





$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
         // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
        latitudUsuario = position.coords.latitude;
        longitudUsuario = position.coords.longitude;
        console.log("La latitud es: " + latitudUsuario + " y la longitud: " + longitudUsuario);
       /* alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');*/
    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // Do something here when page with data-name="about" attribute loaded and initialized


    $$("#CrearAlarma").on('click', function() {
        mainView.router.navigate('/crear-alarma/');
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
    })
    $$("#ContRecibidas").on('click', function() {
        $$("#PageEnviadas").removeClass("visible").addClass("invisible");
        $$("#PageRecibidas").removeClass("invisible").addClass("visible");
        console.log("Remove class enviadas");
        $$("#TxtRecibidas").removeClass("OFF");
        $$("#Enviadas").attr('src','img/enviadasOFF.png');
        $$("#TxtEnviadas").addClass("OFF");
        $$("#Recibidas").attr('src','img/recibidasON.png');
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
            Email= $$("#R-email").val();
            Password= $$("#R-password1").val();
            console.log("La contraseña es " + Password + "Y el mail es " + Email);
            CrearUsuario(Email,Password);
        NombreUsuario = $$("#I-email").val();
        console.log("NombreUsuario es" + NombreUsuario);
        } 
    });
    
    email = Email;
    var usuario = {
        nombre : NombreUsuario
    };
    db.collection("Usuarios").doc(email).set(usuario);
})


function CrearUsuario(varEmail,varPassword) {
    var registro = true;
    console.log("Hola");
    console.log("el valor de la variable inicio booleana es " + registro);
    firebase.auth().createUserWithEmailAndPassword(varEmail, varPassword)
        .then(function(){
             if (registro == true) {
                console.log("entré al if de crear usuario");
                  firebase.auth().onAuthStateChanged(function(user) {
                    console.log("user.displayName: " + user.displayName);
                    user
                    .updateProfile({ 
                      displayName: NombreUsuario,
                    })
                    .then(function(){
                      console.log("user.displayName: " + user.displayName);
                      user.sendEmailVerification();
                    });
                  });

                  app.dialog.alert("Verifique su email. Compruebe su casilla de correos","Atención");

                mainView.router.navigate('/inicio/');
            }
        console.log("el valor de la variable verdadero booleana es " + registro);
        } )
        .catch(function(error) {
            registro= false;
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
            console.log("el valor de la variable booleana false es " + registro);
        });
}