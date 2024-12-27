import sequelize from '../utils/db.js';
import  Shop  from './Shop.js';
import Admin from './Admin.js';
import Agent from './Agent.js';
import Category from './Category.js';
import Product from './Product.js';
import ProductImage from './ProductImage.js';
import ProductAvailability from './ProductAvailability.js';
import Order from './Order.js';


const registerModels = async () => { 
  sequelize.sync({force: true});
}

export { Shop, Admin, Agent, Category, Product, ProductImage, ProductAvailability, Order, registerModels };
