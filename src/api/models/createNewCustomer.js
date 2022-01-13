import { User } from './models.js'


export const createNewCustomer = async data => {
    try{

        const user = new User({
            username: data.username,
            email: data.email,
            password: data.password
        })

        await user.save()

        return {
            type: 'success',
            success: true
        }

    }catch(error){
        console.log(error)
        return {
            type: 'failedToCreate',
            success: false,
        }
    }
}