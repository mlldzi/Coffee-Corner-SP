'use client';

import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import styles from './profile.module.css';
import Link from 'next/link';
import {getUserProfile, logout, checkAndRefreshToken} from '../services/api';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const accessToken = await checkAndRefreshToken();
                const profileData = await getUserProfile(accessToken);
                if (profileData.success) {
                    setProfile(profileData.profile);
                } else {
                    console.error('Ошибка загрузки профиля:', profileData.msg);
                }
            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
            }
        };

        loadProfile();
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted/>
            </div>
            <div className={styles.content}>
                <Header/>
                <div className={styles.profileContainer}>
                    {profile ? (
                        <>
                            <h2>Привет, {profile.full_name}!</h2>
                            <p className={styles.profileField}>Номер телефона: {profile.phone_number}</p>
                            <p className={styles.profileField}>Бонусные баллы: {profile.bonus_points}</p>
                        </>
                    ) : (
                        <h2>Загрузка...</h2>
                    )}
                </div>
                <div className={styles.linksContainer}>
                    <button onClick={handleLogout} className={styles.link_button}>
                        Выйти
                    </button>
                    <Link href="/menu" className={styles.link_button}>
                        Меню
                    </Link>
                    <Link href="/history" className={styles.link_button}>
                        История заказов
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
