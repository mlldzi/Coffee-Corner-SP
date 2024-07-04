'use client';

import React, {useState, useEffect} from 'react';
import styles from './checkout.module.css';
import {useRouter} from 'next/navigation';

const Checkout = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [preparedBy, setPreparedBy] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const cart = sessionStorage.getItem('cart');
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
        if (!cart) {
            router.push('/menu');
        }
    }, [router]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Оплата отправлена:', {name, phoneNumber, preparedBy});
    };

    return (
        <div className={styles.checkoutContainer}>
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
                <button type="submit" className={styles.submitButton}>Отправить заказ</button>
            </form>
        </div>
    );
};

export default Checkout;
