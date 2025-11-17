import React, { useState } from 'react'
import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

let products = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "img": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
        "price": 2499,
    },
    {
        "id": 2,
        "name": "Smart Watch",
        "img": "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D",
        "price": 3999,
    },
    {
        "id": 3,
        "name": "Gaming Laptop",
        "img": "https://images.unsplash.com/photo-1658262530868-f7460e2f071f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2FtaW5nJTIwTGFwdG9wfGVufDB8fDB8fHww",
        "price": 84999,
    },
    {
        "id": 4,
        "name": "Bluetooth Speaker",
        "img": "https://images.unsplash.com/photo-1598034989845-48532781987e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJsdWV0b290aCUyMFNwZWFrZXJ8ZW58MHx8MHx8fDA%3D",
        "price": 1799,
    },
    {
        "id": 5,
        "name": "DSLR Camera",
        "img": "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHNsciUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D",
        "price": 55999,
    },
    {
        "id": 6,
        "name": "Wireless Mouse",
        "img": "https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2lyZWxlc3MlMjBNb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
        "price": 899,
    },
    {
        "id": 7,
        "name": "Running Shoes",
        "img": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UnVubmluZyUyMFNob2VzfGVufDB8fDB8fHww",
        "price": 2499,
    },
    {
        "id": 8,
        "name": "Smartphone",
        "img": "https://images.unsplash.com/photo-1612442058361-178007e5e498?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
        "price": 29999,
    }
]


const App = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])

    return (
        <div className='h-screen'>
            <Navbar setIsCartOpen={setIsCartOpen} />

            <div className='flex items-center justify-center gap-5 flex-wrap'>
                {products.map((items) => (
                    <ProductCard key={items.id} items={items} setCartItems={setCartItems} />
                ))}
            </div>

            {isCartOpen ? <Cart cartItems={cartItems} /> : null}
        </div>
    )
}

export default App 