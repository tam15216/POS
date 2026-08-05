const db = require('../../config/database')

// ดึงสินค้าทั้งหมด
const getAllProducts = async () =>{
    const [rows] = await db.query(`
        SELECT
            p.Product_id,
            p.Product_name,
            p.Product_code,
            p.Product_price,
            p.Cost_price,
            p.Product_type,
            c.Category_name,
            c.Category_id,
            p.status
        FROM Product p
        LEFT JOIN Category c ON p.Category_id = c.Category_id
        `);
        return rows;
};

const getnotAllProducts = async () =>{
    const [rows] = await db.query(`
        SELECT
            p.Product_id,
            p.Product_name,
            p.Product_code,
            p.Product_price,
            p.Product_type,
            c.Category_name,
            c.Category_id,
            p.status
        FROM Product p
        LEFT JOIN Category c ON p.Category_id = c.Category_id
        WHERE p.status = 1
        AND p.Product_type = 'product'
        `);
        return rows;
};

const getProductById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM Product WHERE Product_id = ? ',
        [id]
    );
    return rows[0] || null; 
};

// เพิ่มสินค้า
const createProduct = async (data) => {
    const { name, code, price, category_id, cost_price, product_type } = data;

    const [result] = await db.query(
        `INSERT INTO Product
        (Product_name, Product_code, Product_price, Category_id, Cost_price, Product_type)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [name, code, price, category_id, cost_price, product_type] 
    );
    return result;
};

// ปิด/เปิดสินค้า
const toggleProduct = async (id) => {
    const [result] = await db.query(
        'UPDATE Product SET status = NOT status WHERE Product_id = ?',
        [id]
    );
    return result;
};

// อัพเดตสินค้า
const updateProduct = async (id, data) => {
    const { name, code, price, category_id, cost_price, product_type } = data;

    const [result] = await db.query(
        `UPDATE Product
        SET Product_name = ?, Product_code = ?, Product_price = ?, Category_id = ?, Cost_price = ?, Product_type = ?
        WHERE Product_id = ?`,
        [name, code, price, category_id, cost_price, product_type, id] 
    );
    return result;
};

const getProductsByType = async (productType) => {
    const [rows] = await db.query(`
        SELECT
            p.Product_id,
            p.Product_name,
            p.Product_code,
            p.Product_price,
            p.Cost_price,
            p.Product_type,
            c.Category_name,
            c.Category_id,
            p.status
        FROM Product p
        LEFT JOIN Category c ON p.Category_id = c.Category_id
        WHERE p.status = 1 AND p.Product_type = ?
        ORDER BY p.Product_name ASC
    `, [productType]);
    return rows;
};


module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    toggleProduct ,
    updateProduct,
    getnotAllProducts,
    getProductsByType
};