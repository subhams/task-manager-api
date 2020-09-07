const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//sgMail.setApiKey(sendGridApiKey)

const sendWelcomeEmail = (email, name)=> {
    sgMail.send({
        to: email,
        from: 'subhamsarkarpro@gmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app ${name}. Let me know how you get along with the app`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'subhamsarkarpro@gmail.com',
        subject: 'Cancelation Email',
        text: `Sorry to see you go ${name}`
    })
}
// sgMail.send({
//     to : 'subhamsarkarpro@gmail.com',
//     from: 'subhamsarkarpro@gmail.com',
//     subject: 'This is my 1st Email',
//     text: 'I hope this gets to you'

// })

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}