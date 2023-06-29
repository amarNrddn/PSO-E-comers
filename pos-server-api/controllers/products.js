const db = require("../configs/database"); 

exports.fetchProduct = async () => {
    const query = db.query("SELECT * FROM products")
    return query
};

exports.addProduct = async (data) => {
    const query = await db.query("INSERT INTO products SET ?", [data])
    return { id: query.insertId }
};