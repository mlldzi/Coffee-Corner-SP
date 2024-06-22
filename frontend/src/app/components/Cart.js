import Link from 'next/link';
import styles from './Cart.module.css'; // Ensure the correct import path

const Cart = () => {
  return (
    <div className={styles.cart_container}>
      <Link href="/orders">
        <img className={styles.image} src="/cart.png" alt="Корзина" />
      </Link>
    </div>
  );
};

export default Cart;
