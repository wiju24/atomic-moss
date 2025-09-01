import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'orderatomicmoss@gmail.com',
        pass: process.env.EMAIL_PASS || 'your_app_password_here', // This should be an App Password
    },
});

// Email sending function
async function sendEmail(contactData: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}) {
    const { firstName, lastName, email, subject, message } = contactData;
    
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'orderatomicmoss@gmail.com',
        to: process.env.EMAIL_TO || 'orderatomicmoss@gmail.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                </div>
                
                <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
                    <h3 style="color: #333; margin-top: 0;">Message</h3>
                    <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #666;">
                    <p>This message was sent from the Atomic Moss contact form.</p>
                    <p>Reply directly to this email to respond to the customer.</p>
                </div>
            </div>
        `,
        replyTo: email, // This allows you to reply directly to the customer
    };

    return transporter.sendMail(mailOptions);
}

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

        const contactData = {
            firstName,
            lastName,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
        };

        // Send the email
        try {
            await sendEmail(contactData);
            
            // Log successful submission
            console.log('Contact Form Submission Sent:', {
                name: `${firstName} ${lastName}`,
                email,
                subject,
                timestamp: new Date().toISOString()
            });

            // Return success response
            return NextResponse.json({
                success: true,
                message: 'Thank you for your message! We will get back to you soon.'
            });

        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            
            // Log the contact form submission for backup
            console.log('Contact Form Submission (Backup Log):', contactData);
            
            return NextResponse.json(
                { error: 'Message received but there was an issue sending the notification. We will still review your message.' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to process your message. Please try again.' },
            { status: 500 }
        );
    }
}
