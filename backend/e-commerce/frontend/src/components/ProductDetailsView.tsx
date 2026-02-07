import { axiosInstance } from '@/config/axiosInstance'
import { useCartApi } from '@/hooks/useCartApi'
import type { ProductDetail } from '@/lib/types'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

interface ProductDetailsViewProps {
    product: ProductDetail,
    selectedImageIndex: number,
    setSelectedImageIndex: (i: number) => void,
    productId: string | undefined
}

const ProductDetailsView = ({ product, selectedImageIndex, setSelectedImageIndex, productId }: ProductDetailsViewProps) => {
    const { data } = useCartApi();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const itemOnCart = data?.items?.find((i: any) => i.productId._id === productId)

    const images = product.image?.length ? product.image : []
    const mainImage = images[selectedImageIndex] ?? images[0]
    const priceLabel = product.price.currency === 'INR' ? `₹${product.price.amount}` : `$${product.price.amount}`

    const addToCart = async () => {
        try {
            const res = await axiosInstance.post(`/api/v1/cart/add/${productId}`);
            if (res.status === 200) {
                toast.success(res.data.msg, { position: "bottom-center" });
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.msg)
            }
        }
    };

    return (
        <article className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 space-y-4">
                <div className="aspect-square w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                            No image
                        </div>
                    )}
                </div>
                {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {images.map((src, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedImageIndex(i)}
                                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === i
                                    ? 'border-teal-500 ring-2 ring-teal-500/20'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {product.productName}
                </h1>
                {product.productDescription && (
                    <p className="mt-4 text-slate-600 leading-relaxed">
                        {product.productDescription}
                    </p>
                )}
                <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{priceLabel}</span>
                    {product.price.currency === 'INR' && (
                        <span className="text-slate-500 text-sm">INR</span>
                    )}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => itemOnCart ? navigate("/cart") : addToCart()}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 active:bg-teal-800 shadow-lg shadow-teal-500/25 transition-all"
                    >
                        {itemOnCart ? (
                            <>
                                <ShoppingCart className="h-5 w-5" /> Go to cart
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="h-5 w-5" /> Add to cart
                            </>
                        )}
                    </button>
                    <Link
                        to="/home"
                        className="inline-flex items-center justify-center px-6 py-3.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default ProductDetailsView