import { getAllContacts, removeContact } from "./API/crud.js"
const table = document.getElementById('table-body')
const btnAddContact = document.getElementById('Add')
const prev = document.getElementById('previous')
const next = document.getElementById('next')
const pageshowing = document.getElementById('showing')

let token = localStorage.getItem('token')
if (!token) {
    window.location.replace("./pages/login.html")
}
document.addEventListener('DOMContentLoaded', async() => {

    let contacts = await getAllContacts() //Obtenemos la data de todos los usuarios en MongoDB
    let data = contacts.data

    /*
    En base a la data obtenida calculamos su paginación y devolvemos la información
    de usuarios para mostrar en la página
    */
    let datalength = data.length //Contamos los usuarios
    const itemsxpage = 5; //Definimos cuantos usuarios mostramos x página
    let totalpages = Math.ceil(datalength / itemsxpage) //Calculamos cuantas páginas

    let cpage = 1 //Definimos la página actual
    let page = pagination(cpage) //Obtenemos la data de la página actual
    buildPage(page) //Construimos la tabla de usuarios

    btnAddContact.addEventListener('click', () => {
        window.location.replace(`./pages/new-user.html`)
    })

    
    

    //Función para limpiar el html de la data eliminada
    function cleanHTML() {
        while (table.firstChild) {
            table.removeChild(table.firstChild)
        }
    }

    /*Botones previous y next para el control de la Paginación */
    //Evento para el botón previous Page
    prev.addEventListener('click', () => {
        //En base a la página actual muestra la nueva página y limita página 0, -1, -2...
        if (cpage > 1) {
            cleanHTML()
            cpage--;
            page = pagination(cpage)
            buildPage(page)
        } else {
            cleanHTML()
            cpage = 1
            page = pagination(cpage)
            buildPage(page)
        }
    })

    //Evento para el botón next Page
    next.addEventListener('click', () => {
        if (cpage < totalpages) { //Si la pagina actual es menor al total de páginas, muestra la pag.
            cleanHTML()
            cpage++;
            page = pagination(cpage)
            buildPage(page)
        } else { //Limita el botón para mostrar solo la última página
            cleanHTML()
            cpage = totalpages;
            page = pagination(cpage)
            buildPage(page)
        }


    })

    //Función que recibe el núm de la pagina actual y devuelve la data a mostrar x página
    function pagination(cpage) {
        let actualpage = cpage;

        let start = (actualpage - 1) * itemsxpage
        let end = start + itemsxpage;

        let pshow = document.createElement('p')
        pshow.innerText = `Página ${actualpage} de ${totalpages}`
        pageshowing.removeChild(pageshowing.firstChild)
        pageshowing.appendChild(pshow)

        return data.slice(start, end)

    }

    //Función que recibe la data de los usuarios y la muestra en el HTML
    function buildPage(page) {
        for (const usr in page) {
            let row = document.createElement('div')
            row.innerHTML = `
            <p>${page[usr].name}</p>
            <p>${page[usr].email}</p>
            <p>${page[usr].phone}</p>
            <div id="row-btns" class="row-btns">
                
                <button  class="editar material-icons mdc-button__icon" name="${page[usr]._id}">edit</button>
                
                <button  class="eliminar material-icons mdc-button__icon" name="${page[usr]._id}">
                delete
                </button>
            </div>       
            `
            table.appendChild(row).classList.add("rowe")
        }

        const elementsEliminar = document.getElementsByClassName('eliminar') //Obtenemos la colección de todos los botones Eliminar
        const elementsEditar = document.getElementsByClassName('editar') //Obtenemos la colección de todos los botones Editar
        let ArrayBtnsEliminar = [...elementsEliminar] // Transformamos la colección a un Array
        let ArrayBtnsEditar = [...elementsEditar]
    
        // Agregamos un event listener y funcionalidad a cada Botón
        ArrayBtnsEliminar.forEach(btnEliminar => {
            btnEliminar.addEventListener('click', async(e) => {
                let usrId = e.target.name //Obtenemos su id en el atributo name
                let removed = await removeContact(usrId) //Eliminamos el usuario de la bd de MongoDB
                window.alert(removed.data.name + ' ha sido eliminado correctamente') // Notificamos al usuario de que el contacto ha sido eliminado.
                location.reload() //Recargamos la página
            })
        })
    
        ArrayBtnsEditar.forEach(btnEditar => {
            btnEditar.addEventListener('click', async(e) => {
                let contactId = e.target.name //Obtenemos su id en el atributo name
                localStorage.setItem('contactId', contactId)
                window.location.replace(`./pages/edit-user.html`)
            })
        })
    }

})