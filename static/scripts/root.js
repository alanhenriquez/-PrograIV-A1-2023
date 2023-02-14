




  


// Ejemplo de plantilla
const template = `<li>
        <div class="containerMainData">
            <div class="containerHeader">
                <div class="titulo">
                    <p>{usuario.email}</p>
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
                        <p>{usuario.id}</p>
                    </div>
                </div>
                <div class="mainData email">
                    <div class="topic">
                        <p>Email usuario</p>
                    </div>
                    <div class="data">
                        <p>{usuario.email}</p>
                    </div>
                </div>
                <div class="mainData password">
                    <div class="topic">
                    <p>Contraseña usuario</p>
                    </div>
                    <div class="data">
                        <p>{usuario.password}</p>
                    </div>
                </div>
            </div>
        </div>
    </li>`;

// Llamada a la función con la plantilla
printFromLocalStorageToDOM("alumno", template, "#list ul");


function inputSearchToLocalStorage(idInput, getKey, nodeToPrint, searchFieldsArray) {
    let searchInput = document.querySelector(idInput);
    actionOnInput(idInput, function() {
        let searchTerm = searchInput.value.toLowerCase();
        let listado = localStorage.getItem(getKey);
        if (listado) {
            listado = JSON.parse(listado);
            let listaHTML = "";
            for (let i = 0; i < listado.length; i++) {
                let list = listado[i];
                for (let j = 0; j < searchFieldsArray.length; j++) {
                    let field = searchFieldsArray[j];
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



generateShortCutIcon("../static/resource/img/logo/img1000.png");


inputSearchToLocalStorage("#search", "alumno", "#list ul" , ["email", "id", "password"]);




  
let deleteButton = document.querySelectorAll(".icon-delete");
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", function(e){
        deleteLocalStorageDOMData(e,"li",".containerHeader .titulo p","alumno","usuario/email");
    });
}

