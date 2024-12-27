import { active } from "../utils/db.js";


class AppController {
    static async getStatus(req, res) {
        const DBStatus = await active();
        const status = { server: true, db: DBStatus}
        res.status(200).json(status);
    }
}


export default AppController;