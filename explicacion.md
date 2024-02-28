# notas

- multer 
[multer-documentation](https://www.npmjs.com/package/multer)
- socket.io
[socket.io-documentation](https://socket.io/docs/v4/)
- graphQL
[graphQL-documentation](https://graphql.org/learn/)
- expressJS
[expressJS-documentation](https://expressjs.com/)
- mongoose
[mongooseJS-documentation](https://mongoosejs.com/)
- JWT
[JWT-documentation](https://jwt.io/introduction)
- bcryptJS
[bcrypt-documentation](https://www.npmjs.com/package/bcryptjs)
- dotenv
[dotenv-documentation](https://www.npmjs.com/package/bcryptjs)
- nodemon
[nodemon-documentation](https://www.npmjs.com/package/nodemon)

//usuarios pasando el ID

query{
  User(id: "65ceb797600b0159e555930f"){
    email
  }
}

// usuarios omitiendo e incluyendo datos

query UserName($ID: String!, $withEmail: Boolean!, $skipLastname: Boolean!) {
  User(id: $ID) {
    name
    @include(if: $withEmail) email
    @skip(if: $skipLastname) lastname
  }
}