authRouter
- POST /login
- POST /signup
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password     // Forget Password API

ConnectionRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

UserRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed             // 





Status : Ignore, Interested, accepted, rejected