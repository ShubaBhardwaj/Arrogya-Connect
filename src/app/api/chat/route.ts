import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
    const { message, source, districtCode } = await request.json();

    let reply = 'Sorry, I could not understand.';

    if (message.toLowerCase().includes('vaccination')) {
        const res = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtCode}&date=14-09-2025`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const centers = res.data.centers;
        reply = centers.length
            ? `Vaccination centers:\n• ${centers[0].name}, ${centers[0].block_name}, Slots: ${centers[0].sessions[0].available_capacity}`
            : 'No vaccination centers found.';
    }
    else if (message.toLowerCase().includes('typhoid symptoms')) {
        reply = 'Symptoms include fever, weakness, stomach pain, and loss of appetite.';
    }
    else if (message.toLowerCase().includes('outbreak')) {
        // You can implement this later by querying outbreak API or DB
        reply = 'No recent outbreaks reported.';
    }

    return NextResponse.json({ reply });
}
