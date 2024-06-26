'use client';

import React from 'react';
import Header from '../components/Header';
import styles from './about.module.css';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <video className={styles.video} src="/video.mp4" autoPlay loop muted />
      </div>
      <div className={styles.content}>
        <Header />
        <div className={styles.aboutContainer}>
          <h2>О нас</h2>
          <p>Хотите чашечку кофе?</p>
          <p>Ждём вас, котики :3</p>
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

export default AboutPage;
