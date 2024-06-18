'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './MenuItem.module.css';
import axios from 'axios';

const MenuItem = ({ imageSrc, title }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await axios.get(`/services/readFile?filename=${title}`);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching description:', error);
      }
    };

    fetchDescription();
  }, [title]);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageWrapper}>
        <Image src={imageSrc} alt={title} width={200} height={200} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default MenuItem;