import { Sequelize } from "sequelize";

const db = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOSTNAME;

const sequelize = new Sequelize(db, username, password, {
  host: host,
  dialect: process.env.DB_DIALECT
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.error("Can not connect to the database", error);
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

export default sequelize;
export { active };
