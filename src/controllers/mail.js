import nodemailer from 'nodemailer';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporterOptions = JSON.parse(process.env.ES_OPTS.replace(/\$\{([^}]+)\}/g, (match, p1) => process.env[p1]));

const transporter = nodemailer.createTransport(transporterOptions);

// - Mails
//  - recordatorios
//  - confirmacion de reserva
export const sendReminder = async ({ user, packageReserved, property }) => {
  const mailOptions = {
    from: {
      name: 'Poncho Home & Stay',
      address: process.env.EU_SENDER,
    },
    to: user.email,
    subject: 'Recordatorio de reserva.',
    html:
    `
      <div style=
      "
        margin: auto;
        border-color: gray;
        border-radius: 5px
      ">
        <header style="display: flex; justify-content: center; align-items: center;">
          <img src="cid:image" />
          <h1>Poncho Home & Stay - Reservas</h1>
        </header>
        <section>
          <p>Estimado ${user.name}, le recordamos que su reserva por ${property.location.name} es en cinco dias.</p>
          <h3>Informacion sobre la reserva</h3>
          <ul>
            <li>Precio por noche: ${property.pricePerNight.price}</li>
            <li>Auto reservado: ${packageReserved.car} </li>
            <li>Asistencia medica: </li>
            <li>Total: </li>
          </ul>
        </section>
      </div>
    `,
    attachments: [
      {
        filename: 'phs-icon.png',
        path: path.join(__dirname, '../../assets', 'icons', 'phs-icon.png'),
        cid: 'image',
      },
    ],
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

const sendMail = (req, res) => {
  const mailOptions = {
    from: {
      name: 'Poncho Home & Stay',
      address: process.env.EU_SENDER,
    },
    to: 'francoa.duarte2001@gmail.com',
    subject: 'Testing',
    html: `<b>Testing email ${req.params}</b>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error.message);
      res.send('error al enviar el mail');
    } else {
      console.log(info.response);
      res.send('correo enviado');
    }
  });
};

export const sendReserveConfirmation = (user) => {
  try {
    const mailOptions = {
      from: {
        name: 'Poncho Home & Stay',
        address: process.env.EU_SENDER,
      },
      to: user.email,
      subject: 'Reserva confirmada.',
      html: '<b>Le informamos que su reserva fue completada con exito.</b>',
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default {
  sendMail,
  sendReminder,
  sendReserveConfirmation,
};
