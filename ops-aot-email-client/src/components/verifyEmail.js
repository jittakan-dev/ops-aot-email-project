const nodemailer = require("nodemailer");

async function verifyEmail(email) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "your_email@gmail.com",
      pass: "your_email_password",
    },
  });

  let info = await transporter.verify();

  let emailOptions = {
    from: "your_email@gmail.com",
    to: email,
  };

  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

verifyEmail("example@example.com")
  .then((result) => {
    console.log("Email verification successful:", result);
  })
  .catch((error) => {
    console.log("Email verification failed:", error);
  });
