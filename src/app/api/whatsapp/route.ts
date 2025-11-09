import { NextRequest, NextResponse } from 'next/server';
import { twiml } from 'twilio';
import axios from 'axios';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const userMessage = formData.get('Body')?.toString() || '';

    const districtCode = 123;  // You can improve by parsing the user location

    let chatbotReply = 'Sorry, something went wrong.';

    try {
        const chatbotRes = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/chat`,
            { user_input: userMessage, districtCode },
            { headers: { 'Content-Type': 'application/json' } }
        );

        chatbotReply = chatbotRes.data.reply;
    } catch (error) {
        console.error('Chatbot API Error:', error);
    }

    const response = new twiml.MessagingResponse();
    response.message(chatbotReply);

    return new NextResponse(response.toString(), {
        headers: { 'Content-Type': 'application/xml' },
    });
};
