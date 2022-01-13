import { RESPONSE_TYPES, ERROR_TYPES } from './constants.js'

export const handleValidationError = data => {
    if(data.type === 'missingParams') return generateError(data.type, {"missing_params": data.missing_params})
    if(data.type === 'invalidParams') return generateError(data.type, {"invalidParams": data.invalid_params})
}

export const generateError = (errorType = 'error', config) => {
    return {
        type: RESPONSE_TYPES.error,
        message: ERROR_TYPES[errorType],
        success: false,
        ...config??null
    }
}