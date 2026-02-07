import ProductDetailsView from '@/components/ProductDetailsView'
import { axiosInstance } from '@/config/axiosInstance'
import type { ProductDetail } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'


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
                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="animate-pulse flex flex-col lg:flex-row gap-8">
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
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/20 flex items-center justify-center px-4">
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
        )
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/20">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 sm:mb-8 font-medium transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to products
                </Link>

                <ProductDetailsView productId={productId} product={product} selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex} />
            </main>
        </div>
    )
}

export default ProductDetails
