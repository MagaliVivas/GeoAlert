  
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
      { path: '/ayuda/', url: 'ayuda.html', }
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var NombreUsuario = "";
var EmailUsuario ="";
var PasswordUsuario="";
var map, platform;
var pos, latitud, longitud;


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    console.log("Vista index");
    
 
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



$$(document).on('page:init', '.page[data-name="crear-alarma"]', function (e) {
    console.log("Vista crear-alarma");

platform = new H.service.Platform({
    'apikey': 'hRXfUDJNgcg6ppmlxyXIhYk6Qaolj9bM5CzsJ8B_qi0'
   });
        var defaultLayers = platform.createDefaultLayers();
    latitud = -34.5;
    longitud = -53.6;
    map = new H.Map( document.getElementById('mapContainer'), defaultLayers.vector.normal.map,
    {
          zoom: 16,
          center: { lat: latitud, lng: longitud },
          volatility: true,
          pixelRatio: window.devicePixelRatio || 1
          });
    coords = {lat: latitud, lng: longitud};
    window.addEventListener('resize', () => map.getViewPort().resize());
 
// Centramos el mapa en las coordenadas de la marca
map.setCenter(coords);
 
// Creamos una instancia de eventos de mapa:
var mapEvents = new H.mapevents.MapEvents(map);
 
// Creamos un controlador de eventos para el mapa:
map.addEventListener('tap', function(evt) {
  // console.log(evt.type, evt.currentPointer.type);
});
 
// Evento arrastrar
var behavior = new H.mapevents.Behavior(mapEvents);
 
// Activamos la Interfaz de usuario 
var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES')
 
// Configuramos posicion de las opciones
var mapSettings = ui.getControl('mapsettings');
var zoom = ui.getControl('zoom');
var scalebar = ui.getControl('scalebar');
 
mapSettings.setAlignment('top-right');
zoom.setAlignment('right-bottom');
scalebar.setAlignment('bottom-left');

var ExtGrupo = false;
var ExtZona = false;
$$("#BtnExtenderGrupo").on('click', function() {
    if (ExtGrupo = false) {
        $$("#GrupoExt").removeClass("invisible").addClass("visible");
        ExtGrupo = true;
        console.log("deberia mostrar zona de grupos");
    } else {
        $$("#GrupoExt").removeClass("visible").addClass("invisible");
        ExtGrupo = false;
        console.log("deberia borrar zona de grupos");
    }
})
 $$("#BtnExtenderZona").on('click', function() {
    if(ExtZona = false) {
    $$("#ZonaExt").removeClass("invisible").addClass("visible");
    console.log("deberia mostrar zonas");
    ExtZona = true;
    } else {
        $$("#ZonaExt").removeClass("visible").addClass("invisible");
        console.log("deberia borrar zonas");
        ExtZona = false; 
    }
})
})





$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
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
        $$("#PageRecibidas").removeClass("visible").addClass("invisible");
        $$("#PageEnviadas").removeClass("invisible").addClass("visible");
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