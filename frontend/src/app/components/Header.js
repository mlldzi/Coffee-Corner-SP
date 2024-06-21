import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <img src="/logo.png" alt="Логотип" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.name}>
        <h1>Coffee Corner</h1>
      </div>
    </div>
  );
};

export default Header;