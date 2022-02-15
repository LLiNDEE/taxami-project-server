import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { getUserBy } from "../services/getUserBy.js"

export const userGetRole = async (req, res) => {
    try{

        const { user_id } = req.body

        const userResponse = await getUserBy('_id', user_id)
        if(!userResponse.success) return res.status(400).send(generateError('error'))

        const user = userResponse.user[0]

        res.status(200).send(generateSuccessResponse({role: user.role}))
        

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}
