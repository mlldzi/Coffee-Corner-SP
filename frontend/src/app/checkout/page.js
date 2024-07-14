'use client';

import React, { useState, useEffect } from 'react';
import styles from './checkout.module.css';
import { useRouter } from 'next/navigation';
import { getUserProfile, checkAndRefreshToken, createOrder } from '../services/api';
import Header from '../components/Header';
import useAuthStore from '../services/store';

const Checkout = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preparedBy, setPreparedBy] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();
    const clearOrders = useAuthStore((state) => state.clearOrders);

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

    const calculatePrice = () => {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const orderData = {
            phone_number: phoneNumber,
            cart: cartItems.map(item => `${item.name} x ${item.quantity}`).join(', '),
            prepared_by: preparedBy,
            total_amount: calculatePrice(),
        };

        try {
            const response = await createOrder(orderData);
            if (response.success) {
                console.log('Заказ успешно создан:', response.msg);
                clearOrders();
                router.push('/history');
            } else {
                console.error('Ошибка при создании заказа:', response.msg);
            }
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
        }
    };

    const handleReturnToMenu = () => {
        router.push('/menu');
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
                        <p className={styles.price}>Итого: {calculatePrice()} руб.</p>
                        <p className={styles.price}>В корзине: {cartItems.reduce((acc, item) => acc + item.quantity, 0)} кофе</p>
                        {cartItems.map((item, index) => (
                            <div key={index} className={styles.cartItem}>
                                <div>
                                    <p className={styles.cartItemName}>{item.name} x {item.quantity} - {item.price * item.quantity} руб.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.formGroup}>
                        <button type="button" onClick={handleReturnToMenu} className={styles.submitButton}>Вернуться в меню</button>
                        <button type="submit" className={styles.submitButton}>Отправить заказ</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;