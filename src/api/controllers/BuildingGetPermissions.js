import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'
import { BuildingGetPermissions as getPermissions } from '../services/BuildingGetPermissions.js'

export const BuildingGetPermissions = async (req, res) => {
    try{

        const DATA = req.body

        const getPermissionsResponse = await getPermissions(DATA)
        if(!getPermissionsResponse.success) return res.status(400).send(generateError(getPermissionsResponse.type))

        res.status(200).send(generateSuccessResponse({permissions: getPermissionsResponse.permissions}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}