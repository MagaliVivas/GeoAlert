  
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
      { path: '/adm-cuenta/', url: 'adm-cuenta.html', },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var NombreUsuario = "";
var Destinatario= new Array();
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
var IntegrantesGrupo = new Array();
var IntegrantesZona = new Array();
var EnviarGrupos = new Array();
var DestAlerta= new Array();
var UserEmail;
var GruposRef ="";
var TocoGrupo;
var Fecha;
var DestinatarioAlerta;
//var TituloAlerta, ContenidoAlerta, FechaAlerta, DestinatarioAlerta, CreadorAlerta;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    platform = new H.service.Platform({
        'apikey': 'ZHfZ_YQ-I1kSqKnmpWU7TMZQk5Vcuhv6CVvoawrGSwY'
    });
   // UbicacionActual;


});



$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    console.log("Vista index");
    var PrimeraVuelta = true;
        //
    //UbicacionActual;
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

        
        console.log("pasé ActualizarUbicacion");
        if (PrimeraVuelta != true) {
            ActualizarUbicacion(latitudUser, longitudUser, EmailActivo);    
        }
        //ActualizarUbicacion(latitudUser, longitudUser,EmailActivo);
    
    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 120000 });



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
                        PrimeraVuelta = false;

                            //DEBERIA SER CUANDO TRAIGO  LAS ALERTAS
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
   $$("#HolaAyuda").append("<h3><p>Hola " + EmailActivo + ", ¿En qué puedo ayudarte?</p></h3><hr/>" ); 
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
    var UsuariosRef = db.collection("Usuarios").orderBy('nombre'.toLowerCase());
    UsuariosRef.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

            /*.onSnapshot((querySnapchot) =>{
                querySnapshot.forEach((doc) => {*/
                    console.log(doc.id, " => ", doc.data());
                    ElNombre = doc.data().nombre;
                    $$("#ResulBusquedaUsers").append(`<li class="item-content ">
                                                        <div class="item-inner">
                                                            <div class="item-title UserBusqueda NoSelect" id="`+doc.id+`"><p>`+ElNombre+ `</p>`+ doc.id +` </div>
                                                        </div>
                                                    </li>`);

                });
                $$(".UserBusqueda").on('click', function() {
                    console.log(this.id);
                    UserEmail=this.id; 
                    console.log("El valor de el mail es " + UserEmail);
                   // UserEmail++;
                    //console.log("El email antes de entrar a la funcion es " + UserEmail);
                    CrearGrupo(UserEmail);
                })
            }) 
            .catch((error) => {
                console.log("Error getting documents:" + error);
            })
    $$("#ListoGrupo").on('click', function(){
        var GrupoNombre = $$("#NombreGrupo").val();  
            db.collection('Grupo').add ({
                Nombre : GrupoNombre,
                Integrantes : IntegrantesGrupo   
            })
    app.dialog.alert("Grupo " + GrupoNombre + " creado", "¡Listo!", function(){mainView.router.navigate("/inicio/")});
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
    $$("#BtnCerrarContacto").on('click', function () {
        mainView.router.navigate('/crear-grupo/');
    })
    $$("#CerrarCrearGrupo").on('click', function() {
        mainView.router.navigate('/inicio/');    
    })
})






$$(document).on('page:init', '.page[data-name="ver-grupos"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#NuevoGrupo").on('click', function() {
        mainView.router.navigate('/crear-grupo/');
    })
    var GruposRef = db.collection('Grupo')
        GruposRef.get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, "=>" ,doc.data());
                    $$("#VerGrupos").append(`<li class="accordion-item"><a class="item-content item-link" href="#">
                            <div class="item-inner">
                                <div class="item-title">`+doc.data().Nombre+`</div>
                            </div>
                        </a>
                        <div class="accordion-item-content">
                            <div class="block"><p>`+doc.data().Integrantes+`</p>
                            </div>
                        </div>
                    </li>
                    `)
                })
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
       //MAPA------------------------------------------ 
    var defaultLayers = platform.createDefaultLayers();
 
        // Instantiate (and display) a map object:
    var circle = new H.map.Circle(
        new H.geo.Point(latitudUser, longitudUser), //center
            600, // Radius in meters
        { style: {
            fillColor: 'rgba(0,255,128,0.25)',
            lineWidth: 3,
            strokeColor: 'rgba(0,255,128,1)'
            } 
        }
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

     //ICONO DEL MARCADOR
    icon = new H.map.Icon('img/ubi.png');
    marker = new H.map.Marker((coords), {icon:icon});
        // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);
    map.addObject(circle);
    behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


     //ACCIONES DE BOTONES--------------------------------------       
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
        } else {
            $$("#UsuarioExt").removeClass("visible").addClass("invisible");
            ExtenderDest= false;
            console.log("deberia borrar usuarios");
            Destinatario = "";
        }
    })


    var ExtenderGrupo = false;
    $$("#BtnExtenderGrupo").on('click', function() {
        if (ExtenderGrupo == false) {
            $$("#GrupoExt").removeClass("invisible").addClass("visible");
            var GruposRef = db.collection('Grupo')
            GruposRef.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, "=>" ,doc.data());
                        $$("#MostrarGrupos").append(`
                                <li><a href="#" class="Grupos" id=` + doc.id+`>`+doc.data().Nombre +`</a></li>`);

                            })



                    $$(".Grupos").on('click', function() {
                        console.log("Hizo click");
                        TocoGrupo = this.id;
                        console.log("Toco el grupo con id " + TocoGrupo);
                        //TraeMiembros();
                        app.dialog.confirm('¿Desea enviar la alerta' + TocoGrupo + '?', '¡Atención!', function () {TraeMiembros()});
                        })  
                    })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            ExtenderGrupo = true;
            console.log("deberia mostrar zona de grupos");
        }else {
            $$("#GrupoExt").removeClass("visible").addClass("invisible");
            ExtenderGrupo = false;
            DestinatarioAlerta = "";
            console.log("deberia borrar zona de grupos");
        }
    })


    $$("#BtnEnviarAlerta").on('click', function() {
        if(($$("#TituloAlerta").val() != "") && ($$("#ContenidoAlerta").val() != "")) {
            TituloAlerta = $$("#TituloAlerta").val();
            console.log("El titulo es " + TituloAlerta);
            ContenidoAlerta = $$("#ContenidoAlerta").val();
            console.log("El contenido es " + ContenidoAlerta);
            const timestamp = Date.now(); 
            FechaAlerta = new Date(timestamp);
            console.log(FechaAlerta);
            CreadorAlerta = EmailActivo; 
            if (ExtenderDest == true) {
                if ($$("#DestinatarioAlerta").val() == "") {
                    app.dialog.alert("El usuario no puede estar vacio", "¡Atención!");
                } else {
                    DestinatarioAlerta = $$("#DestinatarioAlerta").val();
                    //CrearAlerta(DestinatarioAlerta);
                    console.log("El Destinatario es " + DestinatarioAlerta)
                    if (DestinatarioAlerta == "") {
                        app.dialog.alert("El destinatario no puede estar vacio", "Atención");
                    } else {
                        db.collection('Alerta').add({
                            Titulo : TituloAlerta,
                            Contenido: ContenidoAlerta,
                            Fecha : FechaAlerta,
                            Creador: CreadorAlerta,
                            Destinatario: DestinatarioAlerta
                        })
                    console.log("Alerta enviada a " + DestinatarioAlerta);
                    app.dialog.alert('Alerta enviada','¡Listo!', function(){mainView.router.navigate("/inicio/")}); 
                    }
                    //console.log("deberia mostrar usuarios ");   
                }
            }
            if (ExtenderGrupo == true) {
                console.log("Llegue al if de ExtenderGrupo == true");
                    console.log("Alerta enviada a " + DestinatarioAlerta);
            }
            if (ExtenderZona == true) {
                if ($$("#NroRangoAEnviar").val() != "") {
                    console.log("llegue a calcular rango");
                    Valor= $$("#NroRangoAEnviar").val();
                    console.log("el valor elegido es " + Valor);
                }
                var UbicacionRef = db.collection("Ubicacion").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        EmailBD = doc.id;
                        LatitudBD = doc.data().Latitud;
                        LongitudBD = doc.data().Longitud;
                        Calculardistancia(LatitudBD, LongitudBD)
                        if (distance < Valor) {
                            if (EmailBD != EmailActivo) {
                                IntegrantesZona.push(EmailBD);
                                console.log("los intengrantes en la zona son" + IntegrantesZona);
                            }    
                        }
                            //app.dialog.alert('Alerta enviada','¡Listo!', function(){mainView.router.navigate("/inicio/")}); 
                    });
                    DestinatarioAlerta = IntegrantesZona;
                    console.log("Antes de ir a crear alerta tengo " + DestinatarioAlerta);
                    CrearAlerta();
                }) 
               /* .catch((error) => {
                    console.log("Error getting documents: ", error);
                });*/

            
        } else {
                console.log("llegue al dialog alert");
                app.dialog.alert("Complete todos los campos", "Atención");
            } 
        } 
    })
})




$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
    //ACTUALIZO LA POSICION
    //var miSetOut = setTimeout( ActualizarUbicacion(latitudUser, longitudUser,EmailActivo) , 120000 );
    //setInterval(UbicacionActual, 120000);
    /*UbicacionActual => {
        return new Promise 
    }*/
    //setInterval() , 120000);
    console.log("LLLEGUE AL INICIO");


    $$("#CrearAlerta").on('click', function() {
        mainView.router.navigate('/crear-alerta/');
    })
    $$("#BtnAyuda").on('click', function() {
        $$("#PanelLateral").on('open', function () {
            app.panel.close();
      });
        mainView.router.navigate('/ayuda/');
    })


    //VISUALIZACION DE ENVIADAS 
    $$("#ContEnviadas").on('click', function() {
        $$("#AlertasEnviadas2").html("");
        $$("#PageEnviadas").removeClass("invisible").addClass("visible");
        $$("#PageRecibidas").removeClass("visible").addClass("invisible");

        $$("#TxtEnviadas").removeClass("OFF");
        $$("#Enviadas").attr('src','img/enviadasON.png');

        $$("#Recibidas").attr('src','img/recibidasOFF.png');
        $$("#TxtRecibidas").addClass("OFF");
        console.log("Remove class recibidas");

        //LAS TRAIGO DE LA BD
        var EnviadasRef = db.collection("Alerta");
        var query = EnviadasRef.where("Creador", "==", EmailActivo)
        .onSnapshot((querySnapchot) =>{
            querySnapchot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                TituloEnv=doc.data().Titulo;
                ContenidoEnv =doc.data().Contenido;
                DestinatarioEnv = doc.data().Destinatario;
                $$("#AlertasEnviadas2").append(`<div class="block block-strong">
                <div class="block-title"><h3>`+TituloEnv+`</h3></div>
                        <p>`+ContenidoEnv+` </p>
                    <div class="block-header">Enviada a: `+ DestinatarioEnv+ `</div>
                `);
            });
        })
    })
//------------------------------------






















    //VISUALIZACION DE RECIBIDAS
    $$("#ContRecibidas").on('click', function() {
        $$("#AlertasRecibidas2").html("");
        $$("#PageEnviadas").removeClass("visible").addClass("invisible");
        $$("#PageRecibidas").removeClass("invisible").addClass("visible");
        console.log("Remove class enviadas");

        $$("#TxtRecibidas").removeClass("OFF");
        $$("#Recibidas").attr('src','img/recibidasON.png');

        $$("#TxtEnviadas").addClass("OFF");
        $$("#Enviadas").attr('src','img/enviadasOFF.png');


        //LAS TRIAGO DE LA BD
        var RecibidasRef = db.collection("Alerta");
        var query = RecibidasRef.where("Destinatario", "array-contains", EmailActivo).where("Creador", "!=", "EmailActivo")
        //var query = RecibidasRef.where("Destinatario", "==", EmailActivo)
        //var query = RecibidasRef.where("Creador", "!=", EmailActivo)
        .onSnapshot((querySnapchot) =>{
            querySnapchot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                TituloRec=doc.data().Titulo;
                ContenidoRec =doc.data().Contenido;
                CreadorRec = doc.data().Creador;
                $$("#AlertasRecibidas2").append(`<div class="block block-strong">
                <div class="block-title"><h3>`+TituloRec+`</h3></div>
                    <div class="block-header">Recibida de: `+ CreadorRec+ `</div>
                        <p>`+ContenidoRec+` </p>
                    <div class="block-footer "><button class="button col BtnResponder" id="`+CreadorRec+`">Toque aquí para responder</button>
                </div>
                `);
            });
        })
        var query = RecibidasRef.where("Destinatario", "==", EmailActivo).where("Creador", "!=", EmailActivo)
        //var query = RecibidasRef.where("Creador", "!=", EmailActivo)
        .onSnapshot((querySnapchot) =>{
            querySnapchot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                TituloRec=doc.data().Titulo;
                ContenidoRec =doc.data().Contenido;
                CreadorRec = doc.data().Creador;
                $$("#AlertasRecibidas2").append(`<div class="block block-strong">
                <div class="block-title"><h3>`+TituloRec+`</h3></div>
                    <div class="block-header">Recibida de: `+ CreadorRec+ `</div>
                        <p>`+ContenidoRec+` </p>
                    <div class="block-footer "><button class="button col BtnResponder" id="`+CreadorRec+`">Toque aquí para responder</button>
                </div>
                `);
            });
        })



            //GUARDO LA UBICACION EN LA BD
            db.collection('Ubicacion').doc(EmailActivo).set({
            Latitud : latitudUser,
            Longitud : longitudUser
        })
    })    

    //-----------------------------------------
    console.log("El email activo es " + EmailActivo);
    var RecibidasRef = db.collection("Alerta");
    var query = RecibidasRef.where("Destinatario", "array-contains", EmailActivo).where("Creador", "!=", "EmailActivo")
    //var query = RecibidasRef.where("Destinatario", "==", EmailActivo).where("Destinatario", "!=", EmailActivo)
    .onSnapshot((querySnapchot) =>{
        querySnapchot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            TituloRec=doc.data().Titulo;
            ContenidoRec =doc.data().Contenido;
            CreadorRec = doc.data().Creador;
            $$("#AlertasRecibidas2").append(`<div class="block block-strong">
                <div class="block-title"><h3>`+TituloRec+`</h3></div>
                    <div class="block-header">Recibida de: `+ CreadorRec+ `</div>
                        <p>`+ContenidoRec+` </p>
                    <div class="block-footer"><button class="button col BtnResponder" id="`+CreadorRec+`">Toque aquí para responder</button></div>
                </div>
            `);
        });
    })
    var query = RecibidasRef.where("Destinatario", "==", EmailActivo).where("Creador", "!=", EmailActivo)
        //var query = RecibidasRef.where("Creador", "!=", EmailActivo)
        .onSnapshot((querySnapchot) => {
            querySnapchot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                TituloRec=doc.data().Titulo;
                ContenidoRec =doc.data().Contenido;
                CreadorRec = doc.data().Creador;
                $$("#AlertasRecibidas2").append(`<div class="block block-strong">
                <div class="block-title"><h3>`+TituloRec+`</h3></div>
                    <div class="block-header">Recibida de: `+ CreadorRec+ `</div>
                        <p>`+ContenidoRec+` </p>
                    <div class=" block-footer"><button class="button col BtnResponder" id="`+CreadorRec+`">Toque aquí para responder</button></div>
                </div>
                `);
            });
        })
        $$(".BtnResponder").on('click', function () {
            console.log("Ya hice click en el creador " + CreadorRec);
        })
    })
  
//----------------------------------------------------------------------
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
    //Destinatarios;
}

function Destinatarios(Emaildest) {
    console.log("Entre a enviar Alerta")
    console.log("El email Destinatario es " + Emaildest);

}


function SubirUsuario () {
    console.log('Llegue a subir usuario');
    db.collection('Usuarios').doc(Email).set({
                nombre : NombreUsuario,
                })
    console.log('Subi el nombre');
}

function CrearAlerta (){
    console.log("llegue a crear alerta");
    console.log("El destinatario del grupo en la funcion es " + DestinatarioAlerta)
    if (DestinatarioAlerta == "") {
        app.dialog.alert("El destinatario no puede estar vacio", "Atención");
    } else {
        db.collection('Alerta').add({
                    Titulo : TituloAlerta,
                    Contenido: ContenidoAlerta,
                    Fecha : FechaAlerta,
                    Creador: CreadorAlerta,
                    Destinatario: DestinatarioAlerta
                })
        app.dialog.alert('Alerta enviada','¡Listo!', function(){mainView.router.navigate("/inicio/")}); 
        console.log("Alerta enviada a " + DestinatarioAlerta);

        
    }
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
                            console.log("la nueva latitud es: " + LatitudBD);
                        })
                        .catch(function(error) {
                            console.log("Error: " + error);
                        });
                } else {
                    console.log("Latitud sigue siendo igual");
                } ;
                if (longitudUser != LongitudBD) {
                    db.collection("Ubicacion").doc(EmailActivo).update
                    ({ Longitud: LongitudBD })
                    .then(function() {
                        console.log("longitud actualizada ok");
                        console.log("la nueva longitud es: " + LongitudBD);
                    })
                    .catch(function(error) {
                        console.log("Error: " + error);
                    });
                } else {
                    console.log("longitud sigue siendo igual");
                }
            //})
        })
}

function CrearGrupo() {
    //UserEmail += 1;
    console.log("El user email es " + UserEmail);
    IntegrantesGrupo.push(UserEmail);
    console.log(IntegrantesGrupo);
}


function TraeMiembros(){
    var query = db.collection("Grupo").doc(TocoGrupo).get()
    .then((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("Entre en la consulta");
        DestAlerta = doc.data().Integrantes
        console.log("los integrantes son: " + DestAlerta);
        DestinatarioAlerta = DestAlerta;
        console.log("En destinatario quedo: " + DestinatarioAlerta);
        if(($$("#TituloAlerta").val() != "") && ($$("#ContenidoAlerta").val() != "")) {
            TituloAlerta = $$("#TituloAlerta").val();
            console.log("El titulo es " + TituloAlerta);
            ContenidoAlerta = $$("#ContenidoAlerta").val();
            console.log("El contenido es " + ContenidoAlerta);
            const timestamp = Date.now(); 
            FechaAlerta = new Date(timestamp);
            console.log(FechaAlerta);
            CreadorAlerta = EmailActivo; 
            CrearAlerta();}
    })
}
