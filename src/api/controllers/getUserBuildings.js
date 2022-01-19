import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { userGetBuildings } from "../services/userGetBuildings.js"


export const getUserBuildings = async (req, res) => {
    try{

        const { user_id } = req.body

        const userBuildingsResponse = await userGetBuildings(user_id)
        if(!userBuildingsResponse.success) return res.status(400).send(generateError(userBuildingsResponse.type))

        res.status(200).send(generateSuccessResponse({buildings: userBuildingsResponse.buildings}))

    }catch(error){
        console.log(error)
    }
}