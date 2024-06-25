'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {loginUser} from '../services/api';
import Link from 'next/link';
import Header from '../components/Header';
import styles from './login.module.css';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        phone_number: '', password: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {phone_number, password} = formData;

        if (phone_number && password) {
            try {
                const response = await loginUser({phone_number, password});

                if (response && response.success) {
                    Cookies.set('csrf_access_token', response.csrf_access_token);
                    router.push('/profile');
                } else {
                    alert(response && response.msg ? response.msg : 'Неправильный пароль или пользователь не существует');
                }
            } catch (error) {
                alert(error.message || 'Произошла ошибка');
            }
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    };

    
    return (
        <div className={styles.container}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted/>
            </div>
            <div className={styles.content}>
                <Header/>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Номер телефона"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
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