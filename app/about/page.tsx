"use client";

import { useState } from 'react';
import { Star, Calendar, Users, Award, Leaf, Heart, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const [activeTimelineItem, setActiveTimelineItem] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Wellness Coach",
            content: "Atomic Moss has transformed my approach to natural health. Their products are consistently high-quality and have made a real difference in my clients' wellness journeys. The purity and effectiveness are unmatched!",
            rating: 5,
            avatar: "SJ"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Fitness Enthusiast",
            content: "I've been using Atomic Moss products for over a year now, and the results speak for themselves. My energy levels have improved significantly, and I feel more balanced than ever. Highly recommend!",
            rating: 5,
            avatar: "MC"
        },
        {
            id: 3,
            name: "Dr. Emily Rodriguez",
            role: "Naturopathic Doctor",
            content: "As a healthcare professional, I'm very selective about the products I recommend. Atomic Moss consistently meets the highest standards of quality and purity. My patients love the results they're seeing.",
            rating: 5,
            avatar: "ER"
        }
    ];

    const timelineData = [
        {
            year: "2020",
            title: "The Beginning",
            description: "Founded with a vision to bring the highest quality natural health products to consumers. Started with a small team passionate about wellness and sustainability.",
            icon: <Leaf className="h-6 w-6 text-primary" />
        },
        {
            year: "2021",
            title: "First Product Launch",
            description: "Successfully launched our flagship sea moss products, establishing partnerships with sustainable suppliers and implementing rigorous quality control measures.",
            icon: <Award className="h-6 w-6 text-primary" />
        },
        {
            year: "2022",
            title: "Expansion & Growth",
            description: "Expanded product line to include topicals and wellness supplements. Grew our customer base and established our reputation for quality and customer service.",
            icon: <Zap className="h-6 w-6 text-primary" />
        },
        {
            year: "2023",
            title: "Community Building",
            description: "Launched educational initiatives and built a strong community of wellness enthusiasts. Introduced new product categories based on customer feedback.",
            icon: <Users className="h-6 w-6 text-primary" />
        },
        {
            year: "2024",
            title: "Future Vision",
            description: "Continuing to innovate and expand our product offerings while maintaining our commitment to quality, sustainability, and customer satisfaction.",
            icon: <Globe className="h-6 w-6 text-primary" />
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        About Atomic Moss
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We&apos;re passionate about bringing you the highest quality natural health products, 
                        backed by science and delivered with care.
                    </p>
                </div>
            </div>

            {/* Mission & Values */}
            <div className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                At Atomic Moss, we believe that nature provides the most powerful solutions for health and wellness. 
                                Our mission is to source, create, and deliver premium natural products that support your journey to optimal health.
                            </p>
                            <p className="text-lg text-gray-600">
                                We&apos;re committed to sustainability, transparency, and the highest standards of quality in everything we do.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
                                <p className="text-sm text-gray-600">Premium ingredients, rigorous testing</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Natural & Pure</h3>
                                <p className="text-sm text-gray-600">100% natural, no artificial additives</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Sustainable</h3>
                                <p className="text-sm text-gray-600">Eco-friendly practices</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 rounded-lg">
                                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                                <p className="text-sm text-gray-600">Supporting your wellness journey</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Timeline */}
            <div className="py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                        <p className="text-lg text-gray-600">
                            Discover the story of how Atomic Moss grew from a simple idea to a trusted wellness brand
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/30"></div>
                        
                        <div className="space-y-12">
                            {timelineData.map((item, index) => (
                                <div key={index} className={`relative flex items-center ${
                                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                }`}>
                                    {/* Timeline Content */}
                                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div 
                                            className={`p-6 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                                                activeTimelineItem === index 
                                                    ? 'ring-2 ring-primary scale-105' 
                                                    : 'hover:scale-102'
                                            }`}
                                            onClick={() => setActiveTimelineItem(index)}
                                        >
                                            <div className="flex items-center mb-3">
                                                <Calendar className="h-5 w-5 text-primary mr-2" />
                                                <span className="text-lg font-bold text-primary">{item.year}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline Icon */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
                                        {item.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                        <p className="text-lg text-gray-600">
                            Real stories from real people who have experienced the benefits of our products
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
                                {/* Rating */}
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>

                                {/* Testimonial Content */}
                                <p className="text-gray-700 mb-6 italic">
                                    &ldquo;{testimonial.content}&rdquo;
                                </p>

                                {/* Author */}
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-lg mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-20 bg-primary/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Wellness Journey?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of customers who have already discovered the benefits of our premium natural health products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            href="/products" 
                            className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition duration-200"
                        >
                            Shop Our Products
                        </Link>
                        <Link 
                            href="/Contact" 
                            className="inline-flex items-center px-8 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-white transition duration-200"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
