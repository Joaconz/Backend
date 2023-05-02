import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'joaquinunez2004@gmail.com',
    pass: 'axuqmxgwtfuourxt'
  }
})

export default transport