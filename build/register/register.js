document.querySelector("#form").addEventListener("submit", async (e) => 
{

    e.preventDefault();
    


    const formData = new FormData(e.currentTarget);


    const datosCompletos = {};
    formData.forEach((value, key) => {
        datosCompletos[key] = value;
    });
    
    
    console.log(datosCompletos)
    const validation = validandoDatosFomr(datosCompletos)
    mandarAlerta(validation)

    const res = await fetch('http://localhost:3000/api/plantas', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(datosCompletos)
    })
})

function validandoDatosFomr(form)
{
    
    if (!form.podar && !form.regar && !form.fertilizar)
    {
        return true
    }
    return false
}

function mandarAlerta(validation)
{
    if (validation)
    {
        alert("Falta Informacion")
    }
    else 
    {
        alert ("Informacion Ingresada")
    }
}

function habilitarInput(checkBoxId, inputDatosID)
{
    checkBox = document.getElementById(checkBoxId);
    inputDatos = document.getElementById(inputDatosID);

        // Habilitar o deshabilitar el input según el estado del checkbox
        inputDatos.disabled = !checkBox.checked;

        // Limpiar el contenido del input cuando se desmarca el checkbox
        if (!checkBox.checked) {
            inputDatos.value = "";
        }
}