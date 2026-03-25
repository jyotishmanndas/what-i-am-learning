import ProductCard from '@/components/ProductCard'
import Navbar from '@/components/Navbar'
import { useProductApi } from '@/hooks/useProductApi'
import type { ProductDetail } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion'

const Home = () => {
    const { data, isPending } = useProductApi();

    if (isPending) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-1 px-4 pt-20 sm:px-6 lg:px-8">
                    <section className="mx-auto max-w-6xl">
                        <div className="mb-8 space-y-2">
                            <Skeleton className="h-7 w-40 rounded-full" />
                            <Skeleton className="h-4 w-64 rounded-full" />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, idx) => (
                                <Skeleton
                                    key={idx}
                                    className="h-80 rounded-2xl bg-muted"
                                />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 px-4 pt-20 sm:px-6 lg:px-8">
                <motion.header
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="mx-auto mb-8 max-w-6xl"
                >
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        All products
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Browse and add items to your cart
                    </p>
                </motion.header>

                <section className="mx-auto max-w-6xl">
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    staggerChildren: 0.04,
                                },
                            },
                        }}
                        className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {data.map((product: ProductDetail) => (
                            <motion.li
                                key={product._id}
                                variants={{
                                    hidden: { opacity: 0, y: 16 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <ProductCard product={product} />
                            </motion.li>
                        ))}
                    </motion.ul>
                </section>
            </main>
        </div>
    )
}

export default Home
