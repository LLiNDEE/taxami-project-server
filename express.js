import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Validator from 'express-key-validator'

import RouteSchemas from './RouteSchemas.js'
import routes from './routes.js'
import { MONGOOSE_CONNECTION_KEY } from './src/utils/constants.js'

const PORT = process.env.PORT || 3400

const uri = MONGOOSE_CONNECTION_KEY

const run = async () => {
    try{

        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err, db)=>{
            if(err) console.log("DB CONNECTION ERROR --->", err)

            if(db){
                console.log("SUCCESSFULLY CONNECTED TO DB")
            }

        })

        const app = express()

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(cors())
        
        app.use(Validator.validateKeys)

        app.listen(PORT)

        RouteSchemas(Validator)

        routes(app)

    }catch(error){
        console.log(error)
    }
}

run()