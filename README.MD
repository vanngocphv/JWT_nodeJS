# Program: JWT Authentication App (using jwt.io)

Program description: This program using for learning and running demo when using jwt in a nodejs project. With Expressjs, JWT and mongoose <br />
Guide from this [link](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iqqESP8335DA5cRFp8loyp) (my code has alot of different with this source from this link's source) <br />
Creator: NgocPHV <br />
Date Created: 13/09/2023 <br />
Date Finished: 19/09/2023 <br />

# Index content

- [General info](#general-info)
- [Technologies](#technologies)
- [Explain](#explain)
- [Demo](#demo)

# General info

- This project using for my personal
- Self-learning about to Mongoose and JWT in an authentication web application
- User can create new account and login, check recipes. If user doesn't have authentication => cannot access

# Technologies

- Create with NodeJS v18.17.0
- NPM packages: ExpressJS, JWT, mongoose, bcrypt, ejs
  (Have a plan using toastr alert but maybe later)

# Explain

- This web app will let user can create new account, and login with this account
- If user doesn't login, just want to go the url which just a login user can see, the middleware will not let this to occurs
- If user create a jwt value, the server will check if valid or not. If not will active handle cannot access the resource
- Check JWT for more about information [link] (https://jwt.io/)

# Demo

- Authentication demo <br />
  [Demo](./gif/authentication.gif)
