const db = require("../configs/database");

exports.fetchTransaction = async () => {
	const query = await db.query("SELECT * FROM transactions AS t INNER JOIN transaction_detail AS i ON t.no_order = i.no_order LEFT JOIN products AS p ON i.id_product = p.id")

	if (!query.error) {
		let listTransactions = [], listDetail = [], lastPush = "";
		
		for (let index in query) {
			if (lastPush !== query[index].no_order) {
                for (let i in query) {
                    if (query[i].no_order === query[index].no_order) {
                        listDetail.push({
                            no_order: query[i].no_order,
                            product: query[i].name,
                            quantity: query[i].quantity,
                        });
                    }
                }
				listTransactions.push({
                    no_order: query[index].no_order,
					total_price: query[index].total_price,
					paid_amount: query[index].paid_amount,
					products: listDetail,
				});
                listDetail = []
				lastPush = query[index].no_order;
			}
		}
        return { transactions : listTransactions }
	}
};

exports.addTransaction = async (order, products) => {
	const query = await db.query("INSERT INTO transactions SET ?", [order])
	
	if (!query.error) {
		const transaction_detail = [];
		const product_id = [];
		
		products.map((product) => {
			transaction_detail.push([order.no_order, product.id, product.quantity]);
			product_id.push([product.id]);
		});

		const updateDetailStock = await addDetailTransaction(
			transaction_detail,
			product_id
		);

		if (!updateDetailStock.error) {
			return db.query(
				"SELECT * FROM transactions WHERE no_order = ?",
				order.no_order
			);
		}
		return updateDetailStock;
	}
};


// 👇 internal function 👇

async function addDetailTransaction(transaction_detail, product_id) {
	const query = await db.query("INSERT INTO transaction_detail(no_order,id_product,quantity) VALUES ?", [transaction_detail])

	if (!query.error) {
		return updateStock(transaction_detail, product_id);
	}
};


async function updateStock(transaction_detail, product_id) {
	const query = await db.query("SELECT stock FROM products WHERE id IN (?)", [product_id])

	if (!query.error && query.length === product_id.length) {
		const update_stock = [];
		
		query.map((res, i) => {
			update_stock.push([
				transaction_detail[i][1],
				res.stock - transaction_detail[i][2],
			]);
		});

		const update = await db.query("INSERT INTO products (id,stock) VALUES ? ON DUPLICATE KEY UPDATE stock = VALUES(stock)", [update_stock])

		return update;
	}
};