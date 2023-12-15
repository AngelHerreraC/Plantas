function getPlants()
{
    fetch('http://localhost:3000/api/plantas')
    .then(response => response.json())
    .then((detalle => 
        {
           
            maquetando(detalle)
        }))
}

function maquetando(e)
{

    const template_plants = document.querySelector(".template_plants")
    console.log('Template plants: ', template_plants)
    const fragmento_plant = document.createDocumentFragment();
    e.forEach(element => {
        


        const template = document.importNode(template_plants.content, true)


        const name = template.querySelector("#name")
        name.textContent += element.nombre
        


        const tipoPlanta = template.querySelector("#type")
        tipoPlanta.textContent += element["tipo-planta"]

        const tipoClima = template.querySelector("#clima")
        tipoClima.textContent += element["tipo-clima"]

        const fechaAdquisicion =template.querySelector("#fecha")
        fechaAdquisicion.textContent += element.fecha;

        fragmento_plant.appendChild(template)
    });
    const container_plant = document.querySelector(".plants-get")
    container_plant.appendChild(fragmento_plant)
}

getPlants();



