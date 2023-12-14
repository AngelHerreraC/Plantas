
const { TextEncoder, TextDecoder } = require('text-encoding');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


const { JSDOM } = require('jsdom');

test('Manejo de datos para verificar la informacion a traves del Form', async () => {
    const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="container-md container-lg " >
            <form action="/api/plantas" id="form" class="" method="post">
                <div class="row-cols-lg-1 m-2">
                    <div class="col-md col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">
                        <input type="text" name="nombre" id="nombre" placeholder="Nombre" class="form-control p-3" required>
                    </div>
                    <div class="col-md col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">
                        <input type="date" name="fecha" id="fecha" placeholder="" class="form-control p-3" required>
                    </div>
                    <div class="col-md  col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">
                        <input type="text" name="origen" id="origen" placeholder="Origen" class="form-control p-3" required>
                    </div>
                    <div class="col-md  col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">
                        <label for="tipo-planta" class="form-label col-12 labels">Tipo de Planta</label>
                        <select name="tipo-planta" id="tipo-planta" class="form-control col-md" placeholder = "Tipo" required>
                            <option value="arbol"></i>Arbol</option>
                            <option value="flor">Flor</option>
                            <option value="arbusto">Arbusto</option>
                        </select>
                    </div>
                    <div class="col-md col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">    
                        <p>Cuidados</p>          
                        <div class="row d-flex justify-content-between mb-2 align-items-center" >
                            <div class="col-1 ml-2">
                                <label for=""> 
                                </label>
                                <input type="checkbox" name='podar' class="m-sm-auto" id="check-podar" onchange="habilitarInput('check-podar', 'frec-podar')">
                            </div>
                            <div class="col-4"> 
                                <label for="podar" class="form-label">Podar</label>
                            </div>
                            <div class="col-2">
                                <input type="number" name= 'frec-podar' class="form-control frecuencia"  id="frec-podar" disabled maxlength="2">
                            </div>
                        </div>
                        <div class="row d-flex justify-content-between mb-2">
                            <div class="col-1 ml-2">
                                <label for=""> 
                                </label>
                                <input type="checkbox" name='regar' class="" id="check-regar" onchange="habilitarInput('check-regar', 'frec-regar')">
                            </div>
                            <div class="col-4"> 
                                <label for="regar" class="form-label ">Regar</label>
                            </div>
                            <div class="col-2">
                                <input type="number" name="frec-regar" class="form-control frecuencia" id="frec-regar" maxlength="2" disabled>
                            </div>
                        </div>
                        <div class="row d-flex justify-content-between mb-2">
                            <div class="col-1 ml-2">
                                <label for=""> 
                                </label>
                                <input type="checkbox" name='fertilizar' class="" id="check-fertilizar" onchange="habilitarInput('check-fertilizar', 'frec-fertilizar')">
                            </div>
                            <div class="col-4"> 
                                <label for="fertilizar" class="form-label">Fertilizar</label>
                            </div>
                            <div class="col-2">
                                <input type="number" class="form-control frecuencia" name="frec-fertilizar" id="frec-fertilizar" disabled maxlength="2">
                            </div>
                        </div>
                    </div>
                    <div class="col-md  col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">
                        <label for="" class="form-label col-12 labels" > Clima</label>
                        <select name="tipo-clima" id="tipo-clima" class="form-control col-lg-12" placeholder = "" required>
                            <option value="calido">Calido</option>
                            <option value="humedo">Humedo</option>
                            <option value="seco">Seco</option>
                            <option value="frio">Frio</option>
                        </select>
                    </div>
                    <div class="col-md col-lg-6 mt-3 m-lg-auto mt-lg-3 cuidados">
                        <input type="text" name="notas-especiales" id="notas-especiales" placeholder="Notas Especiales" class="form-control p-5">
                    </div>

                    
                </div>
                <div class="row m-2 mt-5">
                    <div class="col-md-12 col-lg-6 mt-3 m-lg-auto mt-lg-3 btn_div">
                        <input type="submit" class="btn col-12 p-3 boton" value="Registrarse" id="btn">
                    </div>
                </div>

                
            </form>
        </div>
        <script src="register.js"></script>
    </body>
    </html>
`);
    global.document = dom.window.document;

    const datosEnviados = {};

    global.fetch = async (url, options) => {
        if (url === 'http://localhost:3000/api/plantas') {
            const body = JSON.parse(options.body);
            Object.assign(datosEnviados, body);

            return Promise.resolve({ json: () => ({}) });
        }
    };

    const form = document.getElementById('form');
    if (form) {
        
        form.querySelector('#nombre').value = 'Nombre de prueba';
        form.querySelector('#fecha').value = '2023-01-01';
        form.querySelector('#origen').value = 'Mexico';
        form.querySelector('#tipo-planta').value = 'Flor';
        form.querySelector('#check-podar').checked = true;
        form.querySelector('#frec-podar').value = 2;
        form.querySelector('#tipo-clima').value = 'Humedo';
        form.querySelector('#notas-especiales').value = 'Cuidalo Bonito'
        

        
        form.dispatchEvent(new Event('submit'));

        
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(datosEnviados).toEqual({
            nombre: 'Nombre de prueba',
            fecha: '2023-01-01',
            origen: 'Mexico',
            "tipo-planta": "Flor",
            "podar": true,
            "frec-podar": 2,
            "tipo-clima": 'Humedo',
            "notas-especiales": "Cuidalo Bonito",
        });
    }
});
