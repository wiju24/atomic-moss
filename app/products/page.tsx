"use client";

import { simplifiedProduct } from "../interface";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Plus, Minus, ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState<simplifiedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const { addItem } = useShoppingCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                // Initialize quantities for all products
                const initialQuantities: { [key: string]: number } = {};
                data.forEach((product: simplifiedProduct) => {
                    initialQuantities[product._id] = 1;
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (productId: string, change: number) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + change)
        }));
    };

    const handleAddToCart = (product: simplifiedProduct) => {
        const quantity = quantities[product._id] || 1;
        
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            currency: 'USD',
            quantity: quantity
        });

        // Reset quantity to 1 after adding to cart
        setQuantities(prev => ({
            ...prev,
            [product._id]: 1
        }));
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
                    <p className="text-gray-600">
                        Discover our complete collection of high-quality products
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200">
                        <Filter className="h-5 w-5" />
                        Filter
                    </button>
                </div>

                {/* Products Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product._id} className="group relative">
                                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 transition duration-200">
                                    <Image
                                        src={product.imageUrl}
                                        alt={`${product.name} - Product Image`}
                                        className="w-full h-full object-cover object-center"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition duration-200">
                                            <Link href={`/product/${product.slug}`}>
                                                {product.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.categoryName}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">
                                        ${product.price}
                                    </p>
                                </div>
                                
                                {/* Quantity Selector and Add to Cart */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition duration-200 space-y-3">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center justify-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(product._id, -1)}
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition duration-200"
                                        >
                                            <Minus className="h-4 w-4 text-gray-600" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium text-gray-900">
                                            {quantities[product._id] || 1}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(product._id, 1)}
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition duration-200"
                                        >
                                            <Plus className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition duration-200 text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">
                            We&apos;re working on adding more products to our collection.
                        </p>
                    </div>
                )}

                {/* Pagination or Load More */}
                {products.length > 0 && (
                    <div className="mt-12 text-center">
                        <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200">
                            Load More Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
