

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
    const fecha = new Date()
    const fechaActual = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()}`;

    

    e.forEach(element => {
        const fecha = element["fecha"];

        
        const {  podar , "frec-podar" : frecPodar, regar, "frec-regar" : frecRegar, fertilizar, "frec-fertilizar": frecFertilizar } = element
        const plantRecor = { podar , "frec-podar" : frecPodar, regar, "frec-regar" : frecRegar, fertilizar, "frec-fertilizar": frecFertilizar }
        


        const fechaOriginal = element["fecha"];
        

        const objectPlant = crearRecordatorio(fecha ,fechaOriginal, plantRecor)

        console.log(objectPlant)
    });
    
}



function crearRecordatorio(fechActual, fechaOriginal, plantRecor)
{
    const fechaRecordatorio = new Date(fechaOriginal);
    const diferenciaMili = fechActual - fechaRecordatorio;
    const diferentDias = Math.floor(diferenciaMili / (1000 * 60 * 60 *24))


    let onRegar, onFerti, onPodar = false;


    if(plantRecor.podar?.toLowerCase() === 'on')
    {
        console.log("Podar", parseInt(plantRecor.frecPodar))
        onPodar = comprobarDia(diferentDias, parseInt(plantRecor.frecPodar));
    }
    if(plantRecor.regar?.toLowerCase() === 'on')
    {
        console.log("Regar", parseInt(plantRecor.frecRegar))
        onRegar = comprobarDia(diferentDias, parseInt(plantRecor.frecRegar));
    }
    if(plantRecor.fertilizar?.toLowerCase() === 'on')
    {
        console.log("Fertilziar", parseInt(plantRecor.frecFertilizar))
        onFerti = comprobarDia(diferentDias, parseInt(plantRecor.frecFertilizar));
    }

    const objectRecor = { onPodar, onRegar, onFerti }

    return objectRecor
}


function comprobarDia(diferenDias, frecuencia)
{
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