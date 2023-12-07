import Express  from "express";
import PlantService from "../services/RegistroService";




const planService = new PlantService();


const router = Express.Router()

router.post('/', planService.createPlant)

router.get('/', planService.getPlants)


export default router;