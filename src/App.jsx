import { useState } from 'react'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function App() {
  const [csvData, setCsvData] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => setCsvData(results.data)
    })
  }

  const handleGenerate = () => {
    if (!csvData) return alert("Please upload a CSV file first.")

    const grouped = {}
    const roundToQuarter = (num) => Math.round(num * 4) / 4
    const parseDate = (str) => {
      const d = new Date(str)
      return isNaN(d.getTime()) ? null : d
    }

    const allDates = csvData
      .map(row => parseDate(row["Date"]))
      .filter(Boolean)
    if (allDates.length === 0) return alert("No valid dates found.")

    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
    const week1Start = new Date(minDate)
    week1Start.setDate(week1Start.getDate() - week1Start.getDay())
    const week1End = new Date(week1Start)
    week1End.setDate(week1Start.getDate() + 6)
    const week2Start = new Date(week1End)
    week2Start.setDate(week2Start.getDate() + 1)
    const week2End = new Date(week2Start)
    week2End.setDate(week2Start.getDate() + 6)

    csvData.forEach(row => {
      const name = row["Name"]
      const date = parseDate(row["Date"])
      if (!name || !date) return
      const week =
        date >= week1Start && date <= week1End ? "week1" :
        date >= week2Start && date <= week2End ? "week2" : null

      if (!grouped[name]) grouped[name] = { week1: [], week2: [] }

      if (week) {
        grouped[name][week].push({
          ...row,
          Date: date.toISOString().split("T")[0],
          Hours: roundToQuarter(parseFloat(row["Hours Worked"]) || 0)
        })
      }
    })

    Object.keys(grouped).forEach(name => {
      if (!grouped[name].week1.length) {
        grouped[name].week1.push({
          Date: week1Start.toISOString().split("T")[0],
          Contractor: "Shop",
          "Job #": "000",
          Address: "Shop",
          "Wage Type": "Hourly",
          Hours: 0
        })
      }
      if (!grouped[name].week2.length) {
        grouped[name].week2.push({
          Date: week2Start.toISOString().split("T")[0],
          Contractor: "Shop",
          "Job #": "000",
          Address: "Shop",
          "Wage Type": "Hourly",
          Hours: 0
        })
      }
    })

    const sortedNames = Object.keys(grouped).sort((a, b) => {
      const lastA = a.split(" ").slice(-1)[0]
      const lastB = b.split(" ").slice(-1)[0]
      return lastA.localeCompare(lastB)
    })

    const doc = new jsPDF({ orientation: 'landscape' })
    const wageTypes = ["Hourly", "Overtime", "Vacation", "Holiday", "Paternity"]
    const timestamp = new Date().toLocaleString()

    sortedNames.forEach((name, idx) => {
      const weeks = grouped[name]
      if (!weeks) return
      if (idx !== 0) doc.addPage()

      let cursorY = 16
      doc.setFontSize(14)
      doc.text(`Employee: ${name}`, 14, cursorY)
      cursorY += 8

      const weekKeys = ["week1", "week2"]
      weekKeys.forEach((weekKey, i) => {
        const entries = Array.isArray(weeks[weekKey]) ? weeks[weekKey] : []
        const start = i === 0 ? week1Start : week2Start
        const end = i === 0 ? week1End : week2End
        const weekRange = `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`

        doc.setFontSize(12)
        doc.text(`Week ${i + 1}: ${weekRange}`, 14, cursorY)
        cursorY += 4

        const rows = []
        const totals = { Total: 0 }
        wageTypes.forEach(type => totals[type] = 0)

        entries.forEach(entry => {
          const hours = entry.Hours
          const type = entry["Wage Type"]
          rows.push([
            entry["Date"],
            entry["Contractor"],
            entry["Job #"],
            entry["Address"],
            type,
            `${hours.toFixed(2)} hrs`
          ])
          totals.Total += hours
          if (wageTypes.includes(type)) totals[type] += hours
        })

        autoTable(doc, {
          startY: cursorY,
          head: [["Date", "Contractor", "Job #", "Address", "Wage Type", "Hours"]],
          body: rows,
          styles: {
            fontSize: 10,
            cellPadding: 3,
            overflow: 'linebreak'
          },
          columnStyles: {
            1: { cellWidth: 50 },
            3: { cellWidth: 65 }
          },
          theme: 'grid'
        })

        const afterTableY = doc.lastAutoTable.finalY + 6

        const summaryLines = [`Week ${i + 1} Totals:`]
        wageTypes.forEach(type => {
          if (totals[type] > 0) summaryLines.push(`${type}: ${totals[type].toFixed(2)} hrs`)
        })
        summaryLines.push(`Total: ${totals.Total.toFixed(2)} hrs`)

        const lineHeight = 6
        const requiredHeight = summaryLines.length * lineHeight
        const pageHeight = doc.internal.pageSize.height
        let summaryY = afterTableY

        if (summaryY + requiredHeight > pageHeight - 20) {
          doc.addPage()
          summaryY = 16
        }

        doc.setFontSize(10)
        doc.text(summaryLines, 14, summaryY)
        cursorY = summaryY + requiredHeight + 8
      })

      doc.setFontSize(8)
      doc.text(`Generated on: ${timestamp}`, 280, 205, { align: 'right' })
    })

    doc.save("timecards.pdf")
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">AES Timecard Tool</h1>
        <p className="mb-4">Upload a CSV file of employee timecard submissions and generate a downloadable PDF summary.</p>

        <div className="border border-dashed border-gray-400 p-6 rounded-lg bg-white shadow no-print">
          <input type="file" accept=".csv" className="mb-4" onChange={handleFileUpload} />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleGenerate}
          >Download Timecards PDF</button>
        </div>
      </div>
    </div>
  )
}

export default App
