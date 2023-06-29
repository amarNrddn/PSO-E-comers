import React, { useEffect, useState } from "react"
import Layout from "@/components/layouts/Layout"
import api from "./api"
import ProductList from "@/components/elements/ProductList/ProductList"
import styles from '@/styles/Home.module.css'
import Cart from "@/components/elements/cart/Cart"

export default function Home() {
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    const respons = await api.get('/products')
    const data = respons.data.payload
    setProducts(data)
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <Layout>
      <h1>Home Page</h1>
      <div className={styles['home']}>
        <ProductList products={products} />
        <Cart/>
      </div>
    </Layout>
  )
}
