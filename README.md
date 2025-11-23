# Becoz Rentals

Becoz Rentals is a modern rental house listing platform featuring a clean UI, detailed property pages, filtering system, and an admin panel for managing listings, images, and property details. The project includes a full-stack architecture with a React frontend, Node.js/Express backend, PostgreSQL database, Cloudinary integration, and JWT authentication for admin access.

---

## 🚀 Features

### 🏡 User Features
- Browse available properties with a modern and responsive UI  
- View detailed property pages (images, description, address, features, and pricing)  
- Filter by **rent** or **sell**  
- Contact form powered by Brevo (emails sent directly to admin)

### 🔧 Admin Features
- Login using JWT authentication  
- Create, update, and delete property listings  
- Upload and manage main images + image collections using Cloudinary  
- View user feedback  
- Fully functioning admin panel for managing all listings  

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express  
- PostgreSQL  
- Cloudinary  
- Brevo (email service)  
- JSON Web Tokens (JWT)


## 🗄️ Database Schema

The backend uses PostgreSQL with the following tables:

```sql
CREATE TABLE public.admin
(
  id SERIAL PRIMARY KEY,
  password TEXT
);

CREATE TABLE IF NOT EXISTS public.feedback
(
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  author TEXT NOT NULL,
  posted_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.properties
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  address TEXT NOT NULL,
  features TEXT[] NOT NULL,
  main_img TEXT NOT NULL,
  img_collection TEXT[] NOT NULL,
  posted_at TIMESTAMP DEFAULT now()
);

⚙️ Installation & Setup

Clone the repository and install dependencies for both the frontend and backend:

git clone https://github.com/dawit-yitbarek/becoz.git
cd becoz

📦 Backend Setup
cd backend
npm install

Create a .env file in /backend:

DATABASE_URL=your_database_url
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_brevo_verified_email
BREVO_API_KEY=your_brevo_api_key
BROKER_EMAIL=email_to_receive_contact_messages
PORT=port_number

Run the backend:
node ./src/server.js

💻 Frontend Setup
cd frontend
npm install

Create a .env file in /frontend:

VITE_BACKEND_URL=your_backend_url
VITE_FRONTEND_URL=your_frontend_url

Run the frontend:
npm run dev

🌐 Deployment

The app is deployed at:
https://becoz.vercel.app


📌 Future Improvements

Add property favorites

Add user accounts for normal users

Add pagination

Add map integration (Google Maps or Leaflet)

Improve admin analytics dashboard