import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'joaquinunez2004@gmail.com',
    pass: 'axuqmxgwtfuourxt'
  }
})

let from = `Servicio de reset pass <joaquinunez2004@gmail.com>`

export const sendEmail = async ({userMail, subject, html}) => {
    return  await transport.sendMail({
        from,
        to: userMail,
        subject,
        html
        // attachments: []
    })
}


// export default transport