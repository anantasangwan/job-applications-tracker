# 💼 JobTrack — Job Application Tracker

> **Your job search, organized.** Track applications, monitor hiring progress, and manage follow-ups with a centralized dashboard designed to keep your job hunt structured and on track.


---

## 🌐 Live Demo

🚀 **[Visit Live Demo](https://jobtrackmate.netlify.app/)**

## 💻 GitHub Repository

📂 **[Explore the Source Code](https://github.com/anantasangwan/job-applications-tracker)**

---

## Overview

JobTrack is a React-based web application designed to help job seekers manage their applications from submission to final outcome. It provides a centralized dashboard, application management tools, and follow-up tracking to keep the job search organized.

## Features

### 📊 Dashboard

- **Overview Cards:** Get a quick summary of application statistics.
- **Application Pipeline:** Visualize applications across different hiring stages.
- **Success Rate:** Track the proportion of applications resulting in selection.
- **Recent Activity:** View recently added or updated applications.

### 💼 Application Management

- **Add Applications:** Record company, position, location, status, dates, and notes.
- **Status Filtering:** Filter applications by their current hiring stage.
- **Update Status:** Change application status through an interactive modal.
- **Delete Applications:** Remove application records when no longer needed.

### 📅 Follow-up Management

- **Follow-up Categories:** Separate follow-ups into Overdue, Due Today, Upcoming, and Completed.
- **Completion Tracking:** Mark follow-ups as completed.
- **Rescheduling:** Change follow-up dates and reopen completed follow-ups.
- **Summary Cards:** Get a quick overview of follow-up activity.

### ✅ Validation & Persistence

- Validate required form fields and trim text inputs.
- Prevent follow-up dates from being earlier than application dates.
- Persist application records using browser `localStorage`.
- Retain saved data between visits in the same browser.

## Tech Stack

| Technology          | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `React`             | UI development and component-based architecture |
| `JavaScript (ES6+)` | Application logic                               |
| `React Router`      | Client-side navigation                          |
| `Tailwind CSS v4`   | Styling and responsive layouts                  |
| `React Hook Form`   | Form handling and validation                    |
| `Vite`              | Development server and build tooling            |
| `localStorage`      | Client-side data persistence                    |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/anantasangwan/job-applications-tracker.git
```

**2. Navigate to the project directory**

```bash
cd job-applications-tracker
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the local URL** shown in your terminal.

## Project Structure

```text
    src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Dashboard.jsx
        ├── OverviewCards.jsx
        ├── ApplicationPipeline.jsx
        ├── Activities.jsx
        ├── Applications.jsx
        ├── AppliTable.jsx
        ├── AddApplication.jsx
        ├── FollowUps.jsx
        ├── FollowupTable.jsx
        ├── StatusUpdateModal.jsx
        ├── RescheduleModal.jsx
        ├── Left.jsx
        ├── Quote.jsx
        ├── SummaryCard.jsx
        └── Navbar.jsx
```

## Data Storage

JobTrack currently uses browser `localStorage` to save application records.

- Data persists between visits in the same browser.
- Data is not synchronized across devices or users.
- Clearing the browser's site data may remove saved records.

## Future Improvements

- Backend integration and user authentication
- Application search and sorting
- Data export and backup

---

**Built with React and Tailwind CSS.**
