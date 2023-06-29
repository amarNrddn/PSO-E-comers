import { useCartDispatch } from '@/context/CartContext'
import Image from 'next/image'
import React from 'react'

import styles from './index.module.css'

const ProductList = ({ products }) => {
  const dispatch = useCartDispatch()

  const hendeleAddToCart = (item) => {
    dispatch({
      type: 'add',
      payload: item
    })
  }

  return (
    <div className={styles['product-list']}>
      {products.map((item) => {
        return (
          <div
            key={item.id}
            className={styles['product-list__product-card']}
          >
            <div
              className={styles['product-list__product-card__product-img']}>
              <Image
                src={item.img_product}
                alt={item.name}
                fill
                className={styles['product-img']}
              />
            </div>
            <div className={styles['product-list__des']}>
              <p>{item.name}</p>
              <button onClick={() => hendeleAddToCart(item)}>+</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList