'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from '../login/login.module.css';
import Link from 'next/link';
import useAuthStore from '../services/store';
import { getUserProfile } from '../services/api'; // Импортируйте функцию getUserProfile

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user && user.userId) {
        try {
          const profileData = await getUserProfile(user.userId);
          setProfile(profileData);
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      }
    };

    loadProfile();
  }, [user]);

  const handleLogout = () => {
    logout();
    // Перенаправление на страницу входа после выхода
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
              <h2>Welcome, {profile.username}!</h2>
              <p className={styles.profileField}>Email: {profile.email}</p>
              <p className={styles.profileField}>Full Name: {profile.fullName}</p>
              <p className={styles.profileField}>Bonus Points: {profile.bonusPoints}</p>
              <p className={styles.profileField}>Phone Number: {profile.phoneNumber}</p>
              <p className={styles.profileField}>Address: {profile.address}</p>
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