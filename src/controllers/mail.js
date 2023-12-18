/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import nodemailer from 'nodemailer';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporterOptions = JSON.parse(process.env.ES_OPTS.replace(/\$\{([^}]+)\}/g, (match, p1) => process.env[p1]));

const transporter = nodemailer.createTransport(transporterOptions);

// - Mails
//  - recordatorios
//  - confirmacion de reserva
export const sendReminder = ({
  date_start, date_end, user, packageReserved, property,
}) => {
  date_start = moment(date_start).format('DD/MM/YYYY');
  date_end = moment(date_end).format('DD/MM/YYYY');
  const mailOptions = {
    from: {
      name: 'Poncho Home & Stay',
      address: process.env.EU_SENDER,
    },
    to: user.email,
    subject: 'Recordatorio de reserva.',
    html:
    `
      <body>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        </style>
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width: 700px;
            min-width: 400px;
            border-radius: 5px;

            background-color: #1d232a;

            color: #a6a9b8;
            font-family: 'Roboto', Arial, sans-serif;
          "
        >
          <tr>
            <td align="middle" style="padding: 1rem;">
              <img style="" src="phs-icon.png" alt="poncho-home-and-stay icon">
              <p style="padding: 0; margin: 0; box-sizing: border-box; opacity: .5;">Poncho Home & Stay</p>
            </td>
          </tr>
          <tr>
            <td style="width: 100%; height: 1px; background-color: #a6a9b8;"></td>
          </tr>
          <tr>
            <td style="padding: 1rem; font-size: 0.8rem;">
              <h3 style="font-size: 1.5rem; margin: 0; padding: 0; margin-bottom: 1rem;">Reservas <span style="font-weight: 500; opacity: .5;">(recordatorio)</span></h3>
              <p style="margin: 0;">
                Estimado usuario, le recordamos que su reserva inicia en cinco dias.
                Si desea cancelar, por favor haga <a style="text-decoration: none; font-weight: 700;" href="">Click aqui</a>.
              <br>
              <br>
                A continuacion, le detallamos informacion sobre la reserva realizada:
              </p>
              <ul style="
                list-style: none;
                border-left: 1px solid #a6a9b8;
                margin: 0;
                padding: 0;
                padding-left: .5rem;
                margin-top: 1rem;"
              >
                <li style="margin-bottom: 10px;">
                  <b>Propiedad:</b> ${property.address},
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Ubicación:</b> ${property.location.name}
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Capacidad:</b> ${property.capacity} personas
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Fecha entrante:</b> ${date_start}
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Fecha saliente:</b> ${date_end}
                </li>
                <li>
                  <b>Reservado por:</b> ${user.name.toUpperCase()} ${user.lastname.toUpperCase()}
                </li>
              </ul>
              <p>
                Llegado el dia, nos contactaremos para inicar el proceso de residencia. Muchas gracias por usar nuestros servicios.
                <br>
                <br>
                <p style="opacity: .5; text-align: center;">
                  <br>
                  <br>
                  Si en el caso de llegado el dia de su reserva, usted no se presenta, el costo de la misma sera cobrado igualmente.
                  <br>
                  Nos comprometemos con dar el mejor servicio a nuestros clientes, gracias por entender.
                </p>
              </p>
            </td>
          </tr>
          <tfoot>
            <tr>
              <td>
                <p style="margin: 0.5rem; font-size: 0.8rem; opacity: .5; text-align: center;">
                  Copyright &copy; 2023 Poncho H&S. Todos los derechos reservados. <br>
                  Proyecto desarrollado por <b>F.O.N.T.</b>
                </p>
                <div style="text-align: center; margin: 0.5rem;">
                  <a href="https://github.com/francoax?tab=repositories&q=dsw" target="_blank"><img style="width: 20px;" src="github-icon.png" alt="github-icon"></a>
                  <a href="https://www.instagram.com/es.un.elixir_daily/" target="_blank"><img style="width: 20px;" src="instagram-icon.png" alt="instagram-icon"></a>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </body>
    `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

export const sendReserveConfirmation = ({
  date_start, date_end, user, packageReserved,
}) => {
  try {
    date_start = moment(date_start).format('DD/MM/YYYY');
    date_end = moment(date_end).format('DD/MM/YYYY');
    const mailOptions = {
      from: {
        name: 'Poncho Home & Stay',
        address: process.env.EU_SENDER,
      },
      to: 'francoa.duarte2001@gmail.com',
      subject: 'Reserva confirmada.',
      html:
      `
      <body>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        </style>
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width: 700px;
            border-radius: 5px;
            background-color: #1d232a;
            color: #a6a9b8;
            font-family: 'Roboto', Arial, sans-serif;
          "
        >
          <tr>
            <td align="middle" style="padding: 1rem;">
              <img src="cid:image" alt="poncho-home-and-stay icon">
              <p style="padding: 0; margin: 0; box-sizing: border-box; opacity: .5;">Poncho Home & Stay</p>
            </td>
          </tr>
          <tr>
            <td style="width: 100%; height: .125rem; background-color: #a6a9b8;"></td>
          </tr>
          <tr>
            <td style="padding: 1rem; font-size: 0.8rem;">
              <h3 style="font-size: 1.5rem; margin: 0; padding: 0; margin-bottom: 1rem;">Reservas</h3>
              <p style="margin: 0;">
                Estimado/a ${user.name.toUpperCase()}, su reserva ha sido confirmada con exito.
                Muchas gracias por haber utilizado nuestra plataforma.
              <br>
              <br>
                A continuacion, le detallamos informacion sobre de la misma:
              </p>
              <ul style="
                list-style: none;
                border-left: 1px solid #a6a9b8;
                margin: 0;
                padding: 0;
                padding-left: .5rem;
                margin-top: 1rem;"
              >
                <li style="margin-bottom: 10px;">
                  <b>Propiedad:</b> ${packageReserved.property.address},
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Ubicación:</b> ${packageReserved.property.location.name}
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Capacidad:</b> ${packageReserved.property.capacity} personas
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Fecha entrante:</b> ${date_start}
                </li>
                <li style="margin-bottom: 10px;">
                  <b>Fecha saliente:</b> ${date_end}
                </li>
                <li>
                  <b>Reservado por:</b> ${user.name.toUpperCase()} ${user.lastname.toUpperCase()}
                </li>
              </ul>
              <p>
                Muchas gracias, lo esperamos en el dia de inicio de su reserva.
                <br>
                <br>
                En cualquier caso, se le enviara un recordatorio dias antes de iniciar su reserva para que no haya problemas.
                <p style="opacity: .5; text-align: center;">
                  <br>
                  <br>
                  Si en el caso de llegado el dia de su reserva, usted no se presenta, el costo de la misma sera cobrado igualmente.
                  <br>
                  Nos comprometemos con dar el mejor servicio a nuestros clientes, gracias por entender.
                </p>
              </p>
            </td>
          </tr>
          <tfoot>
            <tr>
              <td>
                <p style="margin: 0.5rem; font-size: 0.8rem; opacity: .5; text-align: center;">
                  Copyright &copy; 2023 Poncho H&S. Todos los derechos reservados. <br>
                  Proyecto desarrollado por <b>F.O.N.T.</b>
                </p>
                <div style="text-align: center; margin: 0.5rem; opacity: .5;">
                  <a href="https://github.com/francoax?tab=repositories&q=dsw" target="_blank"><img style="width: 20px;" src="cid:githubicon" alt="github-icon"></a>
                  <a href="https://www.instagram.com/es.un.elixir_daily/" target="_blank"><img style="width: 20px;" src="cid:instaicon" alt="instagram-icon"></a>
                </div>
              </td>
            </tr>
          </tfoot>
      </table>
    </body>
    `,
      attachments: [
        {
          filename: 'phs-icon.png',
          path: path.join(__dirname, '../../assets', 'icons', 'phs-icon.png'),
          cid: 'image',
        },
        {
          filename: 'instagram-icon.png',
          path: path.join(__dirname, '../../assets', 'icons', 'instagram-icon.png'),
          cid: 'instaicon',
        },
        {
          filename: 'github-icon.png',
          path: path.join(__dirname, '../../assets', 'icons', 'github-icon.png'),
          cid: 'githubicon',
        },
      ],
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default {
  sendReminder,
  sendReserveConfirmation,
};
