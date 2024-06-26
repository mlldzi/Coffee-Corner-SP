'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import styles from './history.module.css'; 
import { getUserOrders } from '../services/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const HistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadUserOrders = async () => {
            const accessToken = Cookies.get('csrf_access_token');
            if (!accessToken) {
                router.push('/login');
                return;
            }

            try {
                const userOrders = await getUserOrders(accessToken);
                if (userOrders.success) {
                    // Sort orders by ID in ascending order
                    const sortedOrders = userOrders.orders.sort((a, b) => a.id - b.id);
                    setOrders(sortedOrders);
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
            </div>
        </div>
    );
};

export default HistoryPage;
