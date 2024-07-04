'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import MenuItem from '../components/MenuItem';
import Header from '../components/Header';
import Cart from '../components/Cart';
import styles from './menu.module.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/menu/menuItems.json')
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => console.error('Error loading menu items:', error));
    }, []);

    return (
        <div className={styles.videoBackground}>
            <div className={styles.videoWrapper}>
                <video className={styles.video} src="/video.mp4" autoPlay loop muted />
            </div>
            <div className={styles.container}>
                <Header />
                <div className={styles.menuContainer}>
                    <Swiper
                        className={styles.swiper}
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                            1280: { slidesPerView: 4, spaceBetween: 40 },
                        }}
                    >
                        {menuItems.map(item => (
                            <SwiperSlide key={item.name}>
                                <MenuItem item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <Cart />
            </div>
        </div>
    );
};

export default Menu;
