'use client';

import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';
import VideoContainer from '../components/VideoContainer';
import Header from '../components/Header';

const VideoBackground = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: -1%;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0));
    overflow-y: auto;
`;

const MenuContainer = styled.div`
    width: 100%;
    max-width: 1500px;
    height: 100%;
    max-height: 560px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 0%;
    transform: translateX(20px);
`;

const StyledSwiper = styled(Swiper)`
    padding-left: 100px;

    .swiper-pagination-bullet {
        background: #000 !important;
    }

    .swiper-pagination {
        bottom: 0px !important;
        left: -20px;
        bottom: 0px !important;
    }

    .swiper-button-prev,
    .swiper-button-next {
        color: #875151 !important;
    }
`;

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/menu/menuItems.json')
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => console.error('Error loading menu items:', error));
    }, []);

    return (
        <VideoBackground>
            <VideoContainer src="/video.mp4"/>
            <Container>
                <Header/>
                <MenuContainer>
                    <StyledSwiper
                        modules={[Pagination, Navigation]}
                        pagination={{clickable: true}}
                        navigation
                        spaceBetween={50}
                        slidesPerView={4}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {menuItems.map(item => (
                            <SwiperSlide key={item.name}>
                                <MenuItem item={item}/>
                            </SwiperSlide>
                        ))}
                    </StyledSwiper>
                </MenuContainer>
            </Container>
        </VideoBackground>
    );
};

export default Menu;