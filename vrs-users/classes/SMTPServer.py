import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

class SMTPServer:
    def __init__(self):
        pass

    def send_confirmation_email(self, destination_email, confirmation_token):

        # Configura los detalles del servidor SMTP
        smtp_server = os.getenv('SMTP_SERVER')
        smtp_port = int(os.getenv('SMTP_SERVER_PORT'))
        smtp_username = os.getenv('SMTP_SERVER_USER')
        smtp_password = os.getenv('SMTP_SERVER_PASSWORD')

        # Detalles del remitente y destinatario
        from_email = os.getenv('SMTP_SERVER_USER')
        to_email = destination_email

        # Construye el mensaje
        message = MIMEMultipart()
        message['From'] = from_email
        message['To'] = to_email
        message['Subject'] = 'Confirma tu cuenta para usar Vehicle Routing Software'

        # Contenido del correo
        body = f'<p> Da click en el siguiente link para confirmar tu cuenta. <a href="{ os.getenv("USERS_API_PATH") }/users/confirm-account/{destination_email}/{confirmation_token}">Click</a> </p>'
        message.attach(MIMEText(body, 'html'))

        # Inicia la conexión SMTP y envía el correo
        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()  # Inicia la capa de seguridad
            server.login(smtp_username, smtp_password)
            server.sendmail(from_email, to_email, message.as_string())
            print(F'Confirmation email sended to {destination_email}')
        except Exception as e:
            print(f'Error when sending email to {destination_email}', e)
        finally:
            server.quit()  # Cierra la conexión SMTP
