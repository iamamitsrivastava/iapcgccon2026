# 🏥 IAPSMGC CON 2026 — Official Conference Website

Official website for **IAPSMGC CON 2026**, the Annual State Conference of the **Indian Association of Preventive & Social Medicine (IAPSM) — Gujarat Chapter**, hosted by the **Department of Community Medicine, Parul Institute of Medical Sciences & Research (PIMSR), Parul University, Vadodara**.

🌐 **Live Website:**  
https://iapsmgccon2026.paruluniversity.ac.in/

---

## 📌 About the Conference

**IAPSMGC CON 2026** brings together public health professionals, community medicine experts, researchers, policymakers, academicians, and students to exchange knowledge, present research, and discuss innovations in public health.

### Conference Theme

> **Digital Health for All: Bridging Equity, Access and Innovation**

### 📅 Important Dates

- **Pre-Conference:** 26 November 2026
- **Main Conference:** 27–28 November 2026
- **Venue:** PIMSR, Parul University, Vadodara, Gujarat

---

## ✨ Website Features

The website provides an end-to-end digital platform for managing and accessing conference-related information.

### 📝 Conference Registration

- Online participant registration
- Multiple registration categories
- Unique registration/access code validation
- Registration number lookup
- Payment information collection
- Payment proof submission
- Registration confirmation workflow

### 📄 Scientific Submissions

- Online Abstract Submission
- Full Paper Submission
- PDF/document upload
- Google Drive integration for submitted documents
- Google Sheets integration for maintaining submission records
- Registration number validation
- Submission confirmation

### 📧 Email Automation

The platform supports automated email communication for important conference workflows such as:

- Registration confirmation
- Access-code related communication
- Submission acknowledgement
- Conference-related notifications

### 📚 Conference Information

Participants can access:

- About the Conference
- Conference Themes & Sub-themes
- Organising Committee
- Patrons & Office Bearers
- Scientific Programme
- Submission Guidelines
- Registration Information
- Awards
- Venue Information
- Explore Vadodara
- Contact & Support Information

---

## 🔬 Scientific Themes

IAPSMGC CON 2026 covers major areas of contemporary public health and community medicine, including:

1. Digital Health & Telemedicine
2. NCD Prevention & Management
3. Climate Change & Environmental Health
4. Maternal, Child & Adolescent Health
5. Medical Education & CBME
6. AI in Healthcare & Public Health Surveillance
7. Health Policy & Universal Health Coverage
8. Epidemiology & One Health
9. Research Methodology & Innovation
10. SDGs, Health Equity & Geriatric Medicine

---

## 🏆 Conference Awards

The conference recognises outstanding academic and research contributions through awards including:

- **Best Oral Paper Presentation**
- **Best Poster Award**
- **Shri H.M. Patel Trophy for Young Scientist**

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React.js
- TypeScript
- Modern responsive CSS/UI components

### Backend & Integrations

- Next.js API Routes
- Node.js
- Google Apps Script
- Google Sheets
- Google Drive
- Email/SMTP Integration

### Deployment

- Vercel
- Custom Parul University domain

---

## 🏗️ Project Structure

```text
iapsmgccon2026/
│
├── app/                    # Next.js application routes
│   ├── api/                # Backend API routes
│   ├── committee/          # Committee pages
│   ├── program/            # Scientific programme
│   ├── registration/       # Registration system
│   └── resources/          # Conference resources
│
├── components/             # Reusable React components
│   └── sections/           # Website sections
│
├── data/                   # Conference data/configuration
├── lib/                    # Services and utilities
├── public/                 # Images, PDFs and static resources
├── types/                  # TypeScript definitions
│
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Enter the project directory

```bash
cd iapsmgccon2026
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

Add the required environment variables for services such as email/SMTP and other backend integrations.

> Never commit passwords, SMTP credentials, API keys, App Passwords, or other secrets to GitHub.

### 5. Start the development server

```bash
npm run dev
```

The development server will normally be available at:

```text
http://localhost:3000
```

### 6. Production build

```bash
npm run build
```

Then run:

```bash
npm start
```

---

## ☁️ Deployment

The production application is deployed using **Vercel** and mapped to the official Parul University subdomain.

**Production Website:**

https://iapsmgccon2026.paruluniversity.ac.in/

Production deployments should be tested for:

- Registration submission
- Abstract submission
- Full paper submission
- File uploads
- Google Drive integration
- Google Sheets integration
- Email delivery
- Environment variables

---

## 🔐 Security

Sensitive credentials must be stored using environment variables and should never be exposed in frontend code or committed to the repository.

Examples include:

```env
SMTP_USER=
SMTP_PASS=
```

The `.env.local` file should remain excluded through `.gitignore`.

---

## 🏛️ Organised By

**Department of Community Medicine**  
**Parul Institute of Medical Sciences & Research (PIMSR)**  
**Parul University**  
Vadodara, Gujarat, India

In association with the **Indian Association of Preventive & Social Medicine (IAPSM) — Gujarat Chapter**.

---

## 📞 Conference Support

For official conference-related queries:

**Email:** iapsmgc.conference@paruluniversity.ac.in

---

## 👨‍💻 Designed & Developed By

**Amit Srivastava**

Developed as the official digital platform for **IAPSMGC CON 2026**.

---

## 🌐 Live Website

### https://iapsmgccon2026.paruluniversity.ac.in/

---

© 2026 Parul University. All Rights Reserved.
