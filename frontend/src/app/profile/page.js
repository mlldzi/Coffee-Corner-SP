'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from '../login/login.module.css';
import Link from 'next/link';
import useAuthStore from '../services/store';
import { getUserProfile, logout, refreshToken } from '../services/api';
import Cookies from 'js-cookie';

const ProfilePage = () => {
    const { user } = useAuthStore();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            if (user) {
                try {
                    const accessToken = Cookies.get('csrf_access_token');
                    if (!accessToken) {
                        await refreshToken();
                    }
                    const profileData = await getUserProfile(accessToken);
                    if (profileData.success) {
                        setProfile(profileData.profile);
                    } else {
                        console.error('Failed to load profile data:', profileData.msg);
                    }
                } catch (error) {
                    console.error('Error loading profile:', error);
                }
            }
        };

        loadProfile();
    }, [user]);

    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <div className={styles.container}>
            <VideoContainer src="/ugabuga.mp4" />
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
                        <h2>Welcome, Guest!</h2>
                    )}
                    <button onClick={handleLogout} className={styles.link_button}>Выйти</button>
                </div>
                <div className={styles.linksContainer}>
                    <Link href="/about" className={styles.link_button}>
                        About Us
                    </Link>
                    <Link href="/location" className={styles.link_button}>
                        Location
                    </Link>
                    <Link href="/" className={styles.link_button}>
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;