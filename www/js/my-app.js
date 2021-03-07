  
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
      { path: '/ingresar/', url: 'ingresar.html', },
      { patch: '/inicio/', url:'inicio.html'},
      { path: '/busqueda/', url: 'busqueda.html', },
      { path: '/menu/', url: 'menu.html', },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    $$("#Ir-Registrarse").on('click', function() {
        console.log('click en Registrarse');
        mainView.router.navigate('/registro/');
              
    });
    $$("#Ir-Ingresar").on('click', function() {
        console.log('click en ingresar');
        mainView.router.navigate('/ingresar/');
              
    });
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="ingresar"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized

})


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
var varEmail="";
var varPassword="";
console.log("Llegue funcion de registro");
    $$("BtnRegistrarse").on('click', function() {
        if($$("#R-nombre").val() != "" || $$("#R-email").val() != "" || $$("#R-password").val() != ""){
            varEmail= $$("#email").val();
            varPassword= $$("#password").val();
            CrearUsuario(varEmail,varPassword);
            console.log("Entre al if");
            console.log("El mail " + varEmail +" y la contraseña " + varPassword);
        }else{
            console.log("entre al else");
            app.dialog.alert("Completa todo los campos","Atención");
        };
    });
})






function CrearUsuario() {
    console.log("Crear usuario");
    firebase.auth().createUserWithEmailAndPassword(varEmail, varPassword)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('Clave muy débil.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
        alert("q paso?");
}