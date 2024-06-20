import fs from 'fs';
import path from 'path';

export function getMenuData() {
  const menuDir = path.resolve('./public/menu');
  const files = fs.readdirSync(menuDir);

  const drinks = files.reduce((acc, file) => {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    if (!acc[name]) acc[name] = {};
    if (ext === '.jpg') {
      acc[name].image = `/menu/${file}`;
    } else if (ext === '.txt') {
      acc[name].description = fs.readFileSync(path.join(menuDir, file), 'utf8');
    }
    return acc;
  }, {});

  return Object.values(drinks);
}
