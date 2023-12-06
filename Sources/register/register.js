const form = document.querySelector('#form');
const btn = document.querySelector("btn")

const getData = (event) => 
{
    event.preventDefault();
    const datos = new FormData(event.target)
    const datosCompletos = Object.fromEntries(datos.entries())
    form.reset();
    return datosCompletos
}

async function postData()
{
    const newPlant = getData()
    try
    {
        const response = await fetch('http://localhost:3000/api/plantas', { method: 'POST', headers : {'Content-Type': }})
    }
    catch(err)
    {
        console.log(err)
    }
}

btn.addEventListener('click', (event) => 
{
    event.preventDefault()

})