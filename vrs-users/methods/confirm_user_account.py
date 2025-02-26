from classes.UsersDAO import UsersDAO
from fastapi import HTTPException
from fastapi.responses import HTMLResponse

def confirm_user_account(user_email,account_confirmation_token):
    usersDAO = UsersDAO()

    user_updated_data = usersDAO.confirm_user_account(user_email, account_confirmation_token)

    if user_updated_data is None:
        raise HTTPException(402, detail=f'Couldnt activate token for user {user_email}')
    
    html_content = """
    <html>
        <head>
            <title>VRS account confirmation</title>
        </head>
        <body>
            <div id="main-container" class="center">
                <h1>Your account has been confirmed.</h1>
                <h2>You can close this tab now.</h2>
            </div>
            <style>
                h1 {
                    font-size: 3rem;
                    text-align: center;
                    color: #0e0e0e;
                }


                h2 {
                    font-size: 2rem;
                    color: rgb(15, 15, 15);
                }

                .center {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #main-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100vh;
                }
            </style>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)
