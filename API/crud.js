const production = 'https://directory-app-api.herokuapp.com/api/user'
const dev = 'http://localhost:8000/api/user'
const url = production //Cambia la url de acuerdo al estado del servidor

let token = localStorage.getItem('token')
    /* API PARA OPERACIONES CRUD */
    /* Definimos las peticiones y respuestas del lado del cliente para su uso en nuestra aplicación */

//Method: GET | Definimos como solicitar la data de todos los usuarios  
export async function getAllContacts() {
    const res = await fetch(
        `${url}/`, {
            mode: "cors",
            method: "GET",
            headers: {
                "Accept": '*/*',
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const data = await res.json()
    return data

}

//Method: GET | Definimos como solicitar la data de un usuario por su ID
export async function getContact(contactId) {
    const res = await fetch(
        `${url}/${contactId}`, {
            mode: "cors",
            method: "GET",
            headers: {
                "Accept": '*/*',
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const data = await res.json()
    return data
}

//Method: POST | Definimos como insertar un usuario por su ID
export async function addContact(contact) {
    const res = await fetch(
        `${url}/`, {
            mode: "cors",
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Accept": '*/*',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )
    const data = await res.json()
    return data
}

//Method: PUT | Definimos como modificar un usuario por su ID
export async function updateContact(contactId, contact) {
    const res = await fetch(
        `${url}/${contactId}`, {
            mode: "cors",
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                "Accept": '*/*',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )
    const data = await res.json()
    return data
}

//Method: DELETE | Definimos como eliminar un usuario por su ID
export async function removeContact(contactId) {
    const res = await fetch(
        `${url}/${contactId}`, {
            mode: "cors",
            method: "DELETE",
            headers: {
                "Accept": '*/*',
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const data = await res.json()
    return data
}