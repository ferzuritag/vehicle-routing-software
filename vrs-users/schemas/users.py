from schemas.user import user_schema

def users_schema(users) -> list:
    return [user_schema(user) for user in users ]