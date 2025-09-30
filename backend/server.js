const express = require("express")
const nodemailer = require("nodemailer")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(bodyParser.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sivapriyakoppaka@gmail.com",     // your email
        pass: "priyaMahadev"        // app password from Gmail
    }
})

app.post("/send", (req, res) => {
    const { name, email, message } = req.body

    const mailOptions = {
        from: email,
        to: "sivapriyakoppaka@gmail.com", // your inbox
        subject: `New Contact: ${name}`,
        text: message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            res.status(500).send("Failed to send email")
        } else {
            res.send("Message sent successfully!")
        }
    })
})

app.listen(5000, () => console.log("Backend running on port 5000"))
