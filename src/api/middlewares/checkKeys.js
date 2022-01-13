import { PATH_KEYS } from '../../utils/constants.js'
import { validateKeys } from '../validations/validateKeys.js'
import { handleValidationError } from '../../utils/errorHandler.js'

export const checkKeys = (req, res, next) => {

    let EXPECTED_KEYS
    
    Object.entries(PATH_KEYS).forEach(([k, v]) => {
        if(k == req.route.path) EXPECTED_KEYS = v
    })

    const validatedKeys = validateKeys(req.body, EXPECTED_KEYS)
    if(!validatedKeys.status) return res.status(400).send(handleValidationError(validatedKeys))

    next()
}