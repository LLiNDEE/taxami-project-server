import { generateError } from "../../utils/errorHandler.js"
import { generateSuccessResponse } from "../../utils/successHandler.js"
import { getStats } from "../services/getStats.js"


export const adminGetStats = async (req, res) => {
    try{

        const getStatsResponse = await getStats()
        if(!getStatsResponse.success) return res.status(400).send(generateError('error'))

        res.status(200).send(generateSuccessResponse({stats: getStatsResponse.amountOfBuildings}))


    }catch(error){
        console.log(error)
        res.status(400).send(generateError('error'))
    }
}