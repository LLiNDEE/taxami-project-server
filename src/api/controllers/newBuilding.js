import { generateError } from "../../utils/errorHandler.js";
import { generateSuccessResponse } from "../../utils/successHandler.js";
import { createNewBuilding } from "../services/createNewBuilding.js";
import { addBuildingToUser } from "../services/addBuildingToUser.js";
import { getUserBy } from "../services/getUserBy.js";

export const newBuilding = async (req, res) => {
    try{

        const DETAILS = req.body
        const { user_id } = req.body

        const userOBJ = await getUserBy('_id', user_id)
        if(userOBJ.user[0].role !== 'customer') return res.status(401).send(generateError('noPermission'))

        const addBuildingResponse = await createNewBuilding(DETAILS)
        if(!addBuildingResponse.success) return res.status(400).send(generateError(addBuildingResponse.type))

        const building_id = addBuildingResponse?.building_id

        const addBuildingToUserResponse = await addBuildingToUser(user_id, building_id)
        if(!addBuildingToUserResponse.success) return generateError('error', {message: "Could not add building to user..."})

        res.status(200).send(generateSuccessResponse("", {message: "Successfully added the building"}))

    }catch(error){
        return res.status(400).send(generateError('failedToAddBuilding', {message: 'Could not add building...'}))
    }
}