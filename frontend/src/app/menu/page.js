import React from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './page.module.css';
import MenuItem from '../components/MenuItem';

const MenuPage = () => {
  // Пример данных для товаров
  const menuItems = [
    { imageSrc: '/Menu_image_text/latte.jpg', title: 'Латте' },
    { imageSrc: '/Menu_image_text/cappuccino.jpg', title: 'Капучино' },
    // Добавьте больше товаров
  ];

  return (
    <div className={styles.videoBackground}>
      <VideoContainer src="/video.mp4" />
      <div className={styles.border}>
        <Header />
        <div className={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;