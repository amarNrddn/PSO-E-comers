import React from 'react'
import styles from './index.module.css'

const TransactionList = ({ transactionList }) => {
    return (
        <div className={styles['transation-list']}>
            {transactionList.map((item,i) => {
                return(
                    <div className={styles['trancation-list__card']} key={i}>
                        <h3>{item.no_order}</h3>

                        <div className={styles['transaction-list__card__product-list']}>
                            {item.products.map((product, index) => {
                                return (
                                    <div className="" key={index}>
                                        <p>Nama Barang: {product.product}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={styles['transation-list__card-pay']}>
                            <p>Total Harga: {item.total_price}</p>
                            <p>Total Bayar: {item.paid_amount}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TransactionList