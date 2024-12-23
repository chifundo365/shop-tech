import { DBActive } from "../utils/db.js"

class AppController {
    static getStatus(req, res) {
        res.status(200).json({db: DBActive()});
    }
}

export default AppController;
