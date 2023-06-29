import React, { createContext, useContext, useReducer } from "react";

const cartsContex = createContext(null)
const cartsDispatchContex = createContext(null)

const cartReducer = (carts, action) => {
    switch (action.type) {
        case 'add': {
            const index = carts.findIndex((obj) => obj.id === action.payload.id)
            //jika data tidak ada
            if (index === -1) {
                return [...carts, { ...action.payload, quantity: 1 }]
            } else {
                return carts.map((cart) => {
                    if (cart.id === action.payload.id) {
                        return { ...cart, quantity: cart.quantity + 1 }
                    } else {
                        return cart
                    }
                })
            }
        }

        case 'diskris': {
            const index = carts.findIndex((obj) => obj.id === action.payload.id)
            if (index !== -1) {
                if (carts[index].quantity === 1) {
                    return carts.filter((obj) => obj.id !== action.payload.id)
                } else {
                    return carts.map((cart) => {
                        if (cart.id === action.payload.id) {
                            return { ...cart, quantity: cart.quantity - 1 }
                        } else {
                            return cart
                        }
                    })
                }
            }
        }
        case 'clear': {
            return []
        }
        default: {
            throw Error(Error)
        }
    }
}

const initial = []

const cardProvider = ({ children }) => {
    const [carts, dispatch] = useReducer(cartReducer, initial)

    return (
        <cartsContex.Provider value={carts}>
            <cartsDispatchContex.Provider value={dispatch}>
                {children}
            </cartsDispatchContex.Provider>
        </cartsContex.Provider>
    )
}

export default cardProvider

export const useCart = () => {
    return useContext(cartsContex)
}

export const useCartDispatch = () => {
    return useContext(cartsDispatchContex)
}