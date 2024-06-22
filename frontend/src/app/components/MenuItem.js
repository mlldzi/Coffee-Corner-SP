import React, { useEffect, useState } from 'react';
import styles from './MenuItem.module.css';

const MenuItem = ({ item }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`/menu/${item.description}`)
      .then(response => response.text())
      .then(data => setDescription(data))
      .catch(error => console.error('Error loading description:', error));
  }, [item.description]);

  return (
    <div className={styles.menuItem}>
      <div className={styles.imageContainer}>
        <img src={`/menu/${item.image}`} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;
