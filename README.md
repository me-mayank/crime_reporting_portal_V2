# 🚔 Crime Reporting Portal – Backend API

Backend for the **Crime Reporting Portal**, built with **Node.js, Express, and MongoDB**.  
This API manages **user authentication**, **crime report submissions**, and **admin controls**.

🌐 **Base URL (Production): https://crime-reporting-portal-v2.onrender.com/api

## 🔑 Authentication

- Uses **JWT tokens** for secure access.
- For protected routes, send the token in the headers:
```http
Authorization: Bearer <your_jwt_token>


👤 User Routes
Base URL: /api/user
| Method   | Endpoint    | Description                                       |
| -------- | ----------- | ------------------------------------------------- |
|   POST   |  /register  | Register a new user.                              |
|   POST   |  /login     | Login and receive a JWT token.                    |
|   GET    |  /profile   | Get the logged-in user’s profile (  protected  ). |


📄 Report Routes
Base URL: /api/report
| Method   | Endpoint  | Description                                   |
| -------- | --------- | --------------------------------------------- |
|   POST   |  /create  | Create a new report (  protected  ).          |
|   GET    |  /getall  | Get all reports.                              |
|   GET    |  /search  | Search reports (add filters as query params). |


🛡️ Admin Routes
Base URL: /api/admin
(Admin-only: requires Authorization: Bearer <admin_token>)
| Method     | Endpoint                   | Description                                                                                     |
| ---------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
|   DELETE   |  /user/delete/:userId      | Delete a user by ID.                                                                            |
|   PATCH    |  /user/:userId/promote     | Promote a user to admin.                                                                        |
|   PATCH    |  /user/:userId/demote      | Demote an admin back to user.                                                                   |
|   GET      |  /user/getall              | Get all users with filters & pagination. <br>🔎 Query params: `role`, `gender`, `page`, `limit` |
|   PATCH    |  /report/:reportId/status  | Update the status of a report (`open`, `pending`, `closed`).                                    |



