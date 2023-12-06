const form = document.querySelector('#form');

const procesaTodo = (event) => 
{
    event.preventDefault();
    const datos = new FormData(event.target)
    console.log("Hola")
    console.log(event.target)

    const datosCompletos = Object.fromEntries(datos.entries())
    console.log(JSON.stringify(datosCompletos))
}


form.addEventListener('submit', procesaTodo)