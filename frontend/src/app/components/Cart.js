import React from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../services/store';
import styles from './Cart.module.css';

const Cart = () => {
    const orders = useAuthStore((state) => state.orders);
    const removeOrder = useAuthStore((state) => state.removeOrder);
    const router = useRouter();

    const handleCheckout = () => {
        sessionStorage.setItem('cart', JSON.stringify(orders));
        router.push('/checkout');
    };

    const handleRemove = (itemName) => {
        removeOrder(itemName);
    };

    return (
        <div>
            <button onClick={handleCheckout} className={styles.checkoutButton}>Перейти к оплате</button>
        </div>
                
    );
};

export default Cart;