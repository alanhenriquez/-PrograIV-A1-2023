









// Printers * * * * * * * * * * || • 

//----------IMPRIMIR VALORES DEL LOCAL STORAGE A TEMPLATE HTML

function printFromLocalStorageToDOM(prKeyLS, template, queryPlaceToPrint) {
  if (typeof prKeyLS !== "string" || prKeyLS === "") {
    getError("La clave debe ser una cadena no vacía.");
    return;
  }

  if (typeof template !== "string" || template === "") {
    getError("La plantilla debe ser una cadena no vacía.");
    return;
  }

  if (typeof queryPlaceToPrint !== "string" || queryPlaceToPrint === "") {
    getError("El lugar para imprimir debe ser una cadena no vacía.");
    return;
  }

  let listado = localStorage.getItem(prKeyLS);
  if (listado) {
    listado = JSON.parse(listado);
    let listaHTML = "";
    for (let i = 0; i < listado.length; i++) {
      let item = listado[i];
      let currentItem = item;
      let itemData = {};

      const regex = /{([\w.]+)}/g;
      let match;
      while ((match = regex.exec(template)) !== null) {
        const fullKey = match[1];
        const value = getValueByKeys(currentItem, fullKey);
        itemData[`{${fullKey}}`] = value;
      }

      let itemHTML = template;
      for (let key in itemData) {
        itemHTML = itemHTML.replaceAll(key, itemData[key]);
      }

      
      listaHTML += itemHTML;
    }
    document.querySelector(queryPlaceToPrint).innerHTML = listaHTML;
  } else {
    getError("No hay datos en el local storage.");
  }
}


function printTemplateDataLocalStorage(template,prKeyLS){
  let currentItem = getLocalStorageObjects(prKeyLS);
  let itemData = {};
  const regex = /{([\w.]+)}/g;
  let match;
  while ((match = regex.exec(template)) !== null) {
    const fullKey = match[1];
    const value = getValueByKeys(currentItem, fullKey);
    itemData[`{${fullKey}}`] = value;
  }
  let itemHTML = template;
  for (let key in itemData) {
    console.log(itemData[key]);
    itemHTML = itemHTML.replaceAll(key, itemData[key]);
  }
  return itemHTML;
}




function printFromLocalStorageEqualToDOM(prKeyLS, template, placeToPrint, matchValue) {
  if (typeof prKeyLS !== 'string' || prKeyLS.trim() === '') {
    getError("La clave prKeyLS debe ser una cadena no vacía.");
    return;
  }

  if (typeof template !== 'string' || template.trim() === '') {
    getError("template debe ser una cadena no vacía.");
    return;
  }

  if (typeof placeToPrint !== 'string' || placeToPrint.trim() === '') {
    getError("placeToPrint debe ser una cadena no vacía.");
    return;
  }

  if (matchValue == null) {
    getError("matchValue debe ser un valor definido.");
    return;
  }

  let listado = localStorage.getItem(prKeyLS);
  if (!listado) {
    getError("No hay datos en el local storage.");
    return;
  }

  let parsedListado;
  try {
    parsedListado = JSON.parse(listado);
  } catch (err) {
    getError('El contenido de la clave prKeyLS no es un JSON válido:');
    console.log(err);
    return;
  }

  if (!Array.isArray(parsedListado)) {
    getError('El contenido de prKeyLS no es un arreglo:' + parsedListado);
    return;
  }

  let listaHTML = "";
  for (let i = 0; i < parsedListado.length; i++) {
    let item = parsedListado[i];
    let currentItem = item;
    let itemData = {};

    const regex = /{([\w.]+)}/g;
    let match;
    let matching = false;
    while ((match = regex.exec(template)) !== null) {
      const fullKey = match[1];
      const value = getValueByKeys(currentItem, fullKey);
      itemData[`{${fullKey}}`] = value;
      if (value === matchValue) {
        matching = true;
      }
    }

    if (matching) {
      let itemHTML = template;
      for (let key in itemData) {
        itemHTML = itemHTML.replaceAll(key, itemData[key]);
      }
      listaHTML += itemHTML;
    }
  }

  if (listaHTML !== "") {
    let placeToPrintElement = document.querySelector(placeToPrint);
    if (placeToPrintElement) {
      placeToPrintElement.innerHTML = listaHTML;
    } else {
      getError("No se encontró el elemento para imprimir en el DOM." + placeToPrint);
    }
  } else {
    getError("No se encontraron resultados.");
  }
}














// Finders * * * * * * * * * * || •

//----------ENCONTRAR ELEMENTO PADRE POR CLASE, ID O TAGNAME

function findParentNode(element, targetParentClass) {
  if (!element || !targetParentClass) {
    getError('Elemento o clase de padre objetivo no definido');
    return null;
  }

  let current = element;
  while (current) {
    if (current.classList && current.classList.contains(targetParentClass) ||
        current.id && current.id === targetParentClass ||
        current.tagName && current.tagName.toUpperCase() === targetParentClass.toUpperCase()) {
      return current;
    }
    current = current.parentNode;
  }

  getError(`No se pudo encontrar el nodo padre con la clase '${targetParentClass}'`);
  return null;
};

//----------ENCONTRAR ELEMENTO HIJO POR CLASE, ID O TAGNAME

function findChildNode(element, searchValue) {
  if (!element) {
    getError("El elemento es nulo o indefinido.");
    return null;
  }
  if (!element.children) {
    getError("El elemento no tiene hijos.");
    return null;
  }
  if (typeof searchValue !== 'string' || !searchValue) {
    getError("El valor de búsqueda debe ser una cadena no vacía. Y de estructura Query");
    return null;
  }

  let children = element.children;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if ((child.classList && child.classList.contains(searchValue)) ||
        (child.id && child.id === searchValue) ||
        (child.tagName && child.tagName === searchValue.toUpperCase())) {
      return child;
    }

    let found = findChildNode(child, searchValue);
    if (found) {
      return found;
    }
  }

  return null;
}


function findChildNodes(element, searchValue) {
  if (!element) {
    getError("El elemento es nulo o indefinido.");
    return [];
  }
  
  if (!element.children) {
    getError("El elemento no tiene hijos.");
    return [];
  }

  if (typeof searchValue !== 'string' || searchValue.trim().length === 0) {
    getError("El valor de búsqueda debe ser una cadena no vacía.");
    return [];
  }

  let children = element.children;
  let matchingNodes = [];
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if ((child.classList && child.classList.contains(searchValue)) ||
        (child.id && child.id === searchValue) ||
        (child.tagName && child.tagName === searchValue.toUpperCase())) {
      matchingNodes.push(child);
    }
  }

  return matchingNodes;
}


//----------ENCONTRAR ELEMENTO HIJO DE ARRAY POR RUTA

function findKeyChildNode(data, searchKeyArray) {
  if (!Array.isArray(data)) {
    getError("Los datos no son un arreglo.");
    return [];
  }
  if (typeof searchKeyArray !== "string" || searchKeyArray === "") {
    getError("La cadena de búsqueda es inválida.");
    return [];
  }

  let result = [];
  for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let searchKeys = searchKeyArray.split("/");
      let currentItem = item;
      let found = true;
      for (let j = 0; j < searchKeys.length; j++) {
          if (!currentItem || !currentItem[searchKeys[j]]) {
              found = false;
              break;
          }
          currentItem = currentItem[searchKeys[j]];
      }

      if (found) {
          result.push(currentItem);
      }
  }
  if (result.length === 0) {
      result.push("Datos no encontrados");
  }
  return result;
}











// Getters * * * * * * * * * * || •

//----------OBTENER LOS VALORES DE ARRAY POR SUS KEYS

function getValueByKeys(obj, keysString) {
  if (typeof obj !== "object") {
    getError("El primer argumento debe ser un objeto");
    return undefined;
  }
  if (typeof keysString !== "string") {
    getError("El segundo argumento debe ser una cadena de texto");
    return undefined;
  }

  const keys = keysString.split('.');
  let value = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!value || !value.hasOwnProperty(key)) {
      getError(`No se encontró la propiedad '${key}'`);
      return undefined;
    }
    value = value[key];
    if (typeof value !== "object" && i < keys.length - 1) {
      getError(`La propiedad '${key}' no es un objeto`);
      return undefined;
    }
  }
  return value;
}


//----------OBTENER LA LINEA DE ERROR MAS EL MENSAJE DEL PORQUE

function getError(mensaje) {
  if (!mensaje || typeof mensaje !== 'string') {
    console.error(`Se debe proporcionar un mensaje de error válido`);
    return;
  }

  const error = new Error(`${mensaje} (Error en la línea ${new Error().stack.split('\n')[2].trim()})`);
  console.error(error);
}

//----------OBTENER TODO EL OBJETO DEL LOCAL STORAGE

function getLocalStorageObjects(key, callback) {
  if (!(typeof key === "string" && key.trim().length > 0)){
    getError("La clave (key) debe ser una cadena String no vacía");
  }
  else{
    if (!(typeof callback === "function")) {
      getError("El segundo parámetro (callback) debe ser una función.");
    }
    else{
      let listado = localStorage.getItem(key);
      if (listado) {
        listado = JSON.parse(listado);
        let item;
        let listaHTML = "";
        for (let i = 0; i < listado.length; i++) {
          item = listado[i];
          callback(item);
        }
      } else {
        getError("No hay datos en el local storage.");
      }
    }
  }
}












// Deleters * * * * * * * * * * || •

//----------DELETE NODO PADRE MEDIANTE HIJO

function deleteParentViaChild(child, findParentIdentifier) {
  if (!child) {
    getError("No se proporcionó un nodo hijo válido");
    return;
  }

  if (!findParentIdentifier) {
    getError("No se proporcionó un identificador válido para buscar el nodo padre");
    return;
  }

  let containerMainData = findParentNode(child, findParentIdentifier);

  if (!containerMainData) {
    getError(`No se encontró ningún nodo padre con el identificador ${findParentIdentifier}`);
    return;
  }

  try {
    containerMainData.remove();
  } catch (error) {
    getError(`Ocurrió un error al eliminar el nodo padre con el identificador ${findParentIdentifier}: ${error.message}`);
    return;
  }

  console.log(`Se eliminó exitosamente el nodo padre con el identificador ${findParentIdentifier}`);
}

//----------DELETE NODO HIJO MEDIANTE PADRE

function deleteChildViaParent(parent, findChildIdentifier, optionalIndexToDelete) {

  let children = parent.querySelectorAll(findChildIdentifier);
  let child;

  if (!parent) {
    getError("No se proporcionó un nodo padre válido");
    return;
  }

  if (!findChildIdentifier) {
    getError("No se proporcionó un identificador válido para buscar el nodo hijo");
    return;
  }
  
  if (!children || children.length === 0) {
    getError(`No se encontró ningún nodo hijo con el identificador ${findChildIdentifier}`);
    return;
  }
  
  if (children.length === 1) {
    child = children[0];
  } else {
    const childIndex = optionalIndexToDelete;
    if (!childIndex || isNaN(childIndex) || childIndex < 0 || childIndex >= children.length) {
      getError(`No se proporcionó un índice válido para el nodo hijo que se desea eliminar`);
      return;
    }
    child = children[childIndex];
  }
  
  try {
    child.remove();
  } catch (error) {
    getError(`Ocurrió un error al eliminar el nodo hijo con el identificador ${findChildIdentifier}: ${error.message}`);
    return;
  }
  
  console.log(`Se eliminó exitosamente el nodo hijo con el identificador ${findChildIdentifier}`);
}

//----------DELETE DATA DE LOCAL STORAGE + ALGUNA ESTRUCTURA HTML PADRE

function deleteLocalStorageDOMData(botonDelete,findParentIdentifier,prKeyLS,queryNodeToCompareText,keyPathToCompare) {
  if (!botonDelete || !botonDelete.target) {
    getError("No se proporcionó un botón de eliminar válido");
    return;
  }
  
  let target = botonDelete.target || botonDelete;
  let parent = findParentNode(target, findParentIdentifier);
  if (!parent) {
    getError("No se encontró un nodo padre válido");
    return;
  }
  
  let element = parent.querySelector(queryNodeToCompareText);
  if (!element) {
    getError("No se encontró un nodo hijo válido para comparar");
    return;
  }

  let texto = element.textContent;

  if (!prKeyLS) {
    getError("No se proporcionó un nombre de clave para buscar en el almacenamiento local");
    return;
  }
  
  let localStorageData = JSON.parse(localStorage.getItem(prKeyLS));
  if (!localStorageData || !Array.isArray(localStorageData)) {
    getError("No se encontró ningún dato válido en el almacenamiento local");
    return;
  }
  
  for (let i = 0; i < localStorageData.length; i++) {
      let item = localStorageData[i];
      let searchKeys = keyPathToCompare.split("/");
      let currentItem = item;
      let found = true;
      for (let j = 0; j < searchKeys.length; j++) {
          if (!currentItem[searchKeys[j]]) {
              found = false;
              break;
          }
          currentItem = currentItem[searchKeys[j]];
      }
      if (found) {
          console.log("se encontro");
          if (currentItem === texto) {
              localStorageData.splice(i, 1);
              deleteParentViaChild(target,findParentIdentifier);
              localStorage.setItem(prKeyLS, JSON.stringify(localStorageData));
              console.log("se borro");
              break;
          }
      }else{
        getError("No se pudo encontrar el elemento a eliminar");
      }
  }

}

//----------DELETE DATA DE LOCAL STORAGE

function deleteLocalStorageViaCompare(textToCompare, prKeyLS, keyPathToCompare) {
  if (!textToCompare) {
    getError("No se proporcionó un texto para comparar");
    return;
  }

  if (!prKeyLS) {
    getError("No se proporcionó una clave para acceder al almacenamiento local");
    return;
  }

  if (!keyPathToCompare) {
    getError("No se proporcionó una clave de búsqueda para comparar el texto");
    return;
  }

  let textCompare = textToCompare;
  let localStorageData = JSON.parse(localStorage.getItem(prKeyLS));
  if (!localStorageData) {
    getError(`No se encontraron datos en el almacenamiento local con la clave ${prKeyLS}`);
    return;
  }

  for (let i = 0; i < localStorageData.length; i++) {
    let item = localStorageData[i];
    let searchKeys = keyPathToCompare.split("/");
    let currentItem = item;
    let found = true;
    for (let j = 0; j < searchKeys.length; j++) {
      if (!currentItem[searchKeys[j]]) {
        found = false;
        break;
      }
      currentItem = currentItem[searchKeys[j]];
    }
    if (found) {
      if (currentItem === textCompare) {
        localStorageData.splice(i, 1);
        localStorage.setItem(prKeyLS, JSON.stringify(localStorageData));
        console.log("se borro");
        break;
      }
    } else {
      getError("No se pudo encontrar el elemento a eliminar");
      return;
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











// Existinguers * * * * * * * * * * || •

//----------ENCONTRAMOS LA EXISTENCIA DE DATA ESPECIFICA DE LOCAL STORAGE

function existLocalStorageData(textToCompare,prKeyLS,keyPathToCompare) {
  let textCompare = textToCompare;
  let localStorageData = JSON.parse(localStorage.getItem(prKeyLS));
  for (let i = 0; i < localStorageData.length; i++) {
      let item = localStorageData[i];
      let searchKeys = keyPathToCompare.split("/");
      let currentItem = item;
      let found = true;
      for (let j = 0; j < searchKeys.length; j++) {
          if (!currentItem[searchKeys[j]]) {
            return false;
          }
          currentItem = currentItem[searchKeys[j]];
      }
      if (found) {
          if (currentItem === textCompare) {
            return true;
          }
      }
  }
  return false;
}









// Mapa * * * * * * * * * * || •

function leafletMap(idMap, nodeToResult, initLat, initLong, usePopup) {
  if (!idMap || typeof idMap !== "string") {
    getError("No se proporcionó un identificador válido para el mapa");
    return;
  }

  if (!nodeToResult) {
    getError("No se proporcionó un nodo HTML válido para el resultado");
    return;
  }

  if (typeof initLat !== "number" || typeof initLong !== "number") {
    getError("Las coordenadas iniciales deben ser números");
    return;
  }

  if (typeof usePopup !== "boolean") {
    getError("El valor para usePopup debe ser un booleano");
    return;
  }

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

  if (!boton || typeof boton !== "object" || !boton.addEventListener) {
    getError("No se proporcionó un botón HTML válido");
    return;
  }

  if (!mapParent || typeof mapParent !== "object") {
    getError("No se proporcionó un nodo HTML válido para el mapa");
    return;
  }

  if (typeof addClass !== "string") {
    getError("La clase a agregar/remover debe ser una cadena de texto");
    return;
  }

  boton.addEventListener("click", function() {
    if (mapParent.classList.contains(addClass)){
      mapParent.classList.remove(addClass);
    }
    else{
      mapParent.classList.add(addClass);
    }
  })
}










// Generators * * * * * * * * * * || •

//----------GENERADOR DE ID UNICO

function generateUniqueID() {
  const id = new Date().getTime().toString(20);
  if (id.length < 5) {
    getError("El ID generado es demasiado corto");
    return null;
  }
  return id;
}


//----------GENERADOR DE TIEMPO

function generateCurrentTime() {
  const time = new Date().toLocaleTimeString();
  if (!time) {
    getError("No se pudo obtener la hora actual");
    return null;
  }
  return time;
}

//----------GENERADOR DE ICONO SHORTCUT

function generateShortCutIcon(linkImg){
  if (!linkImg) {
    getError("No se proporcionó un enlace de imagen válido");
    return;
  }
  
  const link_icon_web = document.querySelector("link[rel='shortcut icon']") || document.createElement('link');
  link_icon_web.type = 'image/x-icon';
  link_icon_web.rel = 'shortcut icon';
  link_icon_web.href = linkImg;

  const head = document.getElementsByTagName('head')[0];
  if (!head) {
    getError("No se encontró la etiqueta head en el documento");
    return;
  }

  head.appendChild(link_icon_web);
}











// Changers * * * * * * * * * * || •

//----------CAMBIO POR DIRECCION HREF

function changePageHref(link){
  if (!link || typeof link !== 'string') {
    getError("Se debe proporcionar un enlace válido");
    return;
  }

  const linkRegex = /^((http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?)$|^[\w\/]+(\.[\w-]+)*$/;

  if (!link.match(linkRegex)) {
    getError("Se debe proporcionar un enlace válido");
    return;
  }

  const linkNode = document.createElement("a");
  linkNode.setAttribute("href",link);
  linkNode.click();
}










// Actions on input * * * * * * * * * * || •

//----------ACCIONES AL ESCRIBIR

function actionOnInput(input, callback) {
  const inputElem = document.querySelector(input);
  if (!inputElem) {
    getError("El selector de entrada no es válido");
    return;
  }
  inputElem.addEventListener("input", function() {
    callback();
  });
}


//----------ACCIONES DE INPUT SEARCH ADAPTADO PARA LOCAL STORAGE

function inputSearchToLocalStorage(idInput, getKey, template, nodeToPrint, searchFieldsArray) {
  if (!idInput || typeof idInput !== 'string') {
    getError(`Se debe proporcionar un ID de entrada válido para la búsqueda`);
    return;
  }

  if (!getKey || typeof getKey !== 'string') {
    getError(`Se debe proporcionar una clave válida para obtener los datos del local storage`);
    return;
  }

  if (!template || typeof template !== 'string') {
    getError(`Se debe proporcionar una plantilla HTML válida`);
    return;
  }

  if (!nodeToPrint || typeof nodeToPrint !== 'string') {
    getError(`Se debe proporcionar un ID de nodo válido para imprimir los resultados de la búsqueda`);
    return;
  }

  if (!searchFieldsArray || !Array.isArray(searchFieldsArray)) {
    getError(`Se debe proporcionar un array de campos de búsqueda válido`);
    return;
  }

  let searchInput = document.querySelector(idInput);
  actionOnInput(idInput, function() {
    let searchTerm = searchInput.value.toLowerCase();
    let listado = localStorage.getItem(getKey);
    if (listado) {
      listado = JSON.parse(listado);
      let listaHTML = "";
      for (let i = 0; i < listado.length; i++) {
        let list = listado[i];
        let found = false;
        let itemData = {};
        const regex = /{([\w.]+)}/g;

        for (let j = 0; j < searchFieldsArray.length; j++) {
          let field = searchFieldsArray[j];
          let value = list.registro[field];
          if (value && value.toLowerCase().includes(searchTerm)) {
            found = true;
            break;
          }
        }

        if (found) {
          while ((match = regex.exec(template)) !== null) {
            const fullKey = match[1];
            const value = getValueByKeys(list, fullKey);
            itemData[`{${fullKey}}`] = value;
          }

          let itemHTML = template;
          for (let key in itemData) {
            itemHTML = itemHTML.replaceAll(key, itemData[key]);
          }
          listaHTML += itemHTML;
        }
      }
      document.querySelector(nodeToPrint).innerHTML = listaHTML;
    } else {
      console.log("No hay datos en el local storage");
    }
  });
}



