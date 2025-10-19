"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {ShoppingBag} from 'lucide-react'
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";

const links = [
    {name: "Home", href: "/"},
    {
        name: "Sea Moss", 
        href: "/Bottles",
        subcategories: [
            {name: "All Sea Moss", href: "/Bottles"},
            {name: "Raw Sea Moss", href: "/raw-sea-moss"},
            {name: "Wildcrafted", href: "/wildcrafted"},
            {name: "Bulk Orders", href: "/bulk-orders"},
        ]
    },
    {
        name: "Dry Herbs", 
        href: "/dry-herbs",
        subcategories: [
            {name: "All Herbs", href: "/dry-herbs"},
            {name: "Medicinal Herbs", href: "/medicinal-herbs"},
            {name: "Culinary Herbs", href: "/culinary-herbs"},
            {name: "Tea Blends", href: "/tea-blends"},
        ]
    },
    {
        name: "Merch", 
        href: "/merch",
        subcategories: [
            {name: "All Merch", href: "/merch"},
            {name: "Apparel", href: "/apparel"},
            {name: "Accessories", href: "/accessories"},
            {name: "Gift Sets", href: "/gift-sets"},
        ]
    },
    {name: "Contact Us", href: "/Contact"},
]

export default function Navbar() {
    const pathname = usePathname();
    const {handleCartClick} = useShoppingCart();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    return (
        <header className="mb-8 border-b relative">
            <div className="flex items-center justify-between mx-auto max-w-2xl sm:px-6 lg:max-w-7xl">
                <Link href="/">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        atomic<span className="text-primary"></span>
                    </h1>
                </Link>

                <nav className="hidden gap-12 lg:flex 2xl:ml-16">
                    {links.map((link, idx) => (
                        <div 
                            key={idx}
                            className="relative"
                            onMouseEnter={() => {
                                if (hoverTimeout) {
                                    clearTimeout(hoverTimeout);
                                    setHoverTimeout(null);
                                }
                                setHoveredLink(link.name);
                            }}
                            onMouseLeave={() => {
                                // Only hide if not hovering over dropdown
                                if (!hoveredLink || hoveredLink !== link.name) {
                                    const timeout = setTimeout(() => {
                                        setHoveredLink(null);
                                    }, 100);
                                    setHoverTimeout(timeout);
                                }
                            }}
                        >
                            <div>
                                {pathname === link.href ? (
                                    <Link className="text-lg font-semibold text-primary" href={link.href}>
                                        {link.name}
                                    </Link>
                                ): (
                                    <Link href={link.href} className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary">
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="flex divide-x border-r sm:border-l">
                    <Button 
                        variant={"outline"}
                        onClick={() => handleCartClick()}  
                        className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
                        >
                        <ShoppingBag />
                        <span className="hidden text-xs font-semibold text-gray-500 sm:block">Cart</span>
                    </Button>
                </div>
            </div>
            
            {/* Dropdown Menu - positioned relative to header */}
            {hoveredLink && links.find(link => link.name === hoveredLink)?.subcategories && (
                <div 
                    className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
                    onMouseEnter={() => {
                        if (hoverTimeout) {
                            clearTimeout(hoverTimeout);
                            setHoverTimeout(null);
                        }
                        // Keep the dropdown visible
                        setHoveredLink(hoveredLink);
                    }}
                    onMouseLeave={() => {
                        // Only hide when completely leaving the dropdown
                        const timeout = setTimeout(() => {
                            setHoveredLink(null);
                            setHoveredSubcategory(null);
                        }, 50);
                        setHoverTimeout(timeout);
                    }}
                >
                    <div className="px-6 py-8">
                        <div className="flex items-start space-x-8 max-w-4xl mx-auto">
                            {/* Left side - Subcategory list */}
                            <div className="flex flex-col space-y-2 w-64">
                                {links.find(link => link.name === hoveredLink)?.subcategories?.map((subcategory, subIdx) => (
                                    <Link
                                        key={subIdx}
                                        href={subcategory.href}
                                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition duration-100 rounded-md"
                                        onMouseEnter={() => setHoveredSubcategory(subcategory.name)}
                                        onMouseLeave={() => setHoveredSubcategory(null)}
                                    >
                                        {subcategory.name}
                                    </Link>
                                ))}
                            </div>
                            
                            {/* Right side - Large image placeholder */}
                            <div className="flex-1">
                                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="text-gray-500 text-center">
                                        <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <span className="text-xs text-gray-500">
                                                {hoveredSubcategory || 'Image'}
                                            </span>
                                        </div>
                                        <p className="text-sm">
                                            {hoveredSubcategory ? `${hoveredSubcategory} Image` : 'Hover over a category'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}