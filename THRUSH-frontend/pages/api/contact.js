import nodemailer from 'nodemailer';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'testing.app.admiiin1@gmail.com',
                pass: 'msclaegktjweyxzt'
            },
            secureConnection: 'false',
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        }
    )
    try {
        const { name, email, review } = req.body;
        await transporter.sendMail({
            from: `${name} <${email}>`,
            to: 'testing.app.admiiin1@gmail.com',
            subject: `New Review Submission Form`,
            html: `<p><i>You have a new review form submission :</i></p><br>
        <p>From: <strong>${name}</strong> with email: <strong>${email}</strong></p><br>
        <p>Review: <strong>${review}</strong></p><br>        
        `
        });
        console.log('Review sent!');
    } catch (err) {
        console.log(err)
    }
    res.status(200).json(req.body);
};