'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {registerUser} from '../services/api';
import Link from 'next/link';
import Header from '../components/Header';
import styles from '../login/login.module.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        password: '',
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
        const {full_name, phone_number, password} = formData;

        if (full_name && phone_number && password) {
            try {
                const response = await registerUser({full_name, phone_number, password});
                if (response && response.success) {
                    router.push('/profile');
                } else {
                    alert(response && response.msg ? response.msg : 'Ошибка регистрации');
                }
            } catch (error) {
                alert(error.message || 'Произошла ошибка при регистрации');
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
                        name="full_name"
                        placeholder="Полное имя"
                        value={formData.full_name}
                        onChange={handleChange}
                        className={styles.input}
                    />
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
                        Регистрация
                    </button>
                    <Link href="/" className={styles.link_button}>
                        Главная
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;