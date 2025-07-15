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
https://josiasballard.github.io/aes-timecards-printTool/

## 🛠️ Development

Clone the repo:  
`git clone https://github.com/josiasballard/aes-timecards-printTool.git`  
`cd aes-timecards-printTool`

Install dependencies:  
`npm install`

Run dev server:  
`npm run dev`

Build for production:  
`npm run build`

Deploy to GitHub Pages:  
`npm run deploy`

## 📂 Project Structure
aes-timecards-printTool/
├── src/       # App logic and layout
├── public/    # Static assets
└── dist/      # Built site for GitHub Pages


## 🧾 PDF Output Example

Each employee's PDF includes:
- Name and timestamp
- Week 1 & Week 2 breakdowns with date ranges
- Submission tables with Job #, Contractor, Address, Hours, and Wage Type
- Totals for each wage type

## 🧠 Future Ideas
- Admin-editable job information
- Role-based access control
- Secure uploads for the payroll team
- Export and archive submission history

---

© 2025 Advanced Electrical Solutions | Built by [@josiasballard](https://github.com/josiasballard)
