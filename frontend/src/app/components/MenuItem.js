import React, {useEffect, useState} from 'react';
import styles from './MenuItem.module.css';
import useAuthStore from '../services/store';

const MenuItem = ({item}) => {
    const [description, setDescription] = useState('');
    const addToOrder = useAuthStore((state) => state.addToOrder);

    useEffect(() => {
        fetch(`/menu/${item.description}`)
            .then(response => response.text())
            .then(data => setDescription(data))
            .catch(error => console.error('Ошибка загрузки описания:', error));
    }, [item.description]);

    const handleAddToOrder = () => {
        addToOrder(item);
    };

    return (
        <div className={styles.menuItem}>
            <div className={styles.imageContainer}>
                <img src={`/menu/${item.image}`} alt={item.name} className={styles.image}/>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.name}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <button onClick={handleAddToOrder} className={styles.addButton}>Добавить в заказ</button>
        </div>
    );
};

export default MenuItem;
