const express =require('express');
const cors = require('cors');
const productRoute = require('./modules/product/product.route');
const categoryRoute = require('./modules/category/category.route');
const stockRoute = require('./modules/stock/stock.route');
const orderRoute = require('./modules/order/order.route');
const authRoute = require('./modules/auth/auth.route');
const userRoute = require('./modules/user/user.route');
const reportRoute = require('./modules/report/report.route');
const ingredientRoute = require('./modules/ingredient/ingredient.route');
const recipeRoute = require('./modules/recipe/recipe.route');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req , res) =>{
    res.send('POS API Runing...');
});

app.use('/products' , productRoute);
app.use('/categories' , categoryRoute);
app.use('/stock', stockRoute);
app.use('/orders',orderRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/reports', reportRoute);
app.use('/ingredients', ingredientRoute);
app.use('/recipes', recipeRoute);
module.exports = app;