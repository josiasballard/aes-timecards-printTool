# AES Timecards Print Tool 🧾

A lightweight, internal web app for converting employee timecard CSVs into clean, printable PDFs, customized for AES (Advanced Electrical Solutions).

## ✅ Features
- Upload a CSV of timecard submissions
- Automatically groups by employee and week (Sun–Sat)
- Totals hours per wage type (Hourly, Overtime, Vacation, Holiday)
- Printable PDF layout per employee
- Designed to match internal AES format

## 📦 Built With
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF + AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- [PapaParse](https://www.papaparse.com/)

## 🚀 Try It Live
[https://josiasballard.github.io/aes-timecards-printTool/](https://josiasballard.github.io/aes-timecards-printTool/)

## 🛠️ Development
```bash
# Clone the repo
git clone https://github.com/josiasballard/aes-timecards-printTool.git
cd aes-timecards-printTool

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
📂 Structure
src/ – App logic and layout

public/ – Static assets

dist/ – Built site for GitHub Pages

🧾 Output Example
Each PDF includes:

Employee name

Week 1 & Week 2 breakdowns (date ranges auto-formatted)

Submission tables with Job #, Contractor, Address, Hours, Wage Type

Total lines and generation timestamp

🧠 Future Ideas
Editable job info from admin panel

Role-based access

Secure uploads for payroll team

Archive + export history

© 2025 Advanced Electrical Solutions | Built by @josiasballard