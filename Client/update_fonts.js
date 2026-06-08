const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\HP\\Desktop\\Glory\\Glory\\Glory-parlor\\Client\\src\\components\\home';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  let original = content;
  
  // Update font-light to font-medium
  content = content.replace(/font-light/g, 'font-medium');
  
  // Also update the yellow/orange color if requested previously
  content = content.replace(/#D68B2A/g, '#C09355');

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${file}`);
  }
});

// Update Navbar if it exists
const navbarPath = 'c:\\Users\\HP\\Desktop\\Glory\\Glory\\Glory-parlor\\Client\\src\\components\\Navbar.jsx';
if (fs.existsSync(navbarPath)) {
  let navContent = fs.readFileSync(navbarPath, 'utf8');
  let origNav = navContent;
  navContent = navContent.replace(/font-light/g, 'font-medium');
  navContent = navContent.replace(/#D68B2A/g, '#C09355');
  if (navContent !== origNav) {
    fs.writeFileSync(navbarPath, navContent);
    console.log('Updated Navbar.jsx');
  }
}
