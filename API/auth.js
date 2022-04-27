export const signin = async(input) => {
const dev = 'https://localhost:8000/signin'
const production = 'https://directory-app-api.herokuapp.com/signin'
const url = production

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const res = await response.json()

    return res

}