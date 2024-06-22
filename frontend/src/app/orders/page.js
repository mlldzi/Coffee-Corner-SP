'use client';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './orders.module.css';
import useAuthStore from '../services/store';
import { getOrders } from '../services/api';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const { user, logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const loadOrders = async () => {
      try {
        const ordersData = await getOrders(user.userId);
        if (ordersData.success) {
          setOrders(ordersData.orders);
        } else {
          console.error('Failed to load orders');
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    loadOrders();
  }, [user, router]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className={styles.videoBackground}>
      <VideoContainer src="/video.mp4" />
      <div className={styles.container}>
        <Header />
        <div className={styles.ordersContainer}>
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className={styles.orderItem}>
                <h3>Заказ #{order.id}</h3>
                <p>Дата: {order.order_date}</p>
                <p>Сумма: {order.total_amount}</p>
                <ul>
                  {order.cart.split(', ').map((item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Нет заказов.</p>
          )}
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
      </div>
    </div>
  );
};

export default OrdersPage;