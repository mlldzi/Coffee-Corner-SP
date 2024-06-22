'use client'
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import Header from './components/Header';
import Cart from './components/Cart';
import VideoContainer from './components/VideoContainer';
import useAuthStore from './services/store';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <div className={styles.videoBackground}>
      <VideoContainer src="/video.mp4" />
      <div className={styles.border}>
        <Header />
        <div className={styles.buttons}>
          <Link href={user ? '/profile' : '/login'} className={styles.link_button}>
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
