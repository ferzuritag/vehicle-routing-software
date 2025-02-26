def user_schema(user) -> dict:
    return {
        'id': str(user['_id']),
        'email': user['email'],
        'password': user['password'],
        'verified': user['verified'],
        'active': user['active']
    }