'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './profile.module.css'; // исправлено имя файла стилей
import Link from 'next/link';
import { getUserProfile, logout } from '../services/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const loadProfile = async () => {
            const accessToken = Cookies.get('csrf_access_token');
            if (!accessToken) {
                router.push('/login');
                return;
            }

            try {
                const profileData = await getUserProfile(accessToken);
                if (profileData.success) {
                    setProfile(profileData.profile);
                } else {
                    console.error('Ошибка загрузки данных:', profileData.msg);
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
                <video className={styles.video} src="/video.mp4" autoPlay loop muted />
            </div>
            <div className={styles.content}>
                <Header />
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
                    <button onClick={handleLogout} className={styles.link_button}>
                        Выйти
                    </button>
                </div>
                <div className={styles.linksContainer}>
                    <Link href="/about" className={styles.link_button}>
                        О нас
                    </Link>
                    <Link href="/menu" className={styles.link_button}>
                        Меню
                    </Link>
                    <Link href="/orders" className={styles.link_button}>
                        История заказов
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
