import { Code, Building } from '../models/models.js'

export const checkCode = async code => {
    try{

        const codeOBJ = await Code.find({_id: code})
        if(!codeOBJ || codeOBJ.length < 1) {
            return {
                type: 'noCode',
                success: false
            }
        }

        if(codeOBJ[0].type === 'invite'){
            const query = {_id: codeOBJ[0].building_id}

            const building = await Building.findOne(query)
            if(!building) {
                return {
                    type: 'noBuilding',
                    success: false
                }
            }
    
            const data = {
                code_type: codeOBJ[0].type,
                building: {
                    building_name: building.building_name,
                    _id: building._id,
                }
            }
    
            return {
                type: 'success',
                success: true,
                data: data,
            }
        }

        if(codeOBJ[0].type === 'subscription'){
            const data = {
                code_type: codeOBJ[0].type,
                created: codeOBJ[0].created,
            }

            return {
                type: 'success',
                success: true,
                data: data,
            }

        }


        
        




    }catch(error){
        console.log(error)
        return{
            type: 'failed',
            success: false,
        }
    }
}