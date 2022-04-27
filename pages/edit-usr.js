import { getContact, updateContact } from '../API/crud.js'

let contactId = localStorage.getItem('contactId') // Obtenemos el contactId 

if (!contactId) {
    window.location.replace("../index.html")
}

const userBlock = document.getElementById('user') //La sección donde insertaremos el formulario
let form = document.createElement('form') //El formulario a insertar

document.addEventListener('DOMContentLoaded', async() => {

    //Pasamos el ID para obtener la información del contacto.
    let res = await getContact(contactId) // Solicitamos el contacto a nuestra API.
    let contact = res.data // Accedemos a la data del contacto.

    buildPage(contact) //Construimos la página con la data del contacto.

    form.addEventListener('submit', async(e) => { //Definimos el evento para modificar el contacto.
        e.preventDefault()

        // console.log(iname) //e.target.iname
        let contact = { //Creamos un objeto contact para almacenar la info del contacto.
            "name": iname.value,
            "phone": iphone.value,
            "email": iemail.value,
        }
        console.log(contact)
        let response = await updateContact(contactId, contact) //Actualizamos el contacto. con la nueva data en MongoDB
        window.alert(response.data.name + ' ha sido actualizado correctamente')
        window.location.replace("../index.html") //Redireccionamos al Inicio

    })


    function buildPage(contact) {


        const { _id, name, email, phone } = contact //Extraemos la data en variables

        //Construimos el formulario mostrando la data del contacto.
        form.innerHTML = (`
     
                    <div class="inpx">
                        <label for="">nombre</label>
                        <input id="iname" type="text" value="${name}">
                    </div>
                    <div class="inpx">
                        <label for="">telefono</label>
                        <input id="iphone" type="text" value="${phone}">
                    </div>
                    <div class="inpx">
                        <label for="">email</label>
                        <input id="iemail" type="text" value="${email}">
                    </div>
                    <button type="submit" id="Add">Guardar</button>

        `)

        userBlock.appendChild(form) //Insertamos el formulario
    }

})