import { useCart, useCartDispatch } from '@/context/CartContext'
import api from '@/pages/api'
import Image from 'next/image'
import React, { useState } from 'react'

import styles from './index.module.css'

const Cart = () => {
    const [payAmount, setPayAmount] = useState()
    const carts = useCart()
    const dispatch = useCartDispatch()

    const hendeleAddToCart = (item) => {
        dispatch({
            type: 'add',
            payload: item
        })
    }

    const hendeleDiskrisCart = (item) => (
        dispatch({
            type: 'diskris',
            payload: item
        })
    )

    const getTotalPrice = () => {
        let totalPrice = 0;

        carts.filter((cart) => {
            totalPrice += cart.price * cart.quantity
        })

        return totalPrice
    }

    const hendelePay = (event) => {
        const { target } = event;
        const { value } = target;

        setPayAmount(value)
    }


    const hendeleChangePay = async () => {
        const products = carts.map((item) => {
            return {
                id: item.id,
                quantity: item.quantity
            }
        })

        try {
            const payload = {
                total_price: +getTotalPrice(), //"+" untuk mengubah string ke number 
                paid_amount: +payAmount,
                products
            }
            await api.post('/transactions', payload)
            setPayAmount('')
            dispatch({type: 'clear'})
        } catch {
            throw Error('error') 
        }
    }

    const isDisableButton = () => {
        return !payAmount || +payAmount < +getTotalPrice() || carts.length === 0
    }

    return (
        <div className={styles['cart']}>
            <h3>Carts</h3>
            <div className={styles['cart__cart-list']}>
                {carts.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className={styles['cart-item']}
                        >
                            <div className={styles['cart-item__image']}>
                                <Image
                                    src={item.img_product}
                                    fill
                                    className={styles['product-img']}
                                />
                            </div>
                            <div className={styles['cart-item__des']}>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                            <div className={styles['cart-item__action']}>
                                <button onClick={() => hendeleDiskrisCart(item)}>-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => hendeleAddToCart(item)}>+</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={styles['cart_checout']}>
                <div className={styles['total_price']}>
                    <p>Total Harga</p>
                    <p>Rp {getTotalPrice()}</p>
                </div>
                <div className={styles['pay']}>
                    <table>Bayar</table>
                    <input
                        type='number'
                        placeholder='-'
                        onChange={hendelePay}
                        value={payAmount}
                    />
                </div>
                <button
                    onClick={hendeleChangePay}
                    disabled={isDisableButton()}
                >
                    Checout
                </button>
            </div>
        </div>
    )
}

export default Cart