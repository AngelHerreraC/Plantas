document.querySelector("#form").addEventListener("submit", async (e) => 
{

    e.preventDefault();


    const formData = new FormData(e.currentTarget);


    const datosCompletos = {};
    formData.forEach((value, key) => {
        datosCompletos[key] = value;
    });
    
    
    console.log(datosCompletos)
    

    const res = await fetch('http://localhost:3000/api/plantas', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(datosCompletos)
    })
})