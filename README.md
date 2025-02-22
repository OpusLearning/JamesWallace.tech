# JamesWallace.tech

Welcome to **JamesWallace.tech** – a cutting-edge portfolio and trading platform that showcases my projects, experience, and technical expertise. This project seamlessly integrates modern UI design, CI/CD best practices, and AI-driven features to create a polished, production-ready application.

----

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [CI/CD & Deployment](#cicd--deployment)
- [Domain & SSL Configuration](#domain--ssl-configuration)
- [Contributing](#contributing)
- [Licence](#licence)
- [Contact](#contact)

---

## Overview

**JamesWallace.tech** is not just a portfolio – it’s my main trading platform. Built with a monolithic architecture for simplicity and rapid iteration, the project features a modern, responsive UI, an interactive trading dashboard, and a lightweight AI assistant powered by Hugging Face models. The site is designed to stand out both in design and function, leveraging contemporary web technologies and cloud infrastructure.

---

## Quick Start

### Hosted Application

- **Visit:** [https://jameswallace.tech](https://jameswallace.tech)

### Test Account Credentials

To get started quickly, use the following test credentials:
- **Username:** `testuser@example.com`
- **Password:** `Test@1234`

### Local Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:OpusLearning/JamesWallace.tech.git
   cd JamesWallace.tech
Set up the front end:

bash
Copy
cd frontend
npm install
npm run dev
Set up the back end:

bash
Copy
cd ../backend
npm install
npm start  # or use PM2 for production
Features
Stunning Visual Design:
A full-screen hero section, dynamic interactive elements, and a responsive layout that adapts seamlessly across devices.

Trading Dashboard:
Manage orders, invoices, and referrals with a clean, intuitive interface.

AI Assistant:
An integrated chatbot powered by a Hugging Face model that answers queries, provides summaries, and enhances user engagement.

Advanced Search, Filter, & Sorting:
Quickly locate projects or trading data with built-in search and customisable filtering options.

CI/CD Pipeline:
Automated build, test, and deployment workflows using GitHub Actions ensure every change is smoothly integrated and deployed.

Secure & Scalable:
Deployed on a cost-effective server (e.g., cx22 plan) with SSL (via Let’s Encrypt) and robust domain configuration through Namecheap.

Technical Stack
Frontend:

Framework: React with Vite
Styling: Tailwind CSS / Bootstrap (customised for a unique look)
Deployment: Static files served via Nginx
Backend:

Framework: Node.js with Express
Process Management: PM2
Cloud Integration: Google Cloud Console for backend management and order tracking
AI Integration:

Provider: Hugging Face API (e.g. DialoGPT or GPT-2/3 variants)
CI/CD:

Tool: GitHub Actions
Hosting & Domain:

Server: Lightweight VPS (e.g., cx22 plan)
Domain Provider: Namecheap
SSL: Certbot (Let's Encrypt)
CI/CD & Deployment
This project utilises GitHub Actions for continuous integration and deployment:

Build & Test:
Automated workflows run tests and build your frontend and backend on each commit or pull request.

Deployment:
When code is merged into the main branch, a deployment workflow triggers:

The frontend is built and deployed (static files copied to your server and served via Nginx).
The backend is updated and restarted using PM2.
Secrets & Environment Variables:
All sensitive information (SSH keys, API tokens, etc.) is securely stored in GitHub Secrets.

For details, refer to the workflow YAML files in .github/workflows/.

Domain & SSL Configuration
Domain Setup:
The domain jameswallace.tech is managed via Namecheap. DNS A-records point to our server’s IP address.

SSL:
SSL certificates are obtained using Certbot with Nginx. To set up SSL, run:

bash
Copy
sudo certbot --nginx -d jameswallace.tech -d www.jameswallace.tech
This ensures all traffic is encrypted and secure.

Contributing
I welcome contributions to this project. If you’d like to help improve the platform, please:

Fork the repository.
Create a feature branch.
Commit your changes with clear messages.
Submit a pull request.
Before contributing, please read the CONTRIBUTING.md guidelines (to be created).

Licence
This project is licensed under the MIT Licence.

Contact
For questions or feedback, feel free to reach out:

************************************888

Added git hhub actions 
