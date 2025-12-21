# Resumi

Resumi is a **resume builder web application** that allows users to create, edit, and manage resumes easily. Built with **React**, **Tailwind CSS**, and **Clerk** for authentication. Users can create resumes from scratch or upload existing ones, and all data is saved locally per user.

---

## Features

- **User Authentication**  
  - Sign up and log in with **Google** via Clerk.  
  - Secure session management.

- **Resume Management**  
  - Create new resumes with custom titles.  
  - Edit existing resumes.  
  - Delete resumes with confirmation.  
  - Resume data stored per user in **localStorage**.

- **Resume Sections**  
  - Personal Information: Name, Email, Phone, Location, LinkedIn, Website  
  - Summary / Objective  
  - Experience: Company, Job Title, Duration, Description  
  - Education: School, Degree, Year, GPA  
  - Projects  
  - Skills

- **Responsive UI**  
  - Tailwind CSS for mobile-friendly, modern design  
  - Interactive resume cards with colors and hover effects  
  - Mobile-friendly edit/delete buttons

- **Custom Alerts**  
  - Top-center toast-style alerts for actions like **save, edit, delete**

- **Google Authentication Only**  
  - Users can sign up or log in with **Google OAuth**

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide React icons  
- **Authentication**: Clerk (OAuth with Google)  
- **State & Storage**: React state, localStorage  
- **Routing**: React Router

---

## Project Structure
```text
src/
├─ components/
│  ├─ Header.jsx
│  ├─ Footer.jsx
│  ├─ Logo.jsx
│  ├─  Home/
│  |  ├─ HeroSection.jsx
│  |  ├─ Features.jsx
│  |  ├─ Testimonials.jsx
│  |  └─ CallToAction.jsx
│  ├─ Templates/
│  |  ├─ Classic.jsx
│  |  └─ Modern.jsx
│  ├─  UI/
│  |  ├─ Alert.jsx
│  |  ├─ Input.jsx
│  |  ├─ Repeatable.jsx
|  |  └─ Textarea.jsx
|  └─
├─ pages/
│ ├─ Dashboard.jsx
│ ├─ Login.jsx
│ ├─ Register.jsx
│ └─ ResumeBuilder.jsx
├─ App.jsx
└─ index.jsx
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/axndev/resumi
cd resumi
```
### 2. Install dependencies
```bash 
npm install
```
### 3. Configure Clerk

Sign up at Clerk
 and create a new application

Get your Frontend API key and add it to .env:

```bash
VITE_CLERK_FRONTEND_API=<your_clerk_frontend_api>
```

### 4. Run the app
```bash 
npm run dev
```

Open http://localhost:5173
 in your browser.

### Usage

* Register/Login using Google.

* Create a Resume by clicking the Create Resume button.

* Edit Resume by clicking the pencil icon.

* Delete Resume by clicking the trash icon (confirmation required).

* All resumes are saved per user in the browser’s localStorage.

* Themes and templates for resumes.

### Future Improvements

* Save resumes to a database (Firebase / Supabase)

* Export resumes as PDF

* Add drag-and-drop ordering for sections



### Author

Kaleemullah Ahsan
