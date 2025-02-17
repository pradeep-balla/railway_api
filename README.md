# IRCTC Railway Management API

This is my implementation of the **IRCTC Railway Management API**, developed as part of the given task. The goal was to create a system where users can **check train availability, book seats, and view their bookings**, while admins can **add trains and update seat availability**. I’ve built this using **Node.js**, **Express.js**, and **MySQL**.

---

## Technologies I Used

- **Backend Framework:** Node.js with Express.js  
- **Database:** MySQL (to store trains, users, and bookings)  
- **Authentication:** JSON Web Tokens (JWT) for user login  
- **API Testing:** Postman (to test all endpoints)  
- **Version Control:** Git and GitHub (to manage and share my code)  

---

##  What I Built

The system has two types of users:  
1. **Regular Users**: They can register, log in, check train availability, book seats, and view their booking details.  
2. **Admins**: They can add new trains and update seat availability for existing trains.  

I also handled **race conditions** (when multiple users try to book the same seat at the same time) so that only one user can successfully book a seat.

---

## How to Set It Up

### 1 Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc_db
JWT_SECRET=your_jwt_secret
API_KEY=your_admin_api_key
```

### 2 Install Dependencies
Clone the repository and install the required packages:
```bash
git clone https://github.com/ujjawalkumar131/IRCTC_API_WorkIndia.git
cd irctc-railway-management
npm install
```

### 3 Set Up MySQL Database
Run the following SQL commands to create the database and necessary tables:
```sql
CREATE DATABASE irctc_db;
USE irctc_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    train_number VARCHAR(50) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    train_id INT,
    seats INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

### 4 Start the Server
Run the following command to start the server:
```bash
npm start
```
The API will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## API Endpoints

### 🔹 User Routes
| Action           | Method | Endpoint                                             | Auth Required |
| ---------------- | ------ | ---------------------------------------------------- | ------------- |
| **Register**     | `POST` | `/user/register`                                     | ❌             |
| **Login**        | `POST` | `/user/login`                                        | ❌             |
| **Check Trains** | `GET`  | `/user/availability?source=Ranchi&destination=Delhi` | ❌             |
| **Book Seats**   | `POST` | `/user/book`                                         | ✅ JWT         |
| **Get Bookings** | `GET`  | `/user/getAllbookings`                               | ✅ JWT         |

### Admin Routes
| Action           | Method | Endpoint                  | Auth Required |
| ---------------- | ------ | ------------------------- | ------------- |
| **Add Train**    | `POST` | `/admin/addTrain`         | ✅ API Key     |
| **Update Seats** | `PUT`  | `/admin/update-seats/:id` | ✅ API Key     | 

---
