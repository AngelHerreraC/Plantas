
const form = document.querySelector('#form');
const btn = document.querySelector("#btn")


const getData = () => 
{

    const datos = new FormData(form)
    const datosCompletos = Object.fromEntries(datos.entries())
    form.reset();
    return datosCompletos

}

const postData = async () =>
{
    const JSONPlant = getData()
    const newJsonPlant = JSON.stringify(JSONPlant);
    try {
        const response = await fetch('localhost:3000//api/plantas', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: newJsonPlant
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);

    } catch (err) {
        console.log(`Existe un error: ${err}`);
    }

}

btn.addEventListener('click', (event) => 
{
    event.preventDefault()
    postData()
})