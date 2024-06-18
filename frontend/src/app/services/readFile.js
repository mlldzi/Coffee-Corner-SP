import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { filename } = req.query;
  const filePath = path.join(process.cwd(), 'public', 'Menu_image_text', `${filename}.txt`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({ error: 'File not found' });
    } else {
      res.status(200).json({ description: data });
    }
  });
}