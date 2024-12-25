import { Shop } from './Shop.js';
import {sequelize} from '../utils/db.js'; 

const registerModels = async () => { 
  Shop.sync({alter: true});
}


export { Shop, registerModels };
