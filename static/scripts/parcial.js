


generateShortCutIcon("../../static/resource/img/logo/img1000.png");
const datos = {
    form:{
        nodos:{
        node1: document.getElementById("email"),
        nodePassword: document.getElementById("password"),
        nodeName: document.getElementById("nombreFull"),
        nodeEdad: document.getElementById("edad"),
        nodeDireccion: document.getElementById("direccion"),
        nodeDireccionBotonMap: document.querySelector(".boton-show-map"),
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
            this.clientes = JSON.parse(localStorage.getItem("cliente") || "[]" );
            this.clientes.push( this.cliente );
            localStorage.setItem("cliente", JSON.stringify(this.clientes) );
            changePageHref("root.html");
        },
    }
  }).mount('#app2');
  
  
  