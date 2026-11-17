const fs = require('fs');
const path = require('path');

// Build a minimal valid PDF with correct byte offsets for the xref table.
// Using Buffer to guarantee exact byte representation (no CRLF conversion issues).

const streamContent = 'BT /F1 24 Tf 100 700 Td (Mithun Appuhamy - CV Placeholder) Tj ET\nBT /F1 14 Tf 100 670 Td (Replace this file with your real CV.) Tj ET';

let parts = [];
const offsets = {};
let pos = 0;

function add(str) {
    const buf = Buffer.from(str, 'latin1');
    parts.push(buf);
    const start = pos;
    pos += buf.length;
    return start;
}

add('%PDF-1.4\n');

offsets[1] = add('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
offsets[2] = add('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
offsets[3] = add('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n');

const streamObj = '4 0 obj\n<< /Length ' + streamContent.length + ' >>\nstream\n' + streamContent + '\nendstream\nendobj\n';
offsets[4] = add(streamObj);

offsets[5] = add('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

const xrefOffset = pos;
add('xref\n0 6\n');
add('0000000000 65535 f \n');
for (let i = 1; i <= 5; i++) {
    add(String(offsets[i]).padStart(10, '0') + ' 00000 n \n');
}

add('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefOffset + '\n%%EOF');

const outPath = path.join(__dirname, '..', 'public', 'cv', 'mithun-appuhamy-cv.pdf');
fs.writeFileSync(outPath, Buffer.concat(parts));
console.log('PDF written to: ' + outPath);
console.log('File size: ' + Buffer.concat(parts).length + ' bytes');
