import ProductDetailsView from '@/components/ProductDetailsView'
import { axiosInstance } from '@/config/axiosInstance'
import type { ProductDetail } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'


const ProductDetails = () => {
    const { productId } = useParams<{ productId: string}>()
    const [product, setProduct] = useState<ProductDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    useEffect(() => {
        if (!productId) {
            setLoading(false)
            setError('Invalid product')
            return
        }
        setLoading(true)
        setError(null)
        axiosInstance
            .get(`/api/v1/product/${productId}`)
            .then((res) => {
                setProduct(res.data.product)
                setSelectedImageIndex(0)
            })
            .catch((err) => {
                const msg =
                    err.response?.status === 404
                        ? 'Product not found'
                        : err.response?.data?.msg ?? 'Failed to load product'
                setError(msg)
                setProduct(null)
            })
            .finally(() => setLoading(false))
    }, [productId])

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/20">
                <Navbar />
                <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12">
                    <div className="flex flex-col gap-8 animate-pulse lg:flex-row">
                        <div className="aspect-square w-full lg:w-1/2 rounded-2xl bg-slate-200" />
                        <div className="flex-1 space-y-4">
                            <div className="h-8 w-3/4 rounded-lg bg-slate-200" />
                            <div className="h-4 w-full rounded bg-slate-200" />
                            <div className="h-4 w-1/2 rounded bg-slate-200" />
                            <div className="h-12 w-32 rounded-xl bg-slate-200 mt-6" />
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/20 flex flex-col px-4">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <p className="text-slate-600 font-medium">{error ?? 'Product not found'}</p>
                        <Link
                            to="/home"
                            className="inline-flex items-center gap-2 mt-4 text-teal-600 hover:text-teal-700 font-medium"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back to products
                        </Link>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/20">
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    <Link
                        to="/home"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 sm:mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to products
                    </Link>

                    <ProductDetailsView
                        productId={productId}
                        product={product}
                        selectedImageIndex={selectedImageIndex}
                        setSelectedImageIndex={setSelectedImageIndex}
                    />
                </motion.div>
            </main>
        </div>
    )
}

export default ProductDetails
