import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

interface SendEmailParams {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string | number;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set:
                    { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "bef2a4ca354ec5",
                pass: "f4239a7c5c4665"
            }
        });

        const mailOptions = {
            from: 'kzshafique77@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/account/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser.
            <br>
            ${process.env.DOMAIN}/account/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
    }
};