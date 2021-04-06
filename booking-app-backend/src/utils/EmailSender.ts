import * as AWS from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import User from '../model/User';

interface IEmailData {
    sender: string;
    receiver: string;
    subject: string;
    htmlBody: string;
}

class EmailSender {
    private ses = new AWS.SES();

    public async sendActivationEmailTo(user: User): Promise<void> {
        const data = this.registrationEmailFor(user);
        const params = this.buildParams(data);
        await this.ses.sendEmail(params).promise();
    }

    public async sendConfirmationEmailTo(email: string | undefined): Promise<void> {
        if (!email) return;
        const data = this.confirmationEmailFor(email);
        const params = this.buildParams(data);
        await this.ses.sendEmail(params).promise();
    }

    public async sendRecoveryEmail(email: string, password: string): Promise<void> {
        const data = this.recoveryEmailFor(email, password);
        const params = this.buildParams(data);
        await this.ses.sendEmail(params).promise();
    }

    private registrationEmailFor(user: User): IEmailData {
        const sender: string = process.env.EMAIL_SENDER || '';
        const registrationLink = `${process.env.FRONTEND_HOST}/activate/${user.attributes.id}`;
        return {
            sender,
            receiver: user.attributes.email!,
            subject: 'Activate your account!',
            htmlBody: `<h1> Welcome to the Booking App! </h1> 
                    <p> Please follow <a href="${registrationLink}"> this link </a> to activate your account. </p>`
        }
    }

    private confirmationEmailFor(email: string): IEmailData {
        const sender = process.env.EMAIL_SENDER || '';
        const calendarLink = `${process.env.FRONTEND_HOST}/calendar`;
        return {
            sender,
            receiver: email,
            subject: 'Your booking is confirmed!',
            htmlBody: `<h3> Congratulations!</h3>
                <p> We received your booking. Please check your calendar <a href="${calendarLink}"> here </a>.</p>`
        }
    }

    private recoveryEmailFor(email: string, password: string): IEmailData {
        const sender = process.env.EMAIL_SENDER || '';
        const loginLink = `${process.env.FRONTEND_HOST}/login`;
        return {
            sender,
            receiver: email,
            subject: 'Recover your account',
            htmlBody: `<h3> Hello!</h3>
                <p> Your password was successfully reset!</p>
                <p> Your new password is: ${password} </p>
                <p> Use it to login by clicking <a href="${loginLink}"> here </a>. </p>
                <p> Note: we recommend changing your password after you login </p>`
        }
    }


    private buildParams = (data: IEmailData): SendEmailRequest => ({
        Source: data.sender,
        Destination: {
            ToAddresses: [data.receiver]
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: data.subject
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: data.htmlBody
                }
            }
        }
    });
}

const emailSender = new EmailSender();
export default emailSender;
