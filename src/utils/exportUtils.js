/**
 * Utility functions for exporting tables and data to CSV, Excel, and PDF.
 */

export function exportToCSV(filename, rows, headers) {
  if (!rows || !rows.length) return;

  const separator = ',';
  const keys = headers ? headers.map(h => h.key) : Object.keys(rows[0]);
  const headerRow = headers ? headers.map(h => `"${h.label}"`).join(separator) : keys.map(k => `"${k}"`).join(separator);

  const csvContent = [
    headerRow,
    ...rows.map(row => 
      keys.map(k => {
        let cell = row[k] === null || row[k] === undefined ? '' : row[k];
        cell = cell.toString().replace(/"/g, '""');
        return `"${cell}"`;
      }).join(separator)
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function printFormattedPDF(title, contentHtml) {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: 'Public Sans', sans-serif; padding: 24px; color: #1f2937; }
          h1 { color: #1b6cb8; border-bottom: 2px solid #1b6cb8; padding-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th { background: #f3f4f6; text-align: left; padding: 10px; border-bottom: 1px solid #d1d5db; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .footer { margin-top: 32px; font-size: 12px; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <h1>${title} - Limitlessli HR</h1>
        <div>${contentHtml}</div>
        <div class="footer">Generated on ${new Date().toLocaleDateString()} • Confidential Limitlessli Documentation</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}
