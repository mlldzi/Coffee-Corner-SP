import React from 'react';
import styles from '../orders/orders.module.css';

const OrdersTable = ({orders, editingOrder, formData, handleEditClick, handleInputChange, handleSaveClick}) => {
    return (
        <table className={styles.ordersTable}>
            <thead>
            <tr>
                <th>ID заказа</th>
                <th>Номер телефона</th>
                <th>Корзина</th>
                <th>К какому времени приготовить</th>
                <th>Сумма</th>
                <th>Завершено</th>
                <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => (
                <tr key={order.id}>
                    {editingOrder === order.id ? (
                        <>
                            <td>{order.id}</td>
                            <td>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cart"
                                    value={formData.cart}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="datetime-local"
                                    name="prepared_by"
                                    value={formData.prepared_by}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="total_amount"
                                    value={formData.total_amount}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    name="is_completed"
                                    checked={formData.is_completed}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <button className={styles.button} onClick={handleSaveClick}>Сохранить</button>
                            </td>
                        </>
                    ) : (
                        <>
                            <td>{order.id}</td>
                            <td>{order.phone_number}</td>
                            <td>{order.cart}</td>
                            <td>{new Date(order.prepared_by).toLocaleString()}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.is_completed ? 'Да' : 'Нет'}</td>
                            <td>
                                <button className={styles.button} onClick={() => handleEditClick(order)}>Редактировать
                                </button>
                            </td>
                        </>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default OrdersTable;
