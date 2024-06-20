import React, { useEffect, useState } from 'react';
import styles from './MenuItem.module.css';

const MenuItem = ({ item }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`/menu/${item.description}`)
      .then(response => response.text())
      .then(text => setDescription(text));
  }, [item.description]);

  return (
    <div className={styles.menuItem}>
      <img src={`/menu/${item.image}`} alt={item.name} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;
