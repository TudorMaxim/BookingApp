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

    public async sendTo(user: User): Promise<void> {
        const data = this.registrationEmailFor(user);
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