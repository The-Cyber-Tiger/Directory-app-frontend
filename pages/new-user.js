import { addContact } from '../API/crud.js'

const userBlock = document.getElementById('user') //La sección donde insertaremos el formulario
let form = document.createElement('form') //El formulario a insertar

document.addEventListener('DOMContentLoaded', async() => {



    buildForm() //Llamamos a la construcción del formulario para el nuevo usuario

    form.addEventListener('submit', async(e) => { //El evento a realizar cuando se envíe el formulario
        e.preventDefault()

        let contact = { //Creamos un objeto user para almacenar la info del usuario
                name: iname.value,
                email: iemail.value,
                phone: iphone.value
            }
            // console.log(user)
        let res = await addContact(contact) //Insertamos el usuario en MongoDB
        window.alert('El usuario ' + res.data.name + ' ha sido añadido')
        window.location.replace(`../index.html`) //Redireccionamos al inicio
    })


    function buildForm() {
        //Construimos el formulario
        form.innerHTML = (`
     
                    <div class="inpx">
                        <label for="">nombre</label>
                        <input id="iname" type="text" value="">
                    </div>

                    <div class="inpx">
                    <label for="">teléfono</label>
                    <input id="iphone" type="text" value="">
                    </div>

                    <div class="inpx">
                        <label for="">email</label>
                        <input id="iemail" type="text" value="">
                    </div>
                    
                    <button type="submit" id="Add">Agregar Usuario</button>

        `)

        userBlock.appendChild(form) //Lo insertamos
    }

})