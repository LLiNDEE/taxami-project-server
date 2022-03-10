import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'
import { addPermissions } from '../services/addPermissions.js'


export const BuildingAddPermissions = async (req, res) => {
    try{

        const { user_id, ...data } = req.body

        

        const addPermissionsResponse = await addPermissions(data)
        if(!addPermissionsResponse.success) return res.status(400).send(generateError(addPermissionsResponse.type))

        res.status(200).send(generateSuccessResponse({message: "Successfully added permissions!"}))


    }catch(error){  
        res.status(400).send(generateError('error'))
    }
}