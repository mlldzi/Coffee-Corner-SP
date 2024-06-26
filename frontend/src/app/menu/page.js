'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';
import Header from '../components/Header';

const VideoBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Video = styled.video`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  height: 550px; /* Уменьшаем высоту контейнера */
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-left: 20px; /* Сместим контейнер чуть правее */
`;

const StyledSwiper = styled(Swiper)`
  padding-left: 20px; /* Сместим слайдер чуть правее */

  .swiper-pagination-bullet {
    background: #000 !important;
  }

  .swiper-pagination {
    bottom: 0px !important; /* Смещение точек пагинации ниже */
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
      <VideoWrapper>
        <Video src="/video.mp4" autoPlay loop muted />
      </VideoWrapper>
      <Container>
        <Header />
        <MenuContainer>
          <StyledSwiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {menuItems.map(item => (
              <SwiperSlide key={item.name}>
                <MenuItem item={item} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </MenuContainer>
      </Container>
    </VideoBackground>
  );
};

export default Menu;
