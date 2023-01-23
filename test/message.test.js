
const mongoose=require('mongoose')
const dotenv = require('dotenv');
const server=require('../server')
const request=require('supertest')(server)

dotenv.config()

  describe('POST /api/message/new/635fd5a24d82a172fc10281b', () => {
        it('should return message send  of user how is connected', async () => {
            const res= await request.post("/api/message/new/635fd5a24d82a172fc10281b").send({
              sender:"635fd5a24d82a172fc10281b",
              message:"salut",
              recever:"635fd5a24d82a172fc10281b"
            });
            expect(res.statusCode).toBe(201);
        });

        it('should return all messages of user how is connected', async () => {
          const res= await request.get("/api/message/read/635fd5a24d82a172fc10281b");
          expect(res.statusCode).toBe(200);
      });
        
  });
  