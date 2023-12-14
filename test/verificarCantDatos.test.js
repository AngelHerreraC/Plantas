const { TextEncoder, TextDecoder } = require('text-encoding');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


const fs = require('fs');
const path = require('path');
const { maquetando } = require('../build/viewPlants/plants');
const { JSDOM } = require('jsdom');





const dataPath = path.resolve(__dirname, '../build/data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test('Verificar cantidad de objetos y maquetación', async () => {
    const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Montserrat:wght@500&family=Poppins:wght@600&family=Ubuntu:wght@500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

        <style>
            body{
                background-color: #CDDACD;
                font-family: 'Poppins';
            }
            .plants
            {
                background-color: #fff;
                border-radius: 10px;
                height: 400px;
            }
        </style>
    </head>

    <body>
        <div class="container text-center mt-4">
            <h1>Mis Plantas</h1>
            <div class="row plants-get d-flex justify-content-center">

            </div>
        </div>

        <template class="template_plants">
            <div class="col-lg-3 col-sm-8 p-lg-3 p-sm-1 mx-lg-2 m-sm-2 g-4 text-start plants">
                <div class="ml-3" id="name">
                    <p>Nombre: </p>
                </div>
                <div class="ml-3" id="type">
                    <p>Tipo: </p>
                </div>
                <div class="ml-3" id="clima">
                    <p>Clima: </p>
                </div>
                <div class="ml-3" id="fecha">
                    <p>Fecha de adquisicion: </p>
                </div>

                <div class="ml-3">
                    <div class="cuidados">
                        <p>Cuidados</p>
                    </div>
                    <div class="cuidados-frecuencia">

                    </div>
                </div>

                <div class="ml-3">Notas Especiales</div>
            </div>
        </template>


        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
        <script src="plants.js"></script>
    </body>
    </html>`);


    global.document = dom.window.document;
    document.addEventListener("DOMContentLoaded", function () 
    {
        
        maquetando(data);

        
        const cantidadNodosCreados = document.querySelectorAll('.plants-get .plants').length;

        
        expect(cantidadNodosCreados).toEqual(data.length);
    });
});

