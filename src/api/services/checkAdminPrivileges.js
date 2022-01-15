import { Admin } from '../models/models.js'


export const checkAdminPrivileges = async user_id => {
    try{

        const AdminUser = await Admin.find({_id: user_id})
        if(!AdminUser || AdminUser.length < 1){
            return {
                type: 'noPermission',
                success: false
            }
        }

        return {
            type: 'success',
            success: true,
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failed',
            success: false
        }
    }
}