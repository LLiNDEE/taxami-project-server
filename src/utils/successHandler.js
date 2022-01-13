import { RESPONSE_TYPES } from "./constants.js";

export const generateSuccessResponse = (data, config) => {
    try{
        return {
            type: RESPONSE_TYPES.success,
            success: true,
            ...data && {data: data},
            ...config??null,
        }
    }catch(error){
        console.log(error)
    }
}