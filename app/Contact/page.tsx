"use client";

import { Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: result.message || 'Message sent successfully!'
                });
                // Reset form on success
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: result.error || 'Failed to send message. Please try again.'
                });
            }
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get in touch with us. We&apos;d love to hear from you and answer any questions you might have.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h2>
                        
                        {/* Email */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                <p className="text-gray-600">orderatomicmoss@gmail.com</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                                <p className="text-gray-600">
                                    Toronto, Ontario<br />
                                </p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                                <p className="text-gray-600">
                                    Monday - Friday: 9:00 AM - 9:00 PM<br />
                                    Saturday - Sunday: 9:00 AM - 6:00 PM<br />
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
                        
                        {/* Status Messages */}
                        {submitStatus.type && (
                            <div className={`mb-6 p-4 rounded-md ${
                                submitStatus.type === 'success' 
                                    ? 'bg-green-50 text-green-800 border border-green-200' 
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="What&apos;s this about?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Social Media & Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Social Media */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition duration-200">
                                <Instagram className="h-8 w-8" />
                            </a>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Support</h3>
                        <p className="text-gray-600">
                            Need help with your order?<br />
                            Our support team is here to help!
                        </p>
                    </div>

                    {/* Newsletter */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Stay Updated</h3>
                        <p className="text-gray-600">
                            Subscribe to our newsletter for<br />
                            the latest products and offers
                        </p>
                    </div>
                </div>

                {/* Map or Additional Image Section */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Our Store</h3>
                    <p className="text-gray-600 mb-6">
                        Come visit us in person to experience our products firsthand
                    </p>
                    <div className="bg-white rounded-lg p-4 inline-block">
                        <div className="w-64 h-32 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-500">Map Placeholder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
