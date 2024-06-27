'use client';

import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './orders.module.css';
import useAuthStore from '../services/store';
import {getOrders, editOrder, checkAndRefreshToken} from '../services/api';
import Link from 'next/link';

const OrdersPage = () => {
    const {user, logout} = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [formData, setFormData] = useState({
        phone_number: '',
        cart: '',
        prepared_by: '',
        total_amount: '',
    });

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const accessToken = await checkAndRefreshToken();
                const ordersData = await getOrders('desc');
                if (ordersData.success) {
                    setOrders(ordersData.orders);
                } else {
                    console.error('Ошибка загрузки заказов');
                }
            } catch (error) {
                console.error('Ошибка загрузки заказов:', error);
            }
        };

        loadOrders();
    }, []);

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    const handleEditClick = (order) => {
        setEditingOrder(order.id);
        setFormData({
            phone_number: order.phone_number,
            cart: order.cart,
            prepared_by: new Date(order.prepared_by).toISOString().slice(0, 16),
            total_amount: order.total_amount
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            const accessToken = await checkAndRefreshToken();
            const response = await editOrder(editingOrder, formData);
            if (response.success) {
                setEditingOrder(null);
                const updatedOrders = await getOrders('desc');
                setOrders(updatedOrders.orders);
            } else {
                console.error('Ошибка редактирования заказа');
            }
        } catch (error) {
            console.error('Ошибка редактирования заказа:', error);
        }
    };

    return (
        <div className={styles.videoBackground}>
            <VideoContainer src="/video.mp4"/>
            <div className={styles.container}>
                <Header/>
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
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    {editingOrder === order.id ? (
                                        <>
                                            <td>{order.id}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="phone_number"
                                                    value={formData.phone_number}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="cart"
                                                    value={formData.cart}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="datetime-local"
                                                    name="prepared_by"
                                                    value={formData.prepared_by}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="total_amount"
                                                    value={formData.total_amount}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <button className={styles.button} onClick={handleSaveClick}>Сохранить
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{order.id}</td>
                                            <td>{order.phone_number}</td>
                                            <td>{order.cart}</td>
                                            <td>{new Date(order.prepared_by).toLocaleString()}</td>
                                            <td>{order.total_amount}</td>
                                            <td>
                                                <button className={styles.button}
                                                        onClick={() => handleEditClick(order)}>Редактировать
                                                </button>
                                            </td>
                                        </>
                                    )}
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

export default OrdersPage;