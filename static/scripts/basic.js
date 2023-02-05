


// Arbol de datos

const datos = {
  form:{
    nodos:{
      nodeEmail: document.getElementById("email"),
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

// Validates * * * * * * * * * *

//----------VALIDA EMAILS

function validEmail(email) {
    //usage: validateEmail(emailNode);
    //active: Se activa de inmediato una vez se a llamado y preveido del String email.
    //requiere: 
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validEmailOnInput(email, callback) {
    //usage: validateEmailOnInput(emailNode, function(result){ console.log(result);});
    //active: Se activa cada vez que en el Nodo input cambia su value (Cuando escribe).
    //requiere: 
    const emailInput = email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    emailInput.addEventListener("input", function() {
        const isValidEmail = emailRegex.test(emailInput.value);
        callback(isValidEmail);
    });
}

function validateEmail(email){
    if (validEmail(email.value)){
        email.classList.add("correct");
        validEmailOnInput(email, function(result){
            const email = email;
            if (result) {
                email.classList.add("correct");
            }
            else {
                email.classList.remove("correct");
            }
        });
    }
    else {
        validEmailOnInput(email, function(result){
            const emails = email;
            if (result) {
                emails.classList.add("correct");
            }
            else {
                emails.classList.remove("correct");
            }
        });
    }
}

//----------VALIDA CONTRASEñAS

function validPassword(password) {
    //usage: validatePassword(passwordNode);
    //active: Se activa de inmediato una vez se a llamado y preveido del String password.
    //valid: valida que la contraseña tenga al menos 8 caracteres, con al menos una letra y un número
    let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password));
}

function validPasswordOnInput(password, callback) {
    //usage: validatePasswordOnInput(passwordNode, function(result){ console.log(result);});
    //active: Se activa cada vez que en el Nodo input cambia su value (Cuando escribe).
    //valid: valida que la contraseña tenga al menos 8 caracteres, con al menos una letra y un número
    const passwordInput = password;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    passwordInput.addEventListener("input", function() {
      const isValidPassword = passwordRegex.test(passwordInput.value);
      callback(isValidPassword);
    });
}

function validatePassword(password) {
    if (validPassword(password.value)) {
      password.classList.add("correct");
      validPasswordOnInput(document.getElementById("password"), function(result) {
        const password = document.getElementById("password");
        if (result) {
          password.classList.add("correct");
        } else {
          password.classList.remove("correct");
        }
      });
    } else {
      validPasswordOnInput(document.getElementById("password"), function(result) {
        const password = document.getElementById("password");
        if (result) {
          password.classList.add("correct");
        } else {
          password.classList.remove("correct");
        }
      });
    }
}

//----------VALIDA NOMBRES

function validName(name) {
  //usage: validateName(nameNode);
  //active: Se activa de inmediato una vez se a llamado y proveido del String 
let re = /^[a-zA-Z\u00C0-\u017F]+((\s[a-zA-Z\u00C0-\u017F]+)(\s(de\s[a-zA-Z\u00C0-\u017F]+))?)+$/;

  return re.test(String(name));
}

function validNameOnInput(name, callback) {
  //usage: validateNameOnInput(nameNode, function(result){ console.log(result);});                                                             
  //active: Se activa cada vez que en el Nodo input cambia su value (Cuando escribe).
  const nameInput = name;
  const nameRegex = /^[a-zA-Z\u00C0-\u017F]+((\s[a-zA-Z\u00C0-\u017F]+)(\s(de\s[a-zA-Z\u00C0-\u017F]+))?)+$/;

  nameInput.addEventListener("input", function() {
    const isValidName = nameRegex.test(nameInput.value);
    callback(isValidName);
  });
}

function validateName(nameFull) {
  if (validName(nameFull.value)) {
    nameFull.classList.add("correct");
    validNameOnInput(nameFull, function(result) {
      const name = nameFull;
      if (result) {
        name.classList.add("correct");
      } else {
        name.classList.remove("correct");
      }
    });
  } else {
    validNameOnInput(nameFull, function(result) {
      const name = nameFull;
      if (result) {
        name.classList.add("correct");
      } else {
        name.classList.remove("correct");
      }
    });
  }
}

//----------VALIDA EDADES

function validAge(age) {
  //usage: validateAge(ageNode);
  //active: Se activa de inmediato una vez se ha llamado y se ha previsto el valor de edad.
  //requiere: Un valor numérico para la edad.
  return !isNaN(age) && age >= 16;
}

function validAgeOnInput(age, callback) {
  //usage: validateAgeOnInput(ageNode, function(result){ console.log(result);});
  //active: Se activa cada vez que en el Nodo input cambia su valor (cuando se escribe).
  //requiere: Un valor numérico para la edad.
  const ageInput = age;

  ageInput.addEventListener("input", function() {
      const isValidAge = validAge(parseInt(ageInput.value));
      callback(isValidAge);
  });
}

function validateAge(age){
  if (validAge(parseInt(age.value))){
      age.classList.add("correct");
      validAgeOnInput(age, function(result){
          const ages = age;
          if (result) {
              ages.classList.add("correct");
          }
          else {
              ages.classList.remove("correct");
          }
      });
  }
  else {
      validAgeOnInput(age, function(result){
          const ages = age;
          if (result) {
              ages.classList.add("correct");
          }
          else {
              ages.classList.remove("correct");
          }
      });
  }
}

//----------VALIDA DIRECCIONES

function validateAddress(address) {
  //usage: validateAddress(addressNode);
  //active: Se activa de inmediato una vez se ha llamado y se ha proporcionado el nodo de dirección.
  //requiere: Dirección de vivienda que incluya al menos un número, una calle, una ciudad y un estado o un código postal.
  let re = /^\d+\s[A-z\u00C0-\u00FF]+\s[A-z\u00C0-\u00FF]+\s([A-z\u00C0-\u00FF]+\s|\d{5})/;
  return re.test(String(address).toLowerCase());
}

function validateAddressOnInput(address, callback) {
  //usage: validateAddressOnInput(addressNode, function(result){ console.log(result);});
  //active: Se activa cada vez que el nodo de dirección cambia su valor (cuando se escribe).
  //requiere: Dirección de vivienda que incluya al menos un número, una calle, una ciudad y un estado o un código postal.
  const addressInput = address;
  const addressRegex = /^\d+\s[A-z\u00C0-\u00FF]+\s[A-z\u00C0-\u00FF]+\s([A-z\u00C0-\u00FF]+\s|\d{5})/;

  addressInput.addEventListener("input", function() {
    const isValidAddress = addressRegex.test(addressInput.value);
    callback(isValidAddress);
  });
}

function validateAddressNode(address) {
  if (validateAddress(address.value)) {
    address.classList.add("correct");
    validateAddressOnInput(address, function(result) {
      const addresss = address;
      if (result) {
        addresss.classList.add("correct");
      } else {
        addresss.classList.remove("correct");
      }
    });
  } else {
    validateAddressOnInput(address, function(result) {
      const addresss = address;
      if (result) {
        addresss.classList.add("correct");
      } else {
        addresss.classList.remove("correct");
      }
    });
  }
}

// MAPA * * * * * * * * * *


function leafletMap(idMap, nodeToResult, initLat, initLong, usePopup) {
  var map = L.map(idMap).setView([initLat, initLong], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setView(pos,20);
    }, function() {
      // handleError
    });
  } else {
    // Browser doesn't support Geolocation
    handleError();
  }

  map.on('click', function(e) {
    if (usePopup) {
      var popup = L.popup();
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let v = nodeToResult;
        let errorFind = "N/A";
        v.value = [
          data.address.road,
          data.address.house_number,
          data.address.building,
          data.address.park,
          data.address.neighbourhood,
          data.address.town,
          data.address.island,
          data.address.city,
          data.address.state,
          data.address.country
        ].filter(function(addressElement) {
          return addressElement !== undefined;
        }).join(" • ")

      });
  });
}

function showHideMap (boton,mapParent,addClass){
  boton.addEventListener("click", function() {
    if (mapParent.classList.contains(addClass)){
      mapParent.classList.remove(addClass);
    }
    else{
      mapParent.classList.add(addClass);
    }
  })
}

validateEmail(datos.form.nodos.nodeEmail);
  
validatePassword(datos.form.nodos.nodePassword);

validateName(datos.form.nodos.nodeName);

validateAge(datos.form.nodos.nodeEdad);

validateAddressNode(document.getElementById("direccion"));

leafletMap(datos.map.nodos.nodeMap,datos.form.nodos.nodeDireccion,13.341725,-88.418237,false);

showHideMap(datos.form.nodos.nodeDireccionBotonMap,datos.form.nodos.nodeParentMap,datos.form.class.show);


/*
export default {
  data() {
    return {
      input1: '',
      input2: ''
    }
  },
  methods: {
    saveData() {
      localStorage.setItem('input1', this.input1);
      localStorage.setItem('input2', this.input2);
    }
  },
  mounted() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    input1.setAttribute('v-model', 'input1');
    input2.setAttribute('v-model', 'input2');
    this.$mount(input1);
    this.$mount(input2);
  }
}
*/


const { createApp } = Vue;

createApp({
  data() {
    return {
      input1: "",
      input2: ""
    }
  }
})



/*
const sendActionVue = document.querySelector("#btIngresarUGB");


const formulario = document.querySelector("#app form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
sendActionVue.addEventListener("click", function() {
  document.querySelector("body").setAttribute("class","negro");
  formulario.setAttribute("reset.prevent","nuevoDocente");
  formulario.setAttribute("v-on:submit.prevent","guardarDocente");
  const { createApp } = Vue;
        createApp({
            data() {
                return {
                    docentes: [],
                    docente:{
                        id     : '',
                        codigo : '',
                        nombre : '',
                    },
                }
            },
            methods:{
                guardarDocente(){
                    this.docentes = JSON.parse(localStorage.getItem("docente") || "[]" );
                    this.docentes.push( this.docente );
                    localStorage.setItem("docente", JSON.stringify(this.docentes) );
                    this.nuevoDocente();
                },
                nuevoDocente(){
                    this.docente.id = '';
                    this.docente.codigo = '';
                    this.docente.nombre = '';
                },
            }
        }).mount('#app');
})

*/




