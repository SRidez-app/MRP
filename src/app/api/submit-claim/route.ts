import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderToBuffer } from '@react-pdf/renderer';
import ClaimPDF from '@/lib/pdf/claimPDF';
import { ReactElement } from 'react';
import { DocumentProps } from '@react-pdf/renderer';

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

function generateClaimNumber(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const uniqueId = (timestamp + random).slice(0, 6);
  return `MRP-${year}-${uniqueId}`;
}

function formatSubmissionDate(): string {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
}

function buildAttachments(
  pdfBuffer: Buffer,
  claimNumber: string,
  files: FileAttachment[],
  policeReportFiles: FileAttachment[],
  citationFiles: FileAttachment[],
  billOfLadingFiles: FileAttachment[],
  insuranceCardFile: FileAttachment | null
): { filename: string; content: string }[] {
  const attachments: { filename: string; content: string }[] = [];

  attachments.push({
    filename: `Claim-${claimNumber}.pdf`,
    content: pdfBuffer.toString('base64'),
  });

  // Add insurance card first (important document)
  if (insuranceCardFile?.data) {
    attachments.push({ filename: insuranceCardFile.name, content: insuranceCardFile.data });
  }

  policeReportFiles.forEach((file) => {
    if (file.data) {
      attachments.push({ filename: file.name, content: file.data });
    }
  });

  citationFiles.forEach((file) => {
    if (file.data) {
      attachments.push({ filename: file.name, content: file.data });
    }
  });

  billOfLadingFiles.forEach((file) => {
    if (file.data) {
      attachments.push({ filename: file.name, content: file.data });
    }
  });

  files.forEach((file) => {
    if (file.data) {
      attachments.push({ filename: file.name, content: file.data });
    }
  });

  return attachments;
}

function generateFileListHtml(
  files: FileAttachment[],
  policeReportFiles: FileAttachment[],
  citationFiles: FileAttachment[],
  billOfLadingFiles: FileAttachment[],
  insuranceCardFile: FileAttachment | null
): string {
  const allFiles = [
    ...(insuranceCardFile ? [insuranceCardFile] : []),
    ...policeReportFiles,
    ...citationFiles,
    ...billOfLadingFiles,
    ...files
  ];
  
  if (allFiles.length === 0) return '';

  let html = `
    <div style="margin-top: 20px; padding: 15px; background: #F0F9FF; border-radius: 8px; border-left: 4px solid #0EA5E9;">
      <h3 style="margin: 0 0 12px; color: #0369A1; font-size: 14px;">📎 Attached Files (${allFiles.length})</h3>
      <table style="width: 100%; border-collapse: collapse;">
  `;

  // Insurance Card section
  if (insuranceCardFile) {
    html += `<tr><td colspan="2" style="padding: 8px 0 4px; color: #1E40AF; font-weight: bold; font-size: 12px;">🪪 Insurance Card:</td></tr>`;
    html += `<tr><td style="padding: 4px 0; color: #374151; font-size: 13px;">• ${insuranceCardFile.name}</td><td style="padding: 4px 0; color: #6B7280; font-size: 12px; text-align: right;">${(insuranceCardFile.size / 1024).toFixed(1)} KB</td></tr>`;
  }

  if (policeReportFiles.length > 0) {
    html += `<tr><td colspan="2" style="padding: ${insuranceCardFile ? '12px' : '8px'} 0 4px; color: #1E40AF; font-weight: bold; font-size: 12px;">Police Reports:</td></tr>`;
    policeReportFiles.forEach((file) => {
      html += `<tr><td style="padding: 4px 0; color: #374151; font-size: 13px;">• ${file.name}</td><td style="padding: 4px 0; color: #6B7280; font-size: 12px; text-align: right;">${(file.size / 1024).toFixed(1)} KB</td></tr>`;
    });
  }

  if (citationFiles.length > 0) {
    html += `<tr><td colspan="2" style="padding: 12px 0 4px; color: #1E40AF; font-weight: bold; font-size: 12px;">Citations:</td></tr>`;
    citationFiles.forEach((file) => {
      html += `<tr><td style="padding: 4px 0; color: #374151; font-size: 13px;">• ${file.name}</td><td style="padding: 4px 0; color: #6B7280; font-size: 12px; text-align: right;">${(file.size / 1024).toFixed(1)} KB</td></tr>`;
    });
  }

  if (billOfLadingFiles.length > 0) {
    html += `<tr><td colspan="2" style="padding: 12px 0 4px; color: #1E40AF; font-weight: bold; font-size: 12px;">Bill of Lading:</td></tr>`;
    billOfLadingFiles.forEach((file) => {
      html += `<tr><td style="padding: 4px 0; color: #374151; font-size: 13px;">• ${file.name}</td><td style="padding: 4px 0; color: #6B7280; font-size: 12px; text-align: right;">${(file.size / 1024).toFixed(1)} KB</td></tr>`;
    });
  }

  if (files.length > 0) {
    html += `<tr><td colspan="2" style="padding: 12px 0 4px; color: #1E40AF; font-weight: bold; font-size: 12px;">Incident Photos & Documents:</td></tr>`;
    files.forEach((file) => {
      html += `<tr><td style="padding: 4px 0; color: #374151; font-size: 13px;">• ${file.name}</td><td style="padding: 4px 0; color: #6B7280; font-size: 12px; text-align: right;">${(file.size / 1024).toFixed(1)} KB</td></tr>`;
    });
  }

  html += `</table></div>`;
  return html;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      formData, 
      witnesses, 
      files = [], 
      policeReportFiles = [], 
      citationFiles = [], 
      billOfLadingFiles = [],
      insuranceCardFile = null  // NEW: Insurance card file
    } = body;

    const claimNumber = generateClaimNumber();
    const submittedAt = formatSubmissionDate();

    const fileCount = (files?.length || 0) + 
                      (policeReportFiles?.length || 0) + 
                      (citationFiles?.length || 0) + 
                      (billOfLadingFiles?.length || 0) +
                      (insuranceCardFile ? 1 : 0);  // Count insurance card

    const pdfBuffer = await renderToBuffer(
      ClaimPDF({
        claimNumber,
        submittedAt,
        formData,
        witnesses: witnesses || [],
        fileCount,
      }) as ReactElement<DocumentProps>
    );

    const attachments = buildAttachments(
      pdfBuffer,
      claimNumber,
      files as FileAttachment[],
      policeReportFiles as FileAttachment[],
      citationFiles as FileAttachment[],
      billOfLadingFiles as FileAttachment[],
      insuranceCardFile as FileAttachment | null  // NEW
    );

    const incidentTime = formData.incidentHour 
      ? `${formData.incidentHour}:${formData.incidentMinute || '00'} ${formData.incidentPeriod}`
      : 'Not provided';

    const incidentLocation = [
      formData.incidentAddress,
      formData.incidentCity,
      formData.incidentState,
      formData.incidentZip,
    ].filter(Boolean).join(', ') || 'Not provided';

    const fileListHtml = generateFileListHtml(
      files as FileAttachment[],
      policeReportFiles as FileAttachment[],
      citationFiles as FileAttachment[],
      billOfLadingFiles as FileAttachment[],
      insuranceCardFile as FileAttachment | null  // NEW
    );

    // ============================================
    // EMAIL TO INSURANCE COMPANY (INTERNAL)
    // ============================================
    const internalEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1F2937 0%, #374151 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Trucking Incident Report</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Claim #: <strong style="color: #F97316;">${claimNumber}</strong></p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
          <h2 style="color: #1F2937; font-size: 18px; margin-top: 0; border-bottom: 2px solid #F97316; padding-bottom: 10px;">
            Quick Summary
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7280; width: 140px;">Company:</td>
              <td style="padding: 8px 0; font-weight: bold;">${formData.companyName || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Policy #:</td>
              <td style="padding: 8px 0;">${formData.claimantPolicyNumber || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Insurance Co:</td>
              <td style="padding: 8px 0;">${formData.claimantInsuranceCompany || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Date of Incident:</td>
              <td style="padding: 8px 0;">${formData.incidentDate || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Time:</td>
              <td style="padding: 8px 0;">${incidentTime}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Location:</td>
              <td style="padding: 8px 0;">${incidentLocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Driver:</td>
              <td style="padding: 8px 0;">${formData.driverName || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Driver Injured:</td>
              <td style="padding: 8px 0;">
                <span style="background: ${formData.driverInjured === 'yes' ? '#FEE2E2' : '#D1FAE5'}; color: ${formData.driverInjured === 'yes' ? '#991B1B' : '#065F46'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                  ${formData.driverInjured === 'yes' ? 'YES' : 'NO'}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">DOT Recordable:</td>
              <td style="padding: 8px 0;">
                <span style="background: ${formData.dotRecordable === 'yes' ? '#FEF3C7' : '#E5E7EB'}; color: ${formData.dotRecordable === 'yes' ? '#92400E' : '#374151'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                  ${formData.dotRecordable === 'yes' ? 'YES' : formData.dotRecordable === 'no' ? 'NO' : 'UNKNOWN'}
                </span>
              </td>
            </tr>
            ${formData.citationIssued === 'yes' ? `
            <tr>
              <td style="padding: 8px 0; color: #6B7280;">Citation Issued:</td>
              <td style="padding: 8px 0;">
                <span style="background: #FEE2E2; color: #991B1B; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
                  YES - ${formData.citationIssuedTo || 'Unknown'}
                </span>
              </td>
            </tr>
            ` : ''}
          </table>

          ${insuranceCardFile ? `
          <div style="margin-top: 20px; padding: 15px; background: #ECFDF5; border-radius: 8px; border-left: 4px solid #10B981;">
            <p style="margin: 0; color: #065F46; font-size: 14px;">
              <strong>🪪 Insurance Card Attached:</strong> ${insuranceCardFile.name}
            </p>
          </div>
          ` : ''}

          <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #F97316;">
            <h3 style="margin: 0 0 10px; color: #1F2937; font-size: 14px;">Claims Contact</h3>
            <p style="margin: 0; font-weight: bold;">${formData.claimsContactName || 'Not provided'}</p>
            <p style="margin: 5px 0 0; color: #6B7280; font-size: 14px;">
              ${formData.claimsContactPhone || ''} ${formData.claimsContactPhone && formData.claimsContactEmail ? '•' : ''} ${formData.claimsContactEmail || ''}
            </p>
          </div>

          ${fileListHtml}
        </div>

        <div style="background: #1F2937; color: white; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">
            Full claim details and all uploaded files are attached.
          </p>
          <p style="margin: 10px 0 0; font-size: 12px; opacity: 0.7;">
            Submitted on ${submittedAt}
          </p>
        </div>
      </body>
      </html>
    `;

    const { data: internalData, error: internalError } = await resend.emails.send({
      from: 'Moxie Risk Partners <claims@moxieriskpartners.com>',
      to: [INSURANCE_COMPANY_EMAIL],
      subject: `New Claim ${claimNumber} - ${formData.companyName || 'Trucking Incident'}`,
      html: internalEmailHtml,
      attachments,
    });

    if (internalError) {
      console.error('Resend error (internal):', internalError);
      return NextResponse.json(
        { success: false, error: 'Failed to send email to claims department' },
        { status: 500 }
      );
    }

    // ============================================
    // CONFIRMATION EMAIL TO CLAIMANT
    // ============================================
    if (formData.claimsContactEmail) {
      const claimantEmailHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
            <h1 style="margin: 0; font-size: 24px;">Claim Submitted Successfully</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="margin-top: 0;">Dear ${formData.claimsContactName || 'Valued Customer'},</p>
            
            <p>Your trucking incident report has been received and is being processed.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">Your Claim Reference Number:</p>
              <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #F97316;">${claimNumber}</p>
            </div>

            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin: 20px 0;">
              <h3 style="margin: 0 0 10px; color: #1F2937; font-size: 14px;">Incident Summary</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 4px 0; color: #6B7280;">Date:</td>
                  <td style="padding: 4px 0;">${formData.incidentDate || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #6B7280;">Time:</td>
                  <td style="padding: 4px 0;">${incidentTime}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #6B7280;">Location:</td>
                  <td style="padding: 4px 0;">${incidentLocation}</td>
                </tr>
              </table>
            </div>

            ${fileListHtml}
            
            <p>Please keep this reference number for your records. Our claims team will review your submission and contact you shortly.</p>
            
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-weight: bold;">Need Immediate Assistance?</p>
              <p style="margin: 10px 0 0;">
                📞 <a href="tel:5155817187" style="color: #F97316;">(515) 581-7187</a><br>
                ✉️ <a href="mailto:claims@moxieriskpartners.com" style="color: #F97316;">claims@moxieriskpartners.com</a>
              </p>
            </div>
          </div>

          <div style="background: #1F2937; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              Submitted on ${submittedAt}
            </p>
          </div>
        </body>
        </html>
      `;

      await resend.emails.send({
        from: 'Moxie Risk Partners <noreply@moxieriskpartners.com>',
        to: [formData.claimsContactEmail],
        subject: `Claim Received - ${claimNumber}`,
        html: claimantEmailHtml,
        attachments,
      });
    }

    return NextResponse.json({
      success: true,
      claimNumber,
      submittedAt,
      emailId: internalData?.id,
    });

  } catch (error) {
    console.error('Submit claim error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}