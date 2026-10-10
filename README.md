# Messaging Application – Members only

This project involved building a small messaging application with role-based access control. Standard users can create and read messages, but they cannot see who wrote them or when they were created.

Users can upgrade their access level to become members, allowing them to view message authors and creation timestamps. Administrators have the highest level of access and can also delete messages. Users can obtain administrator privileges by entering a predefined secret code through the application's `/admin` route.

The main focus of the project was to practise user authentication, session management, and role-based access control using the following packages:

- **Passport (Local Strategy):** for user authentication.
- **bcryptjs:** for securely hashing and salting passwords.
- **connect-pg-simple:** for storing user sessions in a PostgreSQL database.

## Live example
A live example of the site's membership code is `m3mb3r`.
You can become an admin with the code `adm1n`.

## Environment variables

Example of environment variables:

```.env
//.env
DATABASE_URL="postgresql://<role_name>:<role_password>@<host>:<port>/<database>"
PORT=3000
SECRET_SESSION="ah8034Pk3543kjl535kM5l91"
USER_PASSWORD="password123"
MEMBER_PASSCODE="membership123"
ADMIN_PASSCODE="admin123"
```

## Image sources
Image <a href="https://pixabay.com/fi/users/paligraficas-6638487/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2831467">PaliGraficas</a> <a href="https://pixabay.com/fi//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2831467">From Pixabay</a>
