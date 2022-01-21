import jwt from 'jsonwebtoken'

import { generateError } from "../../utils/errorHandler.js";
import { generateSuccessResponse } from "../../utils/successHandler.js";
import { isEmailValid } from "../validations/userValidation.js";
import { validateLoginCredentials } from "../validations/validateLoginCredentials.js";
import { JWT_SECRET } from '../../utils/constants.js';

export const userLogin = async (req, res) => {
    try{

        const DETAILS = req.body

        if(!isEmailValid) return res.status(400).send(generateError('invalidCredentials'))

        const checkLoginCredentials = await validateLoginCredentials(DETAILS)
        if(!checkLoginCredentials.success) return res.status(401).send(generateError('invalidCredentials'))

        const userDATA = checkLoginCredentials.data
        
        const tokenOBJ = generateToken({uuid: userDATA.user_id})
        if(!tokenOBJ.success) return res.status(400).send(generateError())

        userDATA.token = tokenOBJ.token

        res.status(200).send(generateSuccessResponse(userDATA, {message: "Successfully logged in"}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}

const generateToken = userData =>{
    try{

        const token = jwt.sign({
            data:{
                ...userData??null
            }
        }, JWT_SECRET, {expiresIn: '1h'})

        return {
            type: 'success',
            success: true,
            token: token
        }

    }catch(error){
        console.log(error)
        return{
            type: 'failed',
            success: false,
        }
    }
}