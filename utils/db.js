import mysql from 'mysql2';


class DB {
    constructor() {
        this.running = false;
        this.connection = mysql.createConnection({
            host: 'localhost' || process.env.DBHost,
            user: 'root' || process.env.DBUser,
            password: '1234' || process.env.DBPassword,
            database: 'shop_tech' || process.env.DBName,
            port: '3306'
        });

        this.connection.connect((err) => {
            if (err) {
                this.running = false;
            }
            this.running = true;
        });
    }

    active() {
        return this.running;
    }

    
}

const DBClient = new DB();

export default DBClient;