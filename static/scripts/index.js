




generateShortCutIcon("static/resource/img/logo/img1000.png");
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
        nodeMap2: document.querySelector("#map2"),
        }
    }
}













const { createApp } = Vue;

/*
createApp({
    data() {
        return {
            alumnos: [],
            alumno:{
                usuario:{
                    id: '',
                    email: '',
                    password: '',
                },  
                cont:{
                    img: {
                      id:{
                        h:{
                          data: "Nuevo valor"
                        }
                      }
                    },
                },
            },
        }
    },
    methods:{
        guardarAlumno(){
          if (validEmail(this.alumno.usuario.email) && validPassword(this.alumno.usuario.password)){
            this.alumno.usuario.id = "id" + generateUniqueID();
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
        actualizarAlumno() {
          let alumnos = JSON.parse(localStorage.getItem("alumno") || "[]");
          let index = alumnos.findIndex(a => a.usuario.id === this.alumno.usuario.id);
          if (index !== -1) {
            if (validEmail(this.alumno.usuario.email) && validPassword(this.alumno.usuario.password)){
              alumnos[index] = this.alumno;
              localStorage.setItem("alumno", JSON.stringify(alumnos));
              changePageHref("templates/root.html");
            }
            else if (validEmail(this.alumno.usuario.email)){
              console.log("*** Actualización de usuario UGB: Contraseña invalida")
            }
            else if (validPassword(this.alumno.usuario.password)){
              console.log("*** Actualización de usuario UGB: Email invalida")
            }
            else{
              console.log("*** Actualización de usuario UGB: Email y Contraseña invalidas")
            }
          } else {
            console.log(`*** No se encontró el alumno con id ${this.alumno.usuario.id}`);
          }
        }
    }
}).mount('#app');
*/


createApp({
  data() {
      return {
          clientes: [],
          cliente:{
              registro:{
                  id: '',
                  codigo: '',
                  nombre: '',
                  direccion: '',
                  zona: '',
              }
          },
      }
  },
  methods:{
      guardarCliente(){
          this.cliente.registro.id = "id" + generateUniqueID();
          this.clientes = JSON.parse(localStorage.getItem("clientes") || "[]" );
          this.clientes.push( this.cliente );
          localStorage.setItem("clientes", JSON.stringify(this.clientes) );
          changePageHref("../../templates/root.html");
      },
  }
}).mount('#app2');








/*
validateEmail(document.querySelector("#email"));
  
validatePassword(datos.form.nodos.nodePassword);

validateName(datos.form.nodos.nodeName);

validateAge(datos.form.nodos.nodeEdad);

validateAddressNode(document.getElementById("direccion"));
*/

leafletMap(datos.map.nodos.nodeMap2,datos.form.nodos.nodeDireccion,13.341725,-88.418237,false);

showHideMap(datos.form.nodos.nodeDireccionBotonMap,datos.form.nodos.nodeParentMap,datos.form.class.show);

