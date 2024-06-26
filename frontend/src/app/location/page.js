'use client';

import React from 'react';
import Header from '../components/Header';
import styles from './location.module.css';
import Link from 'next/link';

const LocationPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <video className={styles.video} src="/video.mp4" autoPlay loop muted />
      </div>
      <div className={styles.content}>
        <Header />
        <div className={styles.locationContainer}>
          <h2>Наше местоположение</h2>
          <p>Мы находимся по адресу:</p>
          <p>ул. Примерная, д. 123, Владивосток, Россия</p>
          <p>Контактный телефон: +7 999 057 95 75</p>
        </div>
        <div className={styles.linksContainer}>
          <Link href="/" className={styles.link_button}>
            Главная
          </Link>
          <Link href="/profile" className={styles.link_button}>
            Профиль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
