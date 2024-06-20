"use client";

import React from 'react';
import styles from './menu.module.css';
import MenuItem from '../components/MenuItem';
import VideoContainer from '../components/VideoContainer';
import Header from '../components/Header';

const menuItems = [
  { name: 'айс-кофе', image: 'айс-кофе.jpg', description: 'айс-кофе.txt' },
  { name: 'айс-латте', image: 'айс-латте.jpg', description: 'айс-латте.txt' },
  { name: 'американо', image: 'американо.jpg', description: 'американо.txt' },
  { name: 'аффогато', image: 'аффогато.jpg', description: 'аффогато.txt' },
  { name: 'бамбл', image: 'бамбл.jpg', description: 'бамбл.txt' },
  { name: 'бомбон', image: 'бомбон.jpg', description: 'бомбон.txt' },
  { name: 'доппио', image: 'доппио.jpg', description: 'доппио.txt' },
  { name: 'капучино', image: 'капучино.jpg', description: 'капучино.txt' },
  { name: 'латте', image: 'латте.jpg', description: 'латте.txt' },
  { name: 'лунго', image: 'лунго.jpg', description: 'лунго.txt' },
  { name: 'моккачино', image: 'моккачино.jpg', description: 'моккачино.txt' },
  { name: 'раф', image: 'раф.jpg', description: 'раф.txt' },
  { name: 'ристретто', image: 'ристретто.jpg', description: 'ристретто.txt' },
  { name: 'флет уайт', image: 'флет уайт.jpg', description: 'флет уайт.txt' },
  { name: 'фраппучино', image: 'фраппучино.jpg', description: 'фраппучино.txt' },
  { name: 'эспрессо-тоник', image: 'эспрессо-тоник.jpg', description: 'эспрессо-тоник.txt' },
  { name: 'эспрессо', image: 'эспрессо.jpg', description: 'эспрессо.txt' },
];

const Menu = () => {
  return (
    <div className={styles.videoBackground}>
      <VideoContainer src="/video.mp4" />
      <div className={styles.container}>
        <Header />
        <div className={styles.menu}>
          {menuItems.map(item => (
            <MenuItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Menu;
