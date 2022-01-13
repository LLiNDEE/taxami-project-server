import userRoutes from "./src/api/routes/userRoutes.js"
import buildingRoutes from './src/api/routes/buildingRoutes.js'

const routes = app => {

    userRoutes(app)
    buildingRoutes(app)
    
}

export default routes