import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CLAUDE_MRP_API_KEY;
    
    if (!apiKey) {
      console.error('CLAUDE_MRP_API_KEY is not set in environment variables');
      return NextResponse.json(
        { success: false, error: 'API key not configured. Please check server configuration.' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const { imageBase64, mediaType } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType || 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `You are analyzing an insurance card image. Extract the information VERY CAREFULLY. Read each character precisely.

CRITICAL RULES:
1. POLICY NUMBER: Look for "Policy Number:" or "Policy No:" label. It is usually a long number (6-15 digits). 
   - DO NOT confuse with phone numbers (which have 1-800, 1-888, or area codes like 555-XXX-XXXX format)
   - DO NOT include any letters unless they are clearly part of the policy number
   - Policy numbers are typically just digits, sometimes with dashes

2. PHONE NUMBERS vs POLICY NUMBERS:
   - Phone numbers look like: 1-800-XXX-XXXX, (XXX) XXX-XXXX, 1-888-XXX-XXXX
   - Policy numbers look like: 978293125, 12345678, POL-123456
   - If you see "1-800" or "1-888" it is a PHONE NUMBER, not a policy number

3. NAMED INSURED: Look for "Named Insured:" or "Insured:" label. Read the exact spelling of names carefully.

4. INSURANCE COMPANY: Return ONLY the short brand name:
   - "Progressive Universal Insurance Co" → "Progressive"
   - "Allstate Fire and Casualty" → "Allstate"
   - "State Farm Mutual" → "State Farm"
   - "GEICO General Insurance" → "GEICO"

5. VEHICLE INFO: Look for Year, Make, Model, and VIN in a table or list format.

6. If text is blurry or unclear, make your best educated guess based on context, but prioritize accuracy over guessing.

Extract these fields (use empty string "" if not clearly visible):
- insuranceCompany: Short brand name only
- policyNumber: The actual policy number (NOT phone number)
- policyholderFirstName: First name from "Named Insured" section
- policyholderLastName: Last name from "Named Insured" section  
- vehicleYear: 4-digit year
- vehicleMake: Vehicle manufacturer (Honda, Ford, Toyota, etc.)
- vehicleModel: Vehicle model name
- vehicleVin: VIN number if visible

Return ONLY valid JSON with no extra text:
{
  "insuranceCompany": "",
  "policyNumber": "",
  "policyholderFirstName": "",
  "policyholderLastName": "",
  "vehicleYear": "",
  "vehicleMake": "",
  "vehicleModel": "",
  "vehicleVin": "",
  "effectiveDate": "",
  "expirationDate": ""
}`,
            },
          ],
        },
      ],
    });

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response');
    }

    const extractedData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      data: extractedData,
    });
  } catch (error) {
    console.error('Insurance card parsing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to parse insurance card',
      },
      { status: 500 }
    );
  }
}