# 🛡️ CrowdSense.ai — Predictive Crowd Intelligence System

**CrowdSense.ai** is an advanced, AI-powered crowd monitoring and management platform designed to prevent incidents before they occur. It provides real-time crowd density tracking, visualizes live data on interactive maps, and utilizes predictive forecasting to alert authorities about potential bottlenecks and surges up to 15 minutes in advance.

Built as a sleek, modern personal project, CrowdSense.ai aims to empower both **event administrators** and the **general public** with absolute awareness and control over massive crowds in real-time.

---

## 🌟 Key Features

CrowdSense.ai offers two distinct portals tailored to different users:

### 1. 👮 Admin Command Center
The ultimate nerve center for security personnel and event managers.
- **Real-Time Density Heatmaps:** Instantly see which zones are safe, busy, crowded, or at a critical "Avoid" status.
- **LSTM Surge Prediction:** AI analyzes live inflow data to predict future crowd surges up to 15 minutes before they happen.
- **Incident Alert Console:** A live feed of AI-generated alerts ranging from low-priority warnings to high-priority emergency interventions.
- **Resource Allocation:** Track the deployment of security officers and emergency medical teams across the map.

### 2. 👥 Public Watch Portal
A transparent, mobile-friendly dashboard designed to keep event attendees safe.
- **Interactive Live Maps:** Visual geographical load with real-time zone color-coding, so attendees know which areas to avoid.
- **Safety Guidelines:** Detailed Do's and Don'ts regarding crowd behavior, emergency evacuations, and general safety.
- **Emergency Contacts:** Quick access to police, ambulance, and medical center hotlines, complete with immediate step-by-step procedures.

---

## 💻 Tech Stack

This project was built with a modern, high-performance web stack focusing on exceptional UI/UX:
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React](https://reactjs.org/)
- **Mapping:** [Leaflet.js](https://leafletjs.com/) via `react-leaflet` to render custom, interactive venue maps.
- **Icons:** [Lucide React](https://lucide.dev/) for a crisp, minimalistic visual identity.
- **Data Visualization:** [Recharts](https://recharts.org/) for rendering the predictive analytics graphs.
- **Styling:** Custom CSS and modern glassmorphic design principles using a refined Light Theme.
- **Mock Data & Simulation:** Custom React hooks (`useInterval`, `useCountUp`) simulate continuous flowing real-time telemetry from AI-based cameras.

*(Note: The AI models, YOLOv8 for object counting and LSTM for sequence forecasting, are assumed backend concepts that the UI dynamically visualizes).*

---

## 🚀 Getting Started

If you want to run this application locally, follow these simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository (if applicable):**
   ```bash
   git clone https://github.com/your-username/CrowdSense.ai.git
   cd CrowdSense.ai
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open your browser and navigate to `http://localhost:3000`. 
   
   - You can log in using the **Admin** demo account to view the Command Center.
   - You can log in using the **Public User** demo account to view the Public Watch portal.

---

## 🎨 Design Philosophy

Great software shouldn't just be functional; it should be intuitive and beautiful. The UI was fully reimagined from the ground up to feature:
- A pristine, premium light mode aesthetic.
- Staggered, smooth CSS animations and subtle glowing pulses.
- Bento Grid layouts to beautifully compartmentalize complex data streams.
- Interactive hover states and high-quality iconography to improve accessibility and user experience.

---

## 📝 About

This project was built as a personal portfolio project by Akash Vishwakarma. Feel free to explore the code, fork it, and modify it for your own learning purposes!
