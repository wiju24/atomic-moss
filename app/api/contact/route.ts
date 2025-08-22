import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, subject, message } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Here you would integrate with your email service
        // For now, we'll log the contact form data
        // You can integrate with services like:
        // - SendGrid
        // - Nodemailer
        // - AWS SES
        // - Resend
        // - Or any other email service

        const contactData = {
            firstName,
            lastName,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
        };

        // Log the contact form submission (replace with actual email sending)
        console.log('Contact Form Submission:', contactData);

        // TODO: Replace this with actual email sending logic
        // Example with a hypothetical email service:
        /*
        await sendEmail({
            to: 'orderatomicmoss@gmail.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            `
        });
        */

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        );
    }
}
