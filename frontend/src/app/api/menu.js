import { getMenuData } from '../../services/menu';

export default function handler(req, res) {
  const drinks = getMenuData();
  res.status(200).json(drinks);
}
