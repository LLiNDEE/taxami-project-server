import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { AdminLockAccount as LockAccount } from "../services/AdminLockAccount.js"

export const AdminUnlockAccount = async (req, res) => {
    try{


        const LockAccountResponse = await LockAccount(req.body, 'active')
        if(!LockAccountResponse.success) return res.status(400).send(generateError(LockAccountResponse.type))

        res.status(200).send(generateSuccessResponse())


    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}