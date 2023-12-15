// window.addEventListener('beforeunload', clearLocalStorage)

document.querySelector("#btn").addEventListener('click', e => 
{

    const clima = document.querySelector("#tipo-clima-usuario")


    console.log(clima.value)
    guardarLocalStorage(clima.value)

    alert("Se registro el tipo de clima")

    window.location.href = '../main'
})


function guardarLocalStorage(type)
{
    localStorage.setItem(`type`, type)
}

// function clearLocalStorage()
// {
//     localStorage.clear()
// }