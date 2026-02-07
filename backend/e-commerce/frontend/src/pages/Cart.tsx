import { Link } from 'react-router'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartApi } from '@/hooks/useCartApi'
import { axiosInstance } from '@/config/axiosInstance'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'

const Cart = () => {
    const queryClient = useQueryClient()
    const { data, isLoading } = useCartApi()
    const items = data?.items ?? []

    const invalidateCart = () => {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    };

    const increaseQuantity = async (id: string) => {
        try {
            await axiosInstance.post(`/api/v1/cart/increment/${id}`)
            invalidateCart()
            toast.success('Quantity increased')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.msg ?? 'Failed to update')
            }
        }
    }

    const decreaseQuantity = async (id: string) => {
        try {
            await axiosInstance.post(`/api/v1/cart/decrement/${id}`)
            invalidateCart()
            toast.success('Quantity decreased')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.msg ?? 'Failed to update')
            }
        }
    }

    const removeItem = async (id: string) => {
        try {
            await axiosInstance.post(`/api/v1/cart/remove/${id}`)
            invalidateCart()
            toast.success('Item removed from cart')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.msg ?? 'Failed to remove')
            }
        }
    }

    const formatPrice = (amount: number, currency: string) =>
        currency === 'INR' ? `₹${amount.toLocaleString('en-IN')}` : `$${amount}`

    const subtotal = items.reduce(
        (sum: number, item: any) =>
            sum + (item.productId?.price?.amount ?? 0) * (item.quantity ?? 0),
        0
    )
    const currency = items[0]?.productId?.price?.currency ?? 'INR'

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-teal-50/40">
                <div className="text-slate-500 animate-pulse">Loading cart...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/40">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-20 w-60 h-60 bg-slate-200/40 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" />
            </div>

            <main className="relative flex-1 px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30">
                            <ShoppingBag className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                                Your Cart
                            </h1>
                            <p className="text-slate-500 text-sm mt-0.5">
                                {items.length} item{items.length !== 1 ? 's' : ''} ready to checkout
                            </p>
                        </div>
                    </div>
                </header>

                <section className="space-y-8">
                    {items.length === 0 ? (
                        <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-16 text-center">
                            <div className="absolute inset-0 bg-linear-to-br from-slate-50/50 to-transparent" />
                            <div className="relative flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                                    <ShoppingBag className="h-12 w-12 text-slate-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                                    Your cart is empty
                                </h2>
                                <p className="text-slate-500 mb-8 max-w-sm">
                                    Looks like you haven&apos;t added anything to your cart yet.
                                </p>
                                <Link to="/home">
                                    <Button
                                        size="lg"
                                        className="bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/25 px-8 rounded-xl font-medium"
                                    >
                                        Start shopping
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart items */}
                            <div className="lg:col-span-2 space-y-5">
                                {items.map((item: any) => (
                                    <article
                                        key={item._id}
                                        className="group relative flex gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200/50">
                                            {item.productId.image?.[0] ? (
                                                <img
                                                    src={item.productId.image[0]}
                                                    alt={item.productId.productName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <h2 className="font-semibold text-slate-900 truncate text-lg">
                                                    {item.productId.productName}
                                                </h2>
                                                {item.productDescription && (
                                                    <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">
                                                        {item.productId.productDescription}
                                                    </p>
                                                )}
                                                <p className="mt-2 text-xl font-bold text-teal-600">
                                                    {formatPrice(
                                                        item.productId.price.amount * item.quantity,
                                                        item.productId.price.currency
                                                    )}
                                                    <span className="text-sm font-normal text-slate-400 ml-1">
                                                        × {item.quantity}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center rounded-xl bg-slate-100/80 border border-slate-200/60 overflow-hidden">
                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(item.productId._id)}
                                                        disabled={item.quantity <= 1}
                                                        className="flex items-center justify-center w-11 h-11 text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="h-4 w-4" strokeWidth={2.5} />
                                                    </button>
                                                    <span className="flex items-center justify-center w-12 h-11 text-sm font-semibold text-slate-800 border-x border-slate-200/60">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(item.productId._id)}
                                                        className="flex items-center justify-center w-11 h-11 text-slate-600 hover:bg-slate-200/60 hover:text-slate-900 transition-all"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.productId._id)}
                                                    className="flex items-center justify-center w-11 h-11 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Order summary - sticky sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-6 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-teal-400/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 relative">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-3 mb-6 relative">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium text-slate-900">
                                                {formatPrice(subtotal, currency)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-slate-500 text-sm">
                                            <span>Shipping</span>
                                            <span>Calculated at checkout</span>
                                        </div>
                                        <div className="flex justify-between text-slate-500 text-sm">
                                            <span>Taxes</span>
                                            <span>Calculated at checkout</span>
                                        </div>
                                        <div className="pt-3 border-t border-slate-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-slate-900">Total</span>
                                                <span className="text-2xl font-bold text-teal-600">
                                                    {formatPrice(subtotal, currency)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative">
                                        <Button
                                            size="lg"
                                            className="w-full bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/25 rounded-xl font-medium h-12"
                                        >
                                            Proceed to checkout
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                        <Link to="/home" className="block">
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                className="w-full rounded-xl h-12 border-slate-200 hover:bg-slate-50 hover:border-slate-300 font-medium"
                                            >
                                                Continue shopping
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Cart
