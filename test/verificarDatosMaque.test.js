const { TextEncoder, TextDecoder } = require('text-encoding');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


const fs = require('fs');
const path = require('path');
const { maquetando } = require('../build/viewPlants/plants');
const { JSDOM } = require('jsdom');





const dataPath = path.resolve(__dirname, '../build/data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

test('Verificar nombre correcto de cada carta', async () => {
    const dom = new JSDOM(`
        <!-- Tu HTML aquí -->
    `);

    global.document = dom.window.document;

    
    document.addEventListener("DOMContentLoaded", function () {
        
        maquetando(data);

        
        const plantElements = document.querySelectorAll('.plants-get .plants');

        
        

       
        plantElements.forEach((plantElement, index) => {
            const nombreEnDOM = plantElement.querySelector("#name").textContent;
            const nombreEnJSON = data[index].nombre;

            
            expect(nombreEnDOM).toEqual(nombreEnJSON);
        });
    });
});