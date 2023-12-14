const request = require('supertest');
import app from '../Sources/index'; // Ajusta la ruta según la estructura de tu proyecto


describe('Probando los endpoints de la API Plants, tanto get como post' , () => 
{
    test('GET / devuelve un cuerpo con el mensaje esperado', async () => {
        const response = await request(app).get('/api/plantas');
    
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/application\/json/);

        
        response.body.forEach((e : PlantData) => {

          expect(e).toEqual(
            {
              nombre: expect.any(String),
              fecha:  expect.any(String),
              origen:  expect.any(String),
              'tipo-planta':  expect.any(String),
              podar: e?.hasOwnProperty("podar") ? expect.any(String) : undefined,
              'frec-podar': e?.hasOwnProperty("frec-podar") ? expect.any(String) : undefined,
              regar: e?.hasOwnProperty("regar") ? expect.any(String) : undefined,
              "frec-regar": e?.hasOwnProperty("frec-regar") ? expect.any(String) : undefined,
              fertilizar: e?.hasOwnProperty("fertilizar") ? expect.any(String) : undefined,
              'frec-fertilizar': e?.hasOwnProperty("frec-fertilizar") ? expect.any(String) : undefined,
              'tipo-clima':  expect.any(String),
              'notas-especiales': expect.any(String),
            }
          )
        });
    });



    test('POST / envia una respuesta exitosa con el caso de mandando campos vacios en campos opcionales', async () => {
        const response = await request(app)
          .post('/api/plantas')
          .send({
            nombre: "Adalberto",
            fecha: "2023-12-12",
            origen: "awd",
            "tipo-planta": "arbusto",
            podar: "on",
            "frec-podar": "2",
            "frec-regar": "",
            "frec-fertilizar": "",
            "tipo-clima": "humedo",
            "notas-especiales": ""
          });
    
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Planta Añadida');
      });

    test('POST / envia una respuesta exitosa con el caso de mandando todos los campos', async () => {
        const response = await request(app)
          .post('/api/plantas')
          .send(
            {
              "nombre": "Adalberto",
              "fecha": "2023-12-12",
              "origen": "Mexico",
              "tipo-planta": "arbusto",
              "podar": "on",
              "frec-podar": "2",
              "regar": "on",
              "frec-regar": "2",
              "fertilizar": "on",
              "frec-fertilizar": "2",
              "tipo-clima": "humedo",
              "notas-especiales": "ada"
            }
          );
    
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('mensaje', 'Planta Añadida');
      });
})


interface PlantData {
  nombre: string;
  fecha: string;
  origen: string;
  'tipo-planta': string;
  podar: 'on' | null;
  'frec-podar': string | null;
  regar: 'on' | null;
  'frec-regar': string | null;
  fertilizar: 'on' | null;
  'frec-fertilizar': string | null;
  'tipo-clima': string;
  'notas-especiales': string | null;
}



