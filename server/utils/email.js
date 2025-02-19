
const nodemailer = require('nodemailer');
const { incidentUpdateNotification } = require('./emailTemplate');








const sendincidentReportEmail = async (recipientEmail,title,description,location,newStatus,updaterRole,fromEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }

        })
// title, description, location, latitude, longitude, newStatus, updaterRole, fromEmail
        const emailcontent =incidentUpdateNotification(title,description,location,newStatus,updaterRole,fromEmail);

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Email Verification',
            html: emailcontent
        })

        console.log("Verification email has been sent");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}







module.exports = {
  
    sendincidentReportEmail
}