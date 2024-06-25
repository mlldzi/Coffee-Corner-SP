'use client';

import React, {useState} from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './login.module.css';
import {useRouter} from 'next/navigation';
import {loginUser} from '../services/api';
import Link from 'next/link';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({phone_number, password});
            if (response.success) {
                Cookies.set('csrf_access_token', response.access_token);
                router.push('/profile');
            } else {
                alert('Invalid credentials or missing user data');
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted />
            </div>
            <div className={styles.content}>
                <Header/>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Номер телефона"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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