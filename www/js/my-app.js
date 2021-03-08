  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var registro = true;

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
      { path: '/ingresar/', url: 'ingresar.html', },
      { path: '/inicio/', url: 'inicio.html', },
      { path: '/crear-alarma/', url: 'crear-alarma.html', },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    $$("#Ir-Ingresar").on('click', function() {
        console.log('click en Ingresar');
        mainView.router.navigate('/ingresar/');
              
    });
    $$("#Ir-Registrarse").on('click', function() {
        console.log('click en Registrarse');
        mainView.router.navigate('/registro/');
              
    });
})


$$(document).on('page:init', '.page[data-name="ingresar"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#BtnIngresar").on('click', function() {
    if(($$("#I-email").val() == "" )|| ($$("#I-password").val() == "")){
        app.dialog.alert("Complete todos los campos", "Atención");
    }  else {
        mainView.router.navigate('/inicio/');
    }
    })
})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    alert('Hello');
})


$$(document).on('page:init', '.page[data-name="inicio"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    $$("#CrearAlarma").on('click', function() {
        mainView.router.navigate('/crear-alarma/');
    })
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
var Email="";
var Password="";
    $$("#BtnRegistrarse").on('click', function() {
        console.log("llegue a funcion registrarse");
        /*if(($$("#R-nombre").val() != "" )&& ($$("#R-email").val() != "") && ($$("#R-password").val() != "")){
            console.log("llegue if");*/
            Email= $$("#R-email").val();
            Password= $$("#R-password").val();
            console.log("La contraseña es " + Password + "Y el mail es " + Email);
            CrearUsuario(Email,Password);
            if (registro == true) {
                mainView.router.navigate('/inicio/');
            }
        /*}else{
            console.log("llegue else");
            app.dialog.alert("Completa todo los campos","Atención");
        };*/
    });
})




function CrearUsuario(varEmail,varPassword) {
    console.log("Hola");
    firebase.auth().createUserWithEmailAndPassword(varEmail, varPassword)
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
        });
}