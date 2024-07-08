'use client';

import React, { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import { useRouter } from 'next/navigation';
import { getUserProfile, checkAndRefreshToken, createOrder } from '../services/api';
import Header from '../components/Header';

const Checkout = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preparedBy, setPreparedBy] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const cart = sessionStorage.getItem('cart');
        if (cart) {
            const parsedCart = JSON.parse(cart);
            setCartItems(parsedCart);
        } else {
            router.push('/menu');
        }

        const fetchUserData = async () => {
            if (await checkAndRefreshToken()) {
                const userData = await getUserProfile();
                if (userData) {
                    setName(userData.profile.full_name);
                    setPhoneNumber(userData.profile.phone_number);
                }
            }
        };

        fetchUserData();
    }, [router]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const orderData = {
            phone_number: phoneNumber,
            cart: cartItems.map(item => item.name).join(', '),
            prepared_by: preparedBy,
            total_amount: 123321, // TODO: сделать цену каждому кофе
        };

        try {
            const response = await createOrder(orderData);
            if (response.success) {
                console.log('Заказ успешно создан:', response.msg);
                router.push('/history');
            } else {
                console.error('Ошибка при создании заказа:', response.msg);
            }
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
        }
    };

    return (
        <div className={styles.videoBackground}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted />
            </div>
            <div className={styles.checkoutContainer}>
                <Header />
                <h1 className={styles.title}>Оплата</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Имя</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phoneNumber" className={styles.label}>Номер телефона</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="preparedBy" className={styles.label}>К какому времени приготовить</label>
                        <input
                            type="datetime-local"
                            id="preparedBy"
                            value={preparedBy}
                            onChange={(e) => setPreparedBy(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.orderSummary}>
                        <h2>Ваша корзина</h2>
                        {cartItems.map((item, index) => (
                            <div key={index} className={styles.cartItem}>
                                <div>
                                    <p className={styles.cartItemName}>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" className={styles.submitButton}>Отправить заказ</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
