import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export { __dirname };

export const generateMockProducts = () => {
    const numOfProducts = 100;  
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push({
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 1000, max: 12000, dec: 0, symbol: '$' }),
            stock: faker.number.int({ min: 1, max:30 }),
            category: faker.commerce.department(),
            image: faker.image.url()
        });
    }
    return products;
};
