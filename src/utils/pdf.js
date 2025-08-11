import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

export async function generateQuotePDF(quote, logoUrl){
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const margin = 40
  let y = 40

  // logo
  if(logoUrl){
    try {
      const imgData = await fetch(logoUrl).then(r=>r.blob()).then(b=>new Promise((res,rej)=>{ const fr=new FileReader(); fr.onload=()=>res(fr.result); fr.onerror=rej; fr.readAsDataURL(b); }))
      doc.addImage(imgData, 'PNG', margin, y, 120, 120)
    } catch(e){}
  }

  doc.setFontSize(18)
  doc.text('VeroPest Solutions', margin + 140, y + 30)
  doc.setFontSize(12)
  doc.text('Quote', margin + 140, y + 55)
  y += 140

  doc.setFontSize(11)
  doc.text(`Date: ${new Date(quote.date).toLocaleString()}`, margin, y)
  doc.text(`Prepared by: ${quote.createdByName || ''} (${quote.createdByEmail || ''})`, margin + 300, y)
  y += 20
  doc.text(`Customer: ${quote.customerName || ''}`, margin, y)
  y += 20

  doc.setFontSize(12)
  doc.text('Details:', margin, y); y += 16
  Object.entries(quote.details || {}).forEach(([k,v])=>{
    const line = `${k}: ${v}`
    doc.text(line, margin, y)
    y += 14
    if(y > 720){
      doc.addPage(); y = margin
    }
  })

  y += 8
  doc.setFontSize(14)
  doc.text(`Total: $${(quote.total||0).toFixed(2)}`, margin, y)

  const blob = doc.output('blob')
  return blob
}

export async function downloadPDF(quote, logoUrl){
  const blob = await generateQuotePDF(quote, logoUrl)
  saveAs(blob, `Quote-${quote.id || Date.now()}.pdf`)
  return blob
}
