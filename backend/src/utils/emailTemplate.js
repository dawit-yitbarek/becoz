export default function generateEmail({ name, email, phone, message }) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>New Contact Message</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; color: #333; padding: 20px; }
        .container { background-color: #ffffff; border-radius: 8px; padding: 30px; max-width: 600px; margin: auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08); }
        .header { border-bottom: 2px solid #ffcb74; padding-bottom: 10px; margin-bottom: 20px; }
        .header h2 { color: #111; margin: 0; }
        .info p { margin: 5px 0; font-size: 15px; }
        .info span { font-weight: 600; color: #000; }
        .message { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ffcb74; border-radius: 4px; font-style: italic; color: #444; }
        .footer { margin-top: 30px; font-size: 13px; color: #777; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📩 New Contact Message</h2>
        </div>
        <div class="info">
          <p><span>Name:</span> ${name}</p>
          <p><span>Email:</span> ${email}</p>
          <p><span>Phone:</span> ${phone}</p>
        </div>
        <div class="message">${message}</div>
        <div class="footer">
          This message was sent from the Becoz broker website contact form.
        </div>
      </div>
    </body>
  </html>
`
}