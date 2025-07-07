import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

interface InputData {
    Time_spent_Alone: number
    Stage_fear: boolean
    Social_event_attendance: number
    Going_outside: number
    Drained_after_socializing: boolean
    Friends_circle_size: number
    Post_frequency: number
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body)

        // Validate required fields
        const requiredFields = ['Time_spent_Alone',
            'Stage_fear',
            'Social_event_attendance',
            'Going_outside',
            'Drained_after_socializing',
            'Friends_circle_size',
            'Post_frequency',
        ];

        const predictionData: InputData = {
            Time_spent_Alone: body.Time_spent_Alone,
            Stage_fear: body.Stage_fear,
            Social_event_attendance: body.Social_event_attendance,
            Going_outside: body.Going_outside,
            Drained_after_socializing: body.Drained_after_socializing,
            Friends_circle_size: body.Friends_circle_size,
            Post_frequency: body.Post_frequency,
        };

        const response = await fetch(`${BACKEND_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(predictionData),
        });

        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error making prediction:', error);

        return NextResponse.json(
            {
                error: 'Failed to make prediction',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}