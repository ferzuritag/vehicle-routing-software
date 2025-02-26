from passlib.context import CryptContext

crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User:
    def __init__ (self, email, password, verified: bool, active: bool):
        self.email = email
        self.password = crypt_context.hash(password)
        self.verified = verified
        self.active = active