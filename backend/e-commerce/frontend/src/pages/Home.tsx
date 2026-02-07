import ProductCard from '@/components/ProductCard'
import { useProductApi } from '@/hooks/useProductApi'
import type { ProductDetail } from '@/lib/types';

const Home = () => {
    const { data, isPending } = useProductApi();

    if (isPending) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="flex-1 px-8 pt-14 font-mono">
                <header className="max-w-7xl mx-auto mb-10">
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        All Products
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Browse and add items to your cart
                    </p>
                </header>

                <section className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-4 gap-6 list-none p-0 m-0">
                        {data.map((product: ProductDetail) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
