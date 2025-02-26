import jwt
import os

def get_email_from_authorization_header(authorization_header: str):
    try:
        _, token = authorization_header.split()

        decoded_token = jwt.decode(token, key=os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])

        email = decoded_token.get("email")

        return email
    except (ValueError, jwt.exceptions.DecodeError):
        return None