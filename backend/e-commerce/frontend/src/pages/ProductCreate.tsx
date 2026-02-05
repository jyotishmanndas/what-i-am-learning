import CreateProductForm from '@/components/forms/CreateProductForm'
import React from 'react'

const ProductCreate = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col justify-center px-6 pt-15">
                <div className="w-full max-w-lg mx-auto shadow-2xl px-6 py-8 rounded-xl font-mono bg-white border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Create a product
                    </h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Add product details and images (1–5, max 5MB each)
                    </p>
                    <CreateProductForm />
                </div>
            </main>
        </div>
    )
}

export default ProductCreate
