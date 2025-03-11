import { NextResponse } from 'next/server';

const GREENHOUSE_API_KEY = process.env.GREENHOUSE_API_KEY;
const candidateId = '4280249007';
const job_Id = '4285367007';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // console.log('formData', formData);

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const jobId = `${job_Id}`;
    const userId = `${candidateId}`;
    const resume = formData.get('resume') as File;

    const currentCompany = formData.get('currentCompany') as string;
    const currentTitle = formData.get('currentTitle') as string;
    const websiteURL = formData.get('websiteURL') as string;

    const linkedInURL = formData.get('linkedInURL') as string;

      const candidateResponse = await fetch(`https://harvest.greenhouse.io/v1/candidates`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${GREENHOUSE_API_KEY}:`).toString("base64")}`,
          'On-Behalf-Of': candidateId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company: currentCompany || null,
          title: currentTitle || null,
          email_addresses: [{ value: email, type: 'personal' }],
          phone_numbers: phone ? [{ value: phone, type: 'mobile' }] : [],
          addresses: location ? [{ value: location, type: 'home' }] : [],
          website_addresses: websiteURL ? [{ value: websiteURL, type: 'personal' }] : [],
          social_media_addresses: linkedInURL ? [{ value: linkedInURL }] : [],
          applications: [{
            job_id: jobId
          }],
        }),
      }); 

    const candidate = await candidateResponse.json();
    console.log('candidate', candidate);
    const newApplicationid = candidate.applications[0].id;


    if (resume) {
      const resumeBuffer = Buffer.from(await resume.arrayBuffer());
      const candiateAttachment = await fetch(`https://harvest.greenhouse.io/v1/applications/${newApplicationid}/attachments`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${GREENHOUSE_API_KEY}:`).toString("base64")}`,
          'On-Behalf-Of': candidateId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: resume.name,
          type: 'resume',
          content_type : "application/pdf",
          content: resumeBuffer.toString('base64'),
        }),
      });

    }

    return NextResponse.json({ success: true, candidateId: candidate.id });
  } catch (error) {
    console.error('Error submitting to Greenhouse:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}