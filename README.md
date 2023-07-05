# NodeJS-API
Book store API made using Node.js, Express.js, and MongoDB.

## API Features:
#### 1. Admin:
* Only Admin can add/delete a book
* Admin can update a book's data, such as title, description, author and price.

#### 2. User:
* User signup ,login feature available.
* User has 2 roles: Normal user, Admin user.
* A normal user can signup by Name, Email, Username and Password.
* For login, Email and Password is required.
* Authentication is done by JWT tokens.
* A normal user can see list of books but he/she can not add/modify a book.
* A norma user can also cancel a purchase.

#### Books:
* Show a list of books.
* Show individual book details.
