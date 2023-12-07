import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path'



class PlantService
{       
    createPlant(req: Request, res: Response): void {
        try {
            const newPlant = req.body;
            const dataFilePath = path.join(__dirname, '../data.json');
            console.log('Creando planta:', newPlant);
            
            let dataPlants = []
            if (fs.existsSync(dataFilePath))
            {

                console.log("El archivo existe")
                const dataFileContent = fs.readFileSync(dataFilePath, 'utf-8');
                dataPlants = JSON.parse(dataFileContent)
            }

            
            dataPlants.push(newPlant);
            
            fs.writeFileSync(dataFilePath, JSON.stringify(dataPlants, null, 2))

            res.status(201).json({ mensaje: 'Planta Añadida' });
        } catch (err) {
            console.error(err);
            console.log("El archivo no existe")
        }
    }

    getPlants(_req : Request, res : Response): void
    {
        try
        {
            const dataFilePath = path.join(__dirname, '../data.json');
            if (fs.existsSync(dataFilePath))
            {

                const dataFileContent = fs.readFileSync(dataFilePath, 'utf-8');
                
                res.status(200).json(JSON.parse(dataFileContent))
            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
}

export default PlantService;



