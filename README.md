# CivicTrack – Smart Civic Issue Reporting & Management System

CivicTrack is a web-based civic issue management platform that connects citizens, government officers, and administrators to make civic complaint reporting and resolution more transparent, accessible, and efficient.

Citizens can report civic problems with images and location details, track complaint status, and receive updates. Officers can manage assigned complaints, update their status, and use AI-powered suggestions to support decision-making.

## 🚀 Key Features

### 👤 Citizen Module
- Citizen registration and login.
- Report civic issues with descriptions and images.
- Location-based complaint reporting.
- Track complaints using a unique Complaint ID.
- View complaint status and updates.
- Hindi and English language support.

### 🏢 Officer Module
- Secure officer login.
- View complaints assigned according to department/category.
- View complaint descriptions, images, and location details.
- Update complaint status.
- AI-powered suggestions for complaint assessment.
- Officer profile management with profile image.

### 🛡️ Admin Module
- Admin dashboard.
- Create new officer accounts.
- Edit and delete officer details.
- Manage officers and their assigned departments.

### 🤖 AI-Powered Assistance
- AI-generated complaint summaries.
- Priority and urgency suggestions.
- Impact assessment.
- Recommended actions for officers.

### 🗺️ Location-Based Features
- Map-based civic issue visualization.
- Complaint location details for better identification.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Image Storage | Cloudinary |
| AI Integration | Google Gemini API |
| API Testing | Bruno |
| Version Control | Git & GitHub |

## 📁 Project Structure

CiviTrack/
│
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── Admin/
│       ├── components/
│       ├── pages/
│       └── locales/
│
└── README.md

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Tanuu18/CiviTrack.git
cd CiviTrack
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Start the backend:

```bash
node server.js
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

*Note: Configure the frontend API base URL to point to your running backend.*

## 🔐 Environment Variables

- Never commit `.env` files or API keys to GitHub.
- Keep your database credentials and secret keys private.
- Use your own Cloudinary and Gemini credentials.

## 🛣️ Future Enhancements

- Smart Issue Clustering to identify multiple complaints about the same civic issue.
- Predictive Civic Analytics to identify recurring problem areas.
- Complaint resolution verification.
- Advanced analytics dashboard.

## 🎯 Project Goal

Our goal is to build a transparent and accessible civic issue management platform that improves communication between citizens and authorities and helps make civic issue resolution more efficient.

## 👩‍💻 Development

CivicTrack is an evolving project. New features, improvements, and optimizations will be added as development progresses.

**Built with ❤️ to make cities better.**
