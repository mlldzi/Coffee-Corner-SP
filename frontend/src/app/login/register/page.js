'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';
import VideoContainer from '../../components/VideoContainer';
import styles from '../login.module.css';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../services/store';
import { registerUser } from '../../services/api'; // Импортируйте функцию registerUser
import Link from 'next/link';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const { register } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password && fullName && phoneNumber && address) {
      try {
        const response = await registerUser({ username, password, fullName, phoneNumber });
        if (response.success) {
          register({ username, fullName, phoneNumber });
          router.push('/profile');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please fill out all fields');
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
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={styles.input}
          />
          
          <button type="submit" className={styles.link_button}>
            Register
          </button>
          <Link href="/" className={styles.link_button}>
          Return to Home
        </Link>
        </form>
        
      </div>
    </div>
  );
};

export default RegisterPage;