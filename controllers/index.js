import DBClient from "../utils/db"

class AppController {
    static getStatus(req, res) {
        res.status(200).json({db: DBClient.running});
    }
}

export default AppController;