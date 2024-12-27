import { Sequelize } from 'sequelize';

const db = process.env.DB || 'shop_tech';
const username = process.env.DBUsername || 'shop_tech_user';
const password = process.env.DBPass || '1234';
const host = process.env.dbHost || 'localhost';

const sequelize = new Sequelize(db, username, password, {
	host: host,
	dialect: 'mysql'	
});
         

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected');
  } catch (error) {
    active = false;
    console.error('Can not connect to the database', error);
  }
})();

const active = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

export default sequelize  ;
export { active };