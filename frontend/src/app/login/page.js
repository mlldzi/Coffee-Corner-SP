'use client'

import React, { useState } from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import useAuthStore from '../services/store';
import { loginUser } from '../services/api'; // Импортируйте функцию loginUser
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      if (response.success) {
        // Сохранение userId в состояние или хранилище
        login({ ...response.user, userId: response.user.userId });
        router.push('/profile');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <VideoContainer src="/ugabuga.mp4" />
      <div className={styles.content}>
        <Header />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.link_button}>
            Войти
          </button>
          <Link href="/register" className={styles.link_button}>
            Регистрация
          </Link>
          <Link href="/" className={styles.link_button}>
          Главная
        </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;