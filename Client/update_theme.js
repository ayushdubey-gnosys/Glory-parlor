const fs = require('fs');
const path = require('path');

const files = [
  'TestimonialsSection.jsx',
  'ServicesSection.jsx',
  'GenderSection.jsx',
  'GallerySection.jsx',
  'Footer.jsx',
  'CTASection.jsx',
  'AboutSection.jsx',
  'HeroSection.jsx'
];

const dir = 'c:\\Users\\HP\\Desktop\\Glory\\Glory\\Glory-parlor\\Client\\src\\components\\home';

const NEW_COLOR = '#C09355'; // Guessed from image

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(/#D68B2A/g, NEW_COLOR); 
    content = content.replace(/font-light/g, 'font-medium');
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${file}`);
  }
});
