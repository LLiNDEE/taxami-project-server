import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'
import { BuildingRemovePermission as removePermission } from '../../api/services/BuildingRemovePermission.js'

export const BuildingRemovePermission = async (req, res) => {
    try{

        const { user_id, ...data } = req.body

        

        const removePermissionResponse = await removePermission(data)
        if(!removePermissionResponse.success) return res.status(400).send(generateError(removePermissionResponse.type))

        res.status(200).send(generateSuccessResponse({message: "Successfully removed permission(s)!"}))


    }catch(error){  
        res.status(400).send(generateError('error'))
    }
}