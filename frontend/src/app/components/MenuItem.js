import React, { useEffect, useState } from 'react';
import styles from './MenuItem.module.css';
import useAuthStore from '../services/store';

const MenuItem = ({ item }) => {
    const [description, setDescription] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const addToOrder = useAuthStore((state) => state.addToOrder);
    const updateOrderQuantity = useAuthStore((state) => state.updateOrderQuantity);
    const orders = useAuthStore((state) => state.orders);
    const order = orders.find(order => order.name === item.name);

    useEffect(() => {
        fetch(`/menu/${item.description}`)
            .then(response => response.text())
            .then(data => setDescription(data))
            .catch(error => console.error('Ошибка загрузки описания:', error));
    }, [item.description]);

    const handleAddToOrder = () => {
        addToOrder(item);
        setIsAdding(true);
    };

    const handleQuantityChange = (change) => {
        updateOrderQuantity(item.name, change);
        if (order && order.quantity + change <= 0) {
            setIsAdding(false);
        }
    };

    return (
        <div className={styles.menuItem}>
            <div className={styles.imageContainer}>
                <img src={`/menu/${item.image}`} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>
                <p className={styles.price}>₽{item.price}</p>
                <p className={styles.description}>{description}</p>
            </div>
            {isAdding || (order && order.quantity > 0) ? (
                <div className={styles.quantityControl}>
                    <button onClick={() => handleQuantityChange(-1)} className={styles.quantityButton}>-</button>
                    <span className={styles.quantityNumber}>{order ? order.quantity : 0}</span>
                    <button onClick={() => handleQuantityChange(1)} className={styles.quantityButton}>+</button>
                </div>
            ) : (
                <button onClick={handleAddToOrder} className={styles.addButton}>Добавить в заказ</button>
            )}
        </div>
    );
};

export default MenuItem;