import { signin } from "../API/auth.js"

document.addEventListener('DOMContentLoaded', () => {

    const formularioLogin = document.getElementById('formLogin')

    formularioLogin.addEventListener('submit', async(e) => {
        e.preventDefault()
        const inputs = {
            email: email.value,
            password: password.value
        }

        const res = await signin(inputs)
        if (res.message) {
            window.alert(res.message)
        }
        let token = res
        console.log(token)
        localStorage.setItem('token', token.token)
        if (token.token) {
            window.location.replace("../index.html")
        }
    })


})