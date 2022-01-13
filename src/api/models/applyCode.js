import { Code, User, Building } from "./models.js"



export const applyCode = async (code, user_id) => {
    try{

        const codeOBJ = await Code.find({_id: code})
        if(!codeOBJ || codeOBJ.length < 1) {
            return {
                type: 'noCode',
                success: false
            }
        }

        const query = {_id: codeOBJ[0].building_id}

        const building = await Building.findOne(query)
        if(!building) {
            return {
                type: 'noBuilding',
                success: false
            }
        }

        const members = building.members
        if(members.includes(user_id)){
            return {
                type: 'alreadyMember',
                success: false,
            }
        }       

        await Code.findOneAndDelete({_id: code})
        await Building.findOneAndUpdate(query, {$push: {members: user_id}})


        return {
            type: 'success',
            success: true
        }

    }catch(error){
        return {
            type: 'failedToApplyCode',
            success: false
        }
    }
}