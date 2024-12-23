import { Sequelize } from 'sequelize';

const db = process.env.DB || 'shop_tech';
const username = process.env.DBUsername || 'shop_tech_user';
const password = process.env.DBPass || '1234';
const host = process.env.dbHost || 'localhost';

const sequelize = new Sequelize(db, username, password, {
	host: host,
	dialect: 'mysql'	
});

let active = false;

(async () => {
  try {
    await sequelize.authenticate();
    active = true;
    console.log('Database Connected');
  } catch (error) {
    active = false;
    console.error('Cant connect to the database', error);
  }
})();

/** 
 * Returns true if the database connection is running
 */
const DBActive = () => {
  return active;
}

const syncDatabase = async () => {
  try {
    await sequelize.sync({alter: true});
    console.log('All models were synchronised');
  } catch (error) {
    console.error("Failled to synchronize the models");
  }
}

export { sequelize, DBActive, syncDatabase };
