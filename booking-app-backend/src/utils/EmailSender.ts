import * as AWS from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import IUser from '../model/IUser';

interface IEmailData {
    sender: string;
    receiver: string;
    subject: string;
    htmlBody: string;
}

export default class EmailSender {
    private ses: AWS.SES;

    public constructor() {
        this.ses = new AWS.SES();
    }

    public async sendTo(user: IUser): Promise<void> {
        const data = this.registrationEmailFor(user);
        const params = this.buildParams(data);
        await this.ses.sendEmail(params).promise();
    }

    private registrationEmailFor(user: IUser): IEmailData {
        const sender: string = process.env.EMAIL_SENDER || '';
        const registrationLink = `${process.env.FRONTEND_HOST}/validate/${user.uuid}`;
        return {
            sender,
            receiver: user.email,
            subject: 'Validate your email!',
            htmlBody: `<h1> Welcome to the Booking App! </h1> 
                    <p> Please follow <a href="${registrationLink}"> this link </a> to validate your email. </p>`
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