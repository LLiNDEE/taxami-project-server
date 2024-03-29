import { createNewCustomer } from '../services/createNewCustomer.js'
import { validateUserCredentials } from '../validations/userValidation.js'
import { generateError } from '../../utils/errorHandler.js'
import { generateSuccessResponse } from '../../utils/successHandler.js'

export const newUser = async (req, res) => {
    try{

        const DETAILS = req.body

        const validatedCredentials = await validateUserCredentials(DETAILS)
        if(!validatedCredentials.success) return res.status(400).send(generateError('invalidCredentials'))


        const createCustomerResponse = await createNewCustomer(validatedCredentials.data)
        if(!createCustomerResponse.success) return res.status(424).send(generateError(createCustomerResponse.type))


        res.status(200).send(generateSuccessResponse("", {message: "New customer added!"}))


    }catch(error){
        console.log(error)
        res.status(400).send(generateError("failedToCreate", {message: "Failed to create new customer"}))
    }
}