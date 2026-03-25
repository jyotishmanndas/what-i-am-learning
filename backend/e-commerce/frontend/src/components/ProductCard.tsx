import type { ProductDetail } from '@/lib/types';
import { Button } from './ui/button'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'

const ProductCard = ({ product }: { product: ProductDetail }) => {
    const navigate = useNavigate();

    return (
        <motion.article
            onClick={() => navigate(`/product/${product._id}`)}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="flex aspect-square w-full shrink-0 items-center justify-center bg-muted">
                {product.image ? (
                    <img
                        src={product.image[0]}
                        alt={product.productName}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="text-sm text-muted-foreground">No image</span>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="line-clamp-2 text-sm font-medium text-foreground sm:text-base">
                    {product.productName}
                </h2>
                {product.productDescription && (
                    <p className="flex-1 text-xs text-muted-foreground line-clamp-2 sm:text-sm">
                        {product.productDescription}
                    </p>
                )}
                {product.price != null && (
                    <p className="mt-auto text-base font-semibold text-foreground sm:text-lg">
                        {product.price.currency === "INR" ? "₹" : "$"}{product.price.amount}
                    </p>
                )}
                <Button
                    className="mt-3 w-full rounded-xl"
                    variant="default"
                    size="default"
                    onClick={(e) => e.stopPropagation()}
                >
                    Add to cart
                </Button>
            </div>
        </motion.article>
    )
}

export default ProductCard