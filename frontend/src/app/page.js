'use client'
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import Header from './components/Header';
import VideoContainer from './components/VideoContainer';
import Cookies from 'js-cookie';

export default function Home() {
  const accessToken = Cookies.get('csrf_access_token');

  return (
    <div className={styles.videoBackground}>
      <VideoContainer src="/video.mp4" />
      <div className={styles.border}>
        <Header />
        <div className={styles.buttons}>
          <Link href={accessToken ? '/profile' : '/login'} className={styles.link_button}>
            Профиль
          </Link>
          <Link href="/menu" className={styles.link_button}>
            Меню
          </Link>
          <Link href="/location" className={styles.link_button}>
            Местоположение
          </Link>
          <Link href="/about" className={styles.link_button}>
            О нас
          </Link>
          <Link href="/orders" className={styles.link_button}>
            Заказы
          </Link>
        </div>
      </div>
    </div>
  );
}