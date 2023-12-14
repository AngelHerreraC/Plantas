

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
    let primerElementoProcesado = false;

    const template_plants = document.querySelector(".template_card")
    const fragmento_plant = document.createDocumentFragment();

    e.forEach(element => {

        if (primerElementoProcesado) {
            return;
          }
        const fechaActualmente = new Date()
        const fechaActual = `${fechaActualmente.getFullYear()}-${fechaActualmente.getMonth() + 1}-${fechaActualmente.getDate()}`;
        const {  podar , "frec-podar" : frecPodar, regar, "frec-regar" : frecRegar, fertilizar, "frec-fertilizar": frecFertilizar } = element
        const plantRecor = { podar , "frec-podar" : frecPodar, regar, "frec-regar" : frecRegar, fertilizar, "frec-fertilizar": frecFertilizar }
        const fechaOriginal = element["fecha"];

        
        const objectPlant = crearRecordatorio(fechaActualmente ,fechaOriginal, plantRecor)

        if (objectPlant.onFerti || objectPlant.onPodar || objectPlant.onRegar)
        {
            const template = document.importNode(template_plants.content, true)

            const fechaAct = template.querySelector("#fechaActual")
            fechaAct.textContent = fechaActual;

            const name = template.querySelector("#nombre")
            name.textContent += element.nombre
            
            const tipoPlanta = template.querySelector("#tipo")
            tipoPlanta.textContent += element["tipo-planta"]

            const tipoClima = template.querySelector("#clima")
            tipoClima.textContent += element["tipo-clima"]

            const fechaAdquisicion =template.querySelector("#fechaAdqui")
            fechaAdquisicion.textContent += fechaOriginal;

            if (objectPlant.onPodar)
            {
                const podarHTML = template.querySelector("#podar")
                podarHTML.textContent += '✓'
            } 
            if (objectPlant.onFerti)
            {
                const fertiHTML = template.querySelector("#fertilizar")
                fertiHTML.textContent += '✓'
            } 
            if (objectPlant.onRegar)
            {
                const regarHTML = template.querySelector("#regar")
                regarHTML.textContent += '✓'
            } 
            fragmento_plant.appendChild(template)

            primerElementoProcesado = true;
        }
    });

    const container_plant = document.querySelector("#card_background")
    container_plant.appendChild(fragmento_plant)
    
}



function crearRecordatorio(fechActual, fechaOriginal, plantRecor)
{
   
    const fechaRecordatorio = new Date(fechaOriginal.replace(/-/g, '/'));
    const diferenciaMili = fechActual - fechaRecordatorio;
    const diferentDias = Math.floor(diferenciaMili / (1000 * 60 * 60 *24))
    // console.log('Fecha Original:', fechaOriginal);
    // console.log('Fecha Recordatorio o Convertida:', fechaRecordatorio);
    // console.log('Fecha Actual:', fechActual);
    // console.log('DiferentMili:', diferenciaMili);
    // console.log('DiferenteDiass:', diferentDias);


    let onRegar = false;
    let onFerti = false;
    let onPodar = false;


    if(plantRecor.podar?.toLowerCase() === 'on')
    {
        
        console.log("Podar", parseInt(plantRecor["frec-podar"]))
        onPodar = comprobarDia(diferentDias, parseInt(plantRecor["frec-podar"]));
    }
    if(plantRecor.regar?.toLowerCase() === 'on')
    {
        console.log("Regar", parseInt(plantRecor["frec-regar"]))
        onRegar = comprobarDia(diferentDias, parseInt(plantRecor["frec-regar"]));
    }
    if(plantRecor.fertilizar?.toLowerCase() === 'on')
    {
        console.log("Fertilziar", parseInt(plantRecor["frec-fertilizar"]))
        onFerti = comprobarDia(diferentDias, parseInt(plantRecor["frec-fertilizar"]));
    }

    const objectRecor = { onPodar, onRegar, onFerti }

    return objectRecor
}


function comprobarDia(diferenDias, frecuencia)
{
    console.log(`Diferencias de Dias : ${diferenDias} Frecuencia de ${frecuencia}`)
    if (diferenDias % frecuencia === 0)
    {
        
        console.log(`Recordatorio activado.`);
        return true
    }
    else 
    {
        console.log(`Aún no es el momento para el recordatorio.`);
        return false
    }
}

getPlants();