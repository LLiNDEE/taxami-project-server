import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../../utils/constants.js'
import { generateError } from '../../utils/errorHandler.js'



export const validateToken = (req, res, next) => {
    try{

        const TOKEN = req.headers.authorization

        const isTokenValid = jwt.verify(TOKEN, JWT_SECRET, (err, decoded) => {
            if(err) return false
            if(decoded.data.uuid !== req.body.user_id) return false
            if(decoded) return true
        })

        if(!isTokenValid) return res.status(403).send(generateError('authorizationError'))

        next()

    }catch(error){
        res.status(400).send(generateError('error'))
    }
}