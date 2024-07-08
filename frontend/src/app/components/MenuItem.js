import React, { useEffect, useState } from 'react';
import styles from './MenuItem.module.css';
import useAuthStore from '../services/store'; // Убедимся, что импорт присутствует

const MenuItem = ({ item }) => {
    const [description, setDescription] = useState('');
    const [inCart, setInCart] = useState(false);
    const orders = useAuthStore((state) => state.orders);
    const addToOrder = useAuthStore((state) => state.addToOrder);
    const removeOrder = useAuthStore((state) => state.removeOrder);

    useEffect(() => {
        fetch(`/menu/${item.description}`)
            .then(response => response.text())
            .then(data => setDescription(data))
            .catch(error => console.error('Ошибка загрузки описания:', error));
    }, [item.description]);

    useEffect(() => {
        setInCart(orders.some(order => order.name === item.name));
    }, [orders, item.name]);

    const handleAddOrRemoveFromOrder = () => {
        if (inCart) {
            const itemIndex = orders.findIndex(order => order.name === item.name);
            removeOrder(itemIndex);
        } else {
            addToOrder(item);
        }
        setInCart(!inCart);
    };

    return (
        <div className={styles.menuItem}>
            <div className={styles.imageContainer}>
                <img src={`/menu/${item.image}`} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <button
                onClick={handleAddOrRemoveFromOrder}
                className={`${styles.addButton} ${inCart ? styles.addedButton : ''}`}
            >
                {inCart ? 'Добавлено в корзину' : 'Добавить в заказ'}
            </button>
        </div>
    );
};

export default MenuItem;
