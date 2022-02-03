import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'
import { buildingGetMembers } from '../services/buildingGetMembers.js'

export const getMembers = async (req, res) => {
    try{

        const getMembersResponse = await buildingGetMembers(req.body)
        if(!getMembersResponse.success) return res.status(400).send(generateError(getMembersResponse.type))


        res.status(200).send(generateSuccessResponse({members: getMembersResponse.members}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}