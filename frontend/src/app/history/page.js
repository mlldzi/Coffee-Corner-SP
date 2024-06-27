'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from './history.module.css';
import { getUserOrders, checkAndRefreshToken } from '../services/api';
import Link from 'next/link';

const HistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadUserOrders = async () => {
            try {
                const accessToken = await checkAndRefreshToken();
                const userOrders = await getUserOrders(accessToken);
                if (userOrders.success) {
                    setOrders(userOrders.orders);
                } else {
                    console.error('Ошибка загрузки заказов:', userOrders.msg);
                }
            } catch (error) {
                console.error('Ошибка загрузки заказов:', error);
            }
        };

        loadUserOrders();
    }, []);

    return (
        <div className={styles.videoBackground}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted/>
            </div>
            <div className={styles.container}>
                <Header />
                <div className={styles.ordersContainer}>
                    {orders.length > 0 ? (
                        <table className={styles.ordersTable}>
                            <thead>
                                <tr>
                                    <th>ID заказа</th>
                                    <th>Номер телефона</th>
                                    <th>Корзина</th>
                                    <th>К какому времени приготовить</th>
                                    <th>Сумма</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.phone_number}</td>
                                        <td>{order.cart}</td>
                                        <td>{new Date(order.prepared_by).toLocaleString()}</td>
                                        <td>{order.total_amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Нет заказов.</p>
                    )}
                </div>
                <Link href="/" className={styles.link_button}>
                     Главная
                </Link>
            </div>
        </div>
    );
};

export default HistoryPage;
