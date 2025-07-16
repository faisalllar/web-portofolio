const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'dist', 'public', 'index.html');
const dest = path.join(__dirname, 'dist', 'public', '404.html');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('404.html created successfully');
} else {
  console.error('index.html not found, 404.html not created');
}
