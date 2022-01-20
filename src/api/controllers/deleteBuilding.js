import { deleteBuildingService } from '../services/deleteBuildingService.js'
import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'


export const deleteBuilding = async (req, res) => {
    try{

        const DATA = req.body

        const deleteBuildingResponse = await deleteBuildingService(DATA)
        if(!deleteBuildingResponse.success) return res.status(400).send(generateError(deleteBuildingResponse.type))

        res.status(200).send(generateSuccessResponse("", {message: "Building removed!"}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('failedToDeleteBuilding'))
    }
}