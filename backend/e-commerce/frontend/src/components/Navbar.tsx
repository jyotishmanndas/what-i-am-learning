import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ShoppingCart, User2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full border-b border-border/60 bg-white/80 backdrop-blur-xl fixed top-0 left-0 z-40"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="flex items-center gap-2"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-md shadow-neutral-900/20">
                        <span className="text-xs font-semibold tracking-tight">FK</span>
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-foreground">
                        Flipkart Minimal
                    </span>
                </button>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-border/80 bg-background px-3 text-sm text-muted-foreground shadow-sm transition-all hover:border-foreground/30 hover:bg-foreground/2 hover:text-foreground"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="hidden text-xs font-medium sm:inline">Cart</span>
                    </button>

                    {isAuthPage ? (
                        <button
                            type="button"
                            onClick={() => navigate('/home')}
                            className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background shadow-sm transition-all hover:bg-foreground/90"
                        >
                            <User2 className="h-4 w-4" />
                            Home
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="hidden h-9 items-center rounded-full border border-border/80 bg-background px-4 text-xs font-medium text-foreground shadow-sm transition-all hover:border-foreground/40 hover:bg-foreground/2 sm:inline-flex"
                            >
                                Log in
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/signup')}
                                className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-xs font-medium text-background shadow-sm transition-all hover:bg-foreground/90"
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.header>
    )
}

export default Navbar