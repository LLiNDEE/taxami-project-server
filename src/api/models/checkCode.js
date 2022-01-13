import { Code } from './models.js'

export const checkCode = async code => {
    try{

        const codeOBJ = await Code.find({_id: code})
        if(!codeOBJ || codeOBJ.length < 1) {
            return {
                type: 'noCode',
                success: false
            }
        }

        return {
            type: 'success',
            success: true,
        }

    }catch(error){
        console.log(error)
        return{
            type: 'failed',
            success: false,
        }
    }
}