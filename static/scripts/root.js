



function imprimirListadoLocalStorage() {
    let listado = localStorage.getItem("alumno");
    if (listado) {
      listado = JSON.parse(listado);
      let listaHTML = "";
      for (let i = 0; i < listado.length; i++) {
        let usuario = listado[i].usuario;
        listaHTML += `<li>
        <div class="containerMainData">
            <div class="containerHeader">
                <div class="titulo">
                    <p>`+usuario.email+`</p>
                </div>
                <div class="opciones">
                    <div class="containerDeleteAll">
                        <span class="icon-delete" title="Borrar todo" id="delete"></span>
                    </div>
                </div>
            </div>
            <div class="containerData">
                <div class="mainData id">
                    <div class="topic">
                        <p>Id usuario</p>
                    </div>
                    <div class="data">
                        <p>`+usuario.id+`</p>
                    </div>
                </div>
                <div class="mainData email">
                    <div class="topic">
                        <p>Email usuario</p>
                    </div>
                    <div class="data">
                        <p>`+usuario.email+`</p>
                    </div>
                </div>
                <div class="mainData password">
                    <div class="topic">
                    <p>Contraseña usuario</p>
                    </div>
                    <div class="data">
                        <p>`+usuario.password+`</p>
                    </div>
                </div>
            </div>
        </div>
    </li>`;
      }
      document.querySelector("#list ul").innerHTML = listaHTML;
    } else {
      console.log("No hay datos en el local storage");
    }
}


function searchFromLocalStorage(idInput, getKey, nodeToPrint, searchFields) {
    let searchInput = document.querySelector(idInput);
    actionOnInput(idInput, function() {
        let searchTerm = searchInput.value.toLowerCase();
        let listado = localStorage.getItem(getKey);
        if (listado) {
            listado = JSON.parse(listado);
            let listaHTML = "";
            for (let i = 0; i < listado.length; i++) {
                let list = listado[i];
                for (let j = 0; j < searchFields.length; j++) {
                    let field = searchFields[j];
                    let value = list.usuario[field];
                    if (value && value.toLowerCase().includes(searchTerm)) {
                        listaHTML += `
                            <li>
                                <div class="containerMainData">
                                    <div class="containerHeader">
                                        <div class="titulo">
                                            <p>`+list.usuario.email+`</p>
                                        </div>
                                        <div class="opciones">
                                            <div class="containerDeleteAll">
                                                <span class="icon-delete" title="Borrar todo" id="delete"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="containerData">
                                        <div class="mainData id">
                                            <div class="topic">
                                                <p>Id usuario</p>
                                            </div>
                                            <div class="data">
                                                <p>`+list.usuario.id+`</p>
                                            </div>
                                        </div>
                                        <div class="mainData email">
                                            <div class="topic">
                                                <p>Email usuario</p>
                                            </div>
                                            <div class="data">
                                                <p>`+list.usuario.email+`</p>
                                            </div>
                                        </div>
                                        <div class="mainData password">
                                            <div class="topic">
                                            <p>Contraseña usuario</p>
                                            </div>
                                            <div class="data">
                                                <p>`+list.usuario.password+`</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>`;
                        break;
                    }
                }
            }
            document.querySelector(nodeToPrint).innerHTML = listaHTML;
        } else {
            console.log("No hay datos en el local storage");
        }
    });
}



generateShortCutIcon("/static/resource/img/logo/img1000.png");

imprimirListadoLocalStorage();

searchFromLocalStorage("#search", "alumno", "#list ul" , ["email", "id", "password"]);

function deleteLocalStorageData(event) {
    let target = event.target;
    let emailElement = findParentNode(target, "containerMainData").querySelector(".mainData.email .data p");
    let email = emailElement.textContent;

    console.log(email);
  
    
    let localStorageData = JSON.parse(localStorage.getItem("alumno"));
    for (let i = 0; i < localStorageData.length; i++) {
      if (localStorageData[i].usuario.email === email) {
        localStorageData.splice(i, 1);
        break;
      }
    }
  
    localStorage.setItem("alumno", JSON.stringify(localStorageData));
  
    let containerMainData = findParentNode(target, "containerMainData");
    containerMainData.parentNode.remove();
    
}
  
let deleteButton = document.querySelectorAll(".icon-delete");
for (let i = 0; i < deleteButton.length; i++) {
deleteButton[i].addEventListener("click", deleteLocalStorageData);
}


let localStorageData = [{"usuario":{"id":"id35971i601c","email":"henriqueza249@gmail.com","password":"HenrquezUGB2020"},"cont":{"img":"hola"}},{"usuario":{"id":"id359a655338","email":"usis003421@ugb.edu.sv","password":"ProgresoUGB2023"},"cont":{"img":"hola"}}];

let storageData = JSON.parse(localStorage.getItem("alumno"));
let result = findKeyChildNode(storageData, "usuario");
result.forEach(element => {
    console.log(element);
});

  
  const deleteButtons = document.querySelectorAll(".icon-delete");
  const containerData = document.querySelector(".containerData");
  
  deleteButtons.forEach(element => {
    element.addEventListener("click", function(event) {
      let parent = findParentNode(event.target,"containerMainData");
      console.log(findChildNode(parent, "email"));
    });
  });
  
