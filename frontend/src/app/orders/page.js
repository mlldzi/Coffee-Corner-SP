'use client'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import VideoContainer from '../components/VideoContainer';
import styles from './orders.module.css';
import useAuthStore from '../services/store';
import { getOrders } from '../services/api';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const { user, orders, logout, clearOrders } = useAuthStore();
  const [orderTime, setOrderTime] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleOrderSubmit = async () => {
    if (!orderTime) {
      alert('Пожалуйста, укажите время заказа.');
      return;
    }

    try {
      await createOrder({ userId: user.userId, items: orders, orderTime });
      clearOrders();
      alert('Ваш заказ был успешно оформлен.');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Ошибка при оформлении заказа. Попробуйте снова.');
    }
  };
  return (
    <div className={styles.videoBackground}>
      <VideoContainer src="/video.mp4" />
      <div className={styles.container}>
        <Header />
        <div className={styles.ordersContainer}>
          <h2>Корзина</h2>
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <h3>{item.name}</h3>
                <p>Количество: 1</p>
              </div>
            ))
          ) : (
            <p>Корзина пуста.</p>
          )}
          <div className={styles.orderTime}>
            <label htmlFor="orderTime">Выберите время заказа:</label>
            <input
              type="datetime-local"
              id="orderTime"
              name="orderTime"
              value={orderTime}
              onChange={handleOrderTimeChange}
            />
          </div>
          <button onClick={handlePlaceOrder} className={styles.placeOrderButton}>
            Оформить заказ
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;