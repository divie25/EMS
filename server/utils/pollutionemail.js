const nodemailer = require('nodemailer');

/**
 * Generates HTML template for the Pollution Compliance email
 */
function generateComplianceEmail(data) {
  const complianceStatusClass = data.complianceStatus === 'Compliant' ? '' : 'non-compliant';
  const documentsLinks = data.documents?.map(doc => `<a href="${doc}" target="_blank">View Document</a>`).join('') || '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pollution Compliance Update</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
    .container { background: #ffffff; max-width: 600px; margin: 30px auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); animation: fadeIn 1s ease-in-out; }
    h2 { color: #2e7d32; text-align: center; }
    .status { padding: 10px; text-align: center; font-weight: bold; color: #ffffff; border-radius: 8px; margin: 20px 0; background-color: #2e7d32; }
    .status.non-compliant { background-color: #c62828; }
    table { width: 100%; margin-top: 20px; }
    td { padding: 8px 0; border-bottom: 1px solid #eee; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #888; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    a { color: #1565c0; text-decoration: none; }
    .documents a { display: block; margin: 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Pollution Compliance Report</h2>
    <div class="status ${complianceStatusClass}">
      ${data.complianceStatus}
    </div>
    <table>
      <tr><td><strong>Entity Name:</strong></td><td>${data.entityName}</td></tr>
      <tr><td><strong>Industry Type:</strong></td><td>${data.industryType}</td></tr>
      <tr><td><strong>Location:</strong></td><td>${data.location}</td></tr>
      <tr><td><strong>Last Inspection:</strong></td><td>${data.lastInspectionDate}</td></tr>
      <tr><td><strong>Next Inspection:</strong></td><td>${data.nextInspectionDate}</td></tr>
      <tr><td><strong>Notes:</strong></td><td>${data.notes}</td></tr>
    </table>
    <h3 style="margin-top: 30px;">Documents</h3>
    <div class="documents">
      ${documentsLinks}
    </div>
    <div class="footer">
      © 2025 Environment Compliance Team<br>
      Need help? <a href="mailto:support@yourcompany.com">Contact Support</a>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends Pollution Compliance Email
 * @param {Object} data - pollution compliance object (with entityName, status, etc.)
 * @param {String} recipientEmail - recipient's email address
 */
async function sendPollutionComplianceEmail(data, recipientEmail) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'Pollution Compliance Report',
      html: generateComplianceEmail(data)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

module.exports = { sendPollutionComplianceEmail };
