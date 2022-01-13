import { generateError } from "../../utils/errorHandler.js";
import { generateSuccessResponse } from "../../utils/successHandler.js";
import { isEmailValid } from "../validations/userValidation.js";
import { validateLoginCredentials } from "../validations/validateLoginCredentials.js";

export const userLogin = async (req, res) => {
    try{

        const DETAILS = req.body

        if(!isEmailValid) return res.status(400).send(generateError('invalidCredentials'))

        const checkLoginCredentials = await validateLoginCredentials(DETAILS)
        if(!checkLoginCredentials.success) return res.status(401).send(generateError('invalidCredentials'))

        const userDATA = checkLoginCredentials.data

        res.status(200).send(generateSuccessResponse(userDATA, {message: "Successfully logged in"}))


    }catch(error){
        console.log(error)
    }
}