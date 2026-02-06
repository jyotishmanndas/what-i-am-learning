import type { ProductPlaceholder } from '@/pages/Home'
import { Button } from './ui/button'
import { useNavigate } from 'react-router'

const ProductCard = ({ product }: { product: ProductPlaceholder }) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/product/${product._id}`)} className="h-full flex flex-col rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden cursor-pointer transition-shadow hover:shadow-md">
            <div className="aspect-square w-full bg-muted flex items-center justify-center shrink-0">
                {product.image ? (
                    <img
                        src={product.image[0]}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-muted-foreground text-sm">No image</span>
                )}
            </div>
            <div className="flex flex-col flex-1 p-4 gap-2">
                <h2 className="font-semibold text-foreground line-clamp-2">
                    {product.productName}
                </h2>
                {product.productDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {product.productDescription}
                    </p>
                )}
                {product.price != null && (
                    <p className="text-lg font-semibold text-foreground mt-auto">
                        {product.price.currency === "INR" ? "₹" : "$"}{product.price.amount}
                    </p>
                )}
                <Button
                    className="w-full mt-2"
                    variant="default"
                    size="default"
                    onClick={(e) => e.stopPropagation()}
                >
                    Add to cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard