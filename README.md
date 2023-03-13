Workout MERN App with authentication

- Client
  + React
    + Context API
    + Custom hooks
  + localStorage

- Server
  + Express
  + bcrypt
  + validator
  + JWT
  + Mongoose schema, model, statics methods

- DB
  + MongoDB

---
- Authentication / Authorization
  + server: 
    - bcrypt hash/compare password
    - JWT sign/verify access token (user_id payload)
    - MongoDB requests filtered on user_id
  + client: localStorage to persist token / opened session

<img width="1166" alt="image" src="https://user-images.githubusercontent.com/99029880/224803887-f742fa60-7c7d-4456-9c0b-57a6f20c3804.png">
