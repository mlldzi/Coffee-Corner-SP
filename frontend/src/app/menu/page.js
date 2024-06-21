'use client';

import React, { useEffect, useState } from 'react';
import styles from './menu.module.css';
import MenuItem from '../components/MenuItem';
import VideoContainer from '../components/VideoContainer';
import Header from '../components/Header';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/menu/menuItems.json')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => console.error('Error loading menu items:', error));
  }, []);

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
