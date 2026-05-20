const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send contact form email
const sendContactEmail = async ({ name, email, subject, message, phone }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field"><span class="label">Name:</span> ${name}</div>
          <div class="field"><span class="label">Email:</span> ${email}</div>
          ${phone ? `<div class="field"><span class="label">Phone:</span> ${phone}</div>` : ""}
          <div class="field"><span class="label">Subject:</span> ${subject}</div>
          <div class="field"><span class="label">Message:</span></div>
          <div class="field">${message.replace(/\n/g, "<br>")}</div>
        </div>
        <div class="footer">
          <p>Sent from MJ&Roberts Consulting Website</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  await transporter.sendMail({
    from: `"MJ&Roberts Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `Contact Form: ${subject}`,
    html,
  });
};

// Send job application email
const sendJobApplicationEmail = async (application, job) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Job Application</h2>
          <p>${job.title} - ${job.location}</p>
        </div>
        <div class="content">
          <div class="field"><span class="label">Applicant Name:</span> ${application.applicantName}</div>
          <div class="field"><span class="label">Email:</span> ${application.applicantEmail}</div>
          <div class="field"><span class="label">Phone:</span> ${application.applicantPhone || "Not provided"}</div>
          <div class="field"><span class="label">Experience:</span> ${application.experience || "Not specified"}</div>
          <div class="field"><span class="label">Current Company:</span> ${application.currentCompany || "Not specified"}</div>
          ${application.resumeUrl ? `<div class="field"><span class="label">Resume:</span> <a href="${application.resumeUrl}">Download</a></div>` : ""}
          <div class="field"><span class="label">Cover Letter:</span></div>
          <div class="field">${(application.coverLetter || "No cover letter provided").replace(/\n/g, "<br>")}</div>
        </div>
        <div class="footer">
          <p>View all applications in the admin dashboard</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  await transporter.sendMail({
    from: `"MJ&Roberts Jobs" <${process.env.EMAIL_USER}>`,
    to: process.env.HR_EMAIL,
    subject: `New Job Application: ${job.title} - ${application.applicantName}`,
    html,
  });
};

module.exports = { sendContactEmail, sendJobApplicationEmail };