import React, { useEffect, useState } from "react"
import Layout from "@/components/layouts/Layout"
import api from "./api"
import TransactionList from "@/components/elements/transaction/TransactionList"

export default function Transaction() {
    const [transactionList, setTransaction] = useState([])

    const fetchTransation = async () => {
        try {
            const respons = await api.get('/transactions')
            const data = respons.data.payload.transactions
            setTransaction(data)
            console.log(data)
        } catch (error) {
            throw Error('error')
        }
    }

    useEffect(() => {
        fetchTransation()
    }, [])

    console.log(transactionList)
    return (  
        <Layout>
            <h1>Trasaction History</h1>
            <TransactionList transactionList={transactionList} />
        </Layout>
    )
}