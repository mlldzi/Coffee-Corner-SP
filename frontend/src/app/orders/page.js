'use client';

import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import styles from './orders.module.css';
import {getOrders, editOrder, checkAndRefreshToken, deleteOrder} from '../services/api';
import Link from 'next/link';
import Filters from '../components/Filters';
import OrdersTable from '../components/OrdersTable';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [formData, setFormData] = useState({
        phone_number: '',
        cart: '',
        prepared_by: '',
        total_amount: '',
        is_completed: false,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMode, setSearchMode] = useState('id');

    useEffect(() => {
        const loadOrders = async () => {
            try {
                await checkAndRefreshToken();
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

    const handleEditClick = (order) => {
        setEditingOrder(order.id);

        // Преобразование времени к часовому поясу +10
        const utcPlus10Time = new Date(order.prepared_by);
        utcPlus10Time.setHours(utcPlus10Time.getHours() + 10);

        setFormData({
            phone_number: order.phone_number,
            cart: order.cart,
            prepared_by: utcPlus10Time.toISOString().slice(0, 16),
            total_amount: order.total_amount,
            is_completed: order.is_completed
        });
    };

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
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

    const handleSearch = async (mode, term) => {
        setSearchMode(mode);
        setSearchTerm(term);

        try {
            await checkAndRefreshToken();
            const ordersData = await getOrders('desc');
            if (ordersData.success) {
                const filteredOrders = ordersData.orders.filter(order => {
                    switch (mode) {
                        case 'id':
                            return term === '' || String(order.id).includes(term);
                        case 'phone_number':
                            return term === '' || order.phone_number.includes(term);
                        case 'cart':
                            return term === '' || order.cart.toLowerCase().includes(term.toLowerCase());
                        default:
                            return true;
                    }
                });

                setOrders(filteredOrders);
            } else {
                console.error('Ошибка загрузки заказов');
            }
        } catch (error) {
            console.error('Ошибка загрузки заказов:', error);
        }
    };

    const handleClearSearch = async () => {
        setSearchTerm('');
        try {
            await checkAndRefreshToken();
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

    const handleDeleteClick = async (orderId) => {
        try {
            const response = await deleteOrder(orderId);
            if (response.success) {
                const updatedOrders = await getOrders('desc');
                setOrders(updatedOrders.orders);
            } else {
                console.error('Ошибка удаления заказа:', response.msg);
            }
        } catch (error) {
            console.error('Ошибка удаления заказа:', error);
        }
    };

    return (
        <div className={styles.videoBackground}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted/>
            </div>
            <div className={styles.container}>
                <Header/>
                <div className={styles.ordersContainer}>
                    <Filters handleSearch={handleSearch} handleClearSearch={handleClearSearch}/>
                    {orders.length > 0 ? (
                        <OrdersTable
                            orders={orders}
                            editingOrder={editingOrder}
                            formData={formData}
                            handleEditClick={handleEditClick}
                            handleInputChange={handleInputChange}
                            handleSaveClick={handleSaveClick}
                            handleDeleteClick={handleDeleteClick}
                        />
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
