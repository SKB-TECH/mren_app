
const mongoose=require('mongoose')
const dotenv = require('dotenv');
const server=require('../server')
const request=require('supertest')(server)

dotenv.config()

  describe('POST /api/message/new/635fd5a24d82a172fc10281b', () => {
        // create a new message
        it('should return message send  of user how is connected', async () => {
            const res= await request.post("/api/message/new/635fd5a24d82a172fc10281b").send({
              sender:"635fd5a24d82a172fc10281b",
              message:"salut",
              recever:"635fd5a24d82a172fc10281b"
            });
            expect(res.statusCode).toBe(201);
        });

        // read message of user who is connected
        it('should return all messages of user how is connected', async () => {
          const res= await request.get("/api/message/read/635fd5a24d82a172fc10281b");
          expect(res.statusCode).toBe(200);
        });

        // read user
        it('should return all users', async () => {
        const res= await request.get("/api/user");
        expect(res.statusCode).toBe(200);
        });
        
        // update user
        it('should return user updated', async () => {
          const res= await request.put("/api/user/update/63ce412a5abd965dafb34630").send({
            isAdmin:true,
            username:"Ben-ci"
          });
          expect(res.statusCode).toBe(200);
          });

        //
        it('should return connexion success', async () => {
          const res= await request.post("/api/auth/login").send({
            email:"cecile@gmail.com",
            password:"ben3030l"
          });
          expect(res.statusCode).toBe(200);
          });

          // create a new user
          it('should return new user created', async () => {
            const res= await request.post("/api/auth/register").send({
              username:"Coach Abel",
              email:"abel@gmail.com",
              password:"abel2023"
            });
            expect(res.statusCode).toBe(200);
            });

  });
  