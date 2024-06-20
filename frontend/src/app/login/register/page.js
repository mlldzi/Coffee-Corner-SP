'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../services/store';
import { registerUser } from '../../services/api';
import Link from 'next/link';
import Header from '../../components/Header';
import VideoContainer from '../../components/VideoContainer';
import styles from '../login.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    password: ''
  });

  const { register } = useAuthStore();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber, password } = formData;
    
    if (fullName && phoneNumber && password) {
      try {
        const response = await registerUser({ fullName, phoneNumber, password });
        if (response.success) {
          register({ fullName, phoneNumber });
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
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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