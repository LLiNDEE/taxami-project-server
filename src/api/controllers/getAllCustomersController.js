import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { getAllCustomers } from "../services/getAllCustomers.js"


export const getAllCustomersController = async (req, res) => {
    try{


        const allCustomersResponse = await getAllCustomers()
        if(!allCustomersResponse.success) return res.status(400).send(generateError('error'))
        if(allCustomersResponse.type === 'noCustomers') return res.status(200).send(generateError('noCustomers'))

        res.status(200).send(generateSuccessResponse({customers: allCustomersResponse.customers}))

    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}