from classes.UsersDAO import UsersDAO

def delete_user(user_email):

    usersDAO = UsersDAO()

    usersDAO.delete_user_by_email(user_email)

    return {
        'detail': f'user {user_email} deleted succesfully'
    }