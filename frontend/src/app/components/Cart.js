import React from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../services/store';
import styles from './Cart.module.css';

const Cart = () => {
    const orders = useAuthStore((state) => state.orders);
    const clearOrders = useAuthStore((state) => state.clearOrders);
    const removeOrder = useAuthStore((state) => state.removeOrder);
    const router = useRouter();

    const handleCheckout = () => {
        sessionStorage.setItem('cart', JSON.stringify(orders));
        clearOrders();
        router.push('/checkout');
    };

    const handleRemove = (index) => {
        removeOrder(index);
    };

    return (
        <div className={styles.cart}>
            <h2>Корзина</h2>
            {orders.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div>
                    <ul>
                        {orders.map((item, index) => (
                            <li key={index} className={styles.cartItem}>
                                {item.name}
                                <button onClick={() => handleRemove(index)} className={styles.removeButton}>Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout} className={styles.checkoutButton}>Перейти к оплате</button>
                </div>
            )}
        </div>
    );
};

export default Cart;