
/* Generador de data para Mongo DB */
const DATA = Array.from({ length: 20 }).map((_, index) => ({
    name: [
        "Luna",
        "Fido",
        "Fluffy",
        "Carina",
        "Spot",
        "Beethoven",
        "Baxter",
        "Dug",
        "Zero",
        "Santa's Little Helper",
        "Snoopy",
    ][index % 9],
    email: ["mongocrud@dogmail.com"][index % 1],
    phone: ["4731230707"][index % 1],
    index: index,
}))

console.log(DATA)

/* Copia y pega en la terminal de Mongo-> db.registros.insertMany(DATA) */