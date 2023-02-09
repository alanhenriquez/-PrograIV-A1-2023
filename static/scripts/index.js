









// Arbol de datos * * * * * * * * * *

const datos = {
    form:{
        nodos:{
        node1: document.getElementById("email"),
        nodePassword: document.getElementById("password"),
        nodeName: document.getElementById("nombreFull"),
        nodeEdad: document.getElementById("edad"),
        nodeDireccion: document.getElementById("direccion"),
        nodeDireccionBotonMap: document.getElementById("mostrar-mapa"),
        nodeParentMap: document.querySelector(".targeta-registro.map .contenedor-mapa"),
        },
        class:{
        valid: "correct",
        show: "show",
        }
    },
    map:{
        nodos:{
        nodeMap: document.querySelector("#map"),
        }
    }
}









const { createApp } = Vue;
createApp({
    data() {
        return {
            alumnos: [],
            alumno:{
                id: "",
                email: '',
                password: '',
            },

        }
    },
    methods:{
        guardarAlumno(){
          if (validEmail(this.alumno.email) && validPassword(this.alumno.password)){
            this.alumno.id = "id" + generateUniqueID();
            this.alumnos = JSON.parse(localStorage.getItem("alumno") || "[]" );
            this.alumnos.push( this.alumno );
            localStorage.setItem("alumno", JSON.stringify(this.alumnos) );
            changePageHref("templates/root.html");
          }
          else if (validEmail(this.alumno.email)){
            console.log("*** Ingreso de usuario UGB: Contraseña invalida")
          }
          else if (validPassword(this.alumno.password)){
            console.log("*** Ingreso de usuario UGB: Email invalida")
          }
          else{
            console.log("*** Ingreso de usuario UGB: Email y Contraseña invalidas")
          }
          
        },
    }
}).mount('#app');










validateEmail(document.querySelector("#email"));
  
validatePassword(datos.form.nodos.nodePassword);

validateName(datos.form.nodos.nodeName);

validateAge(datos.form.nodos.nodeEdad);

validateAddressNode(document.getElementById("direccion"));

leafletMap(datos.map.nodos.nodeMap,datos.form.nodos.nodeDireccion,13.341725,-88.418237,false);

showHideMap(datos.form.nodos.nodeDireccionBotonMap,datos.form.nodos.nodeParentMap,datos.form.class.show);

