import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const maxDuration = 60;

const resend = new Resend(process.env.RESEND_API_KEY);

const INSURANCE_COMPANY_EMAIL = 'claims@moxieriskpartners.com';

interface FileAttachment {
  name: string;
  originalName: string;
  type: string;
  size: number;
  data: string;
  section: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      claimNumber,
      claimsContactEmail,
      companyName,
      files = [],
      chunkIndex,
      totalChunks,
    } = body;

    if (!claimNumber || !files.length) {
      return NextResponse.json(
        { success: false, error: 'Missing claim number or files' },
        { status: 400 }
      );
    }

    const attachments = (files as FileAttachment[])
      .filter((f) => f.data)
      .map((f) => ({ filename: f.name, content: f.data }));

    if (attachments.length === 0) {
      return NextResponse.json({ success: true });
    }

    const fileListHtml = files
      .map(
        (f: FileAttachment) =>
          `<li style="padding: 4px 0; color: #374151; font-size: 13px;">${f.name} (${(f.size / 1024).toFixed(1)} KB)</li>`
      )
      .join('');

    // Send supplementary attachments email to claims team
    const { error: internalError } = await resend.emails.send({
      from: 'Moxie Risk Partners <claims@moxieriskpartners.com>',
      to: [INSURANCE_COMPANY_EMAIL],
      subject: `Additional Files for Claim ${claimNumber} (Part ${chunkIndex}/${totalChunks}) - ${companyName || 'Trucking Incident'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1F2937 0%, #374151 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Additional Files - Claim ${claimNumber}</h1>
            <p style="margin: 10px 0 0; opacity: 0.9; font-size: 14px;">Part ${chunkIndex} of ${totalChunks}</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p>The following additional files have been uploaded for claim <strong style="color: #F97316;">${claimNumber}</strong>:</p>
            <ul style="list-style: none; padding: 0;">${fileListHtml}</ul>
            <p style="margin-top: 15px; font-size: 13px; color: #6B7280;">All files are attached to this email.</p>
          </div>
        </body>
        </html>
      `,
      attachments,
    });

    if (internalError) {
      console.error('Resend error (supplementary files):', internalError);
      return NextResponse.json(
        { success: false, error: 'Failed to send supplementary files' },
        { status: 500 }
      );
    }

    // Also send to claimant if email provided
    if (claimsContactEmail) {
      await resend.emails.send({
        from: 'Moxie Risk Partners <noreply@moxieriskpartners.com>',
        to: [claimsContactEmail],
        subject: `Additional Files Received - Claim ${claimNumber}`,
        html: `
          <!DOCTYPE html>
          <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 10px;">📎</div>
              <h1 style="margin: 0; font-size: 20px;">Additional Files Received</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <p>We have received additional files for your claim <strong style="color: #F97316;">${claimNumber}</strong>.</p>
              <p style="font-size: 13px; color: #6B7280;">${attachments.length} additional file(s) have been added to your claim.</p>
            </div>
          </body>
          </html>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit claim files error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
