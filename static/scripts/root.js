




  


// Ejemplo de plantilla
const template = `<li>
        <div class="containerMainData">
            <div class="containerHeader">
                <div class="titulo">
                    <p>{usuario.email}</p>
                </div>
                <div class="opciones">
                    <div class="contIcon containerDeleteAll">
                        <span class="icon-delete" title="Borrar todo" id="delete"></span>
                    </div>
                    <div class="contIcon containerEditAll">
                        <span class="icon-pencil" title="Editar todo" id="edit"></span>
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

    const templateEdit = `<li>
        <div class="containerMainData">
            <div class="containerHeader">
                <div class="titulo">
                    <p>{usuario.email}</p>
                </div>
                <div class="opciones">
                    <div class="contIcon containerDeleteAll">
                        <span class="icon-delete" title="Borrar todo" id="delete"></span>
                    </div>
                    <div class="contIcon containerEditAll">
                        <span class="icon-pencil" title="Editar todo" id="edit"></span>
                    </div>
                </div>
            </div>
            <div class="containerData">
                <div class="mainData id">
                    <div class="topic">
                        <p>Id usuario - Editando</p>
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



printFromLocalStorageToDOM("alumno", template, "#list ul");

printFromLocalStorageEqualToDOM("alumno",template,"#list ul","alanderek@gmail.co");

generateShortCutIcon("../static/resource/img/logo/img1000.png");

inputSearchToLocalStorage("#search", "alumno", template, "#list ul" , ["email", "id", "password"]);

changePageHref("camera.html")


  
let deleteButton = document.querySelectorAll(".icon-delete");
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", function(e){

        deleteLocalStorageDOMData(e,"li","alumno",".containerHeader .titulo p","cont/img/id/h/data");

    });
}


function updateLSToDOM(queryButton,targetParent,queryNodeToCompareTX,queryNodeToPrint,prKeyLS,template){
    let editButton = document.querySelectorAll(queryButton);
    for (let i = 0; i < deleteButton.length; i++) {
        editButton[i].addEventListener("click", function(e){
            let target = e.target;
            let parent = findParentNode(target,targetParent);
            let textCompare = parent.querySelector(queryNodeToCompareTX).textContent;
            // console.log(textCompare);
            // deleteParentViaChild(target,)
            deleteChildViaParent(parent,".containerMainData",0);

            // printFromLocalStorageEqualToDOM(prKeyLS,template,queryNodeToPrint,textCompare);

        });
    }
}



updateLSToDOM(".icon-pencil","li",".containerHeader .titulo p","li","alumno",templateEdit);







