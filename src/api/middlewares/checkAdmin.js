import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { checkAdminPrivileges } from "../models/checkAdminPrivileges.js"



export const checkAdmin = async (req, res, next) => {
    try{

        const { user_id } = req.body

        const checkAdminResponse = await checkAdminPrivileges(user_id)
        if(!checkAdminResponse.success) return res.status(401).send(generateError(checkAdminResponse.type))

        next()


    }catch(error){
        console.log(error)

    }
}