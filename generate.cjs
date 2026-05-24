const fs = require('fs');
const pages = ['CreateResume', 'CvTemplates', 'Services', 'Blog', 'Contact', 'FAQ', 'Login', 'Signup', 'Dashboard', 'Checkout', 'NotFound'];
pages.forEach(p => {
    fs.writeFileSync(`src/pages/${p}.jsx`, `import React from 'react';\n\nexport default function ${p}() {\n  return (\n    <div className="min-h-screen py-20 bg-light text-center">\n      <h1 className="text-4xl font-bold text-dark">${p} Page</h1>\n    </div>\n  );\n}\n`);
});
console.log('Pages created!');
