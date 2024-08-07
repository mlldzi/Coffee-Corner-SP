# Coffee Corner

Этот проект разработан для летней практики и представляет собой веб-сайт для кофейни. Сайт позволяет пользователям просматривать меню, совершать заказы и управлять ими через административный интерфейс, а также создавать профили пользователей.

## Особенности проекта

- **Меню напитков:** Пользователи могут просматривать разнообразие напитков, предлагаемых кофейней.
- **Оформление заказа:** Возможность оформить заказ, выбрав напиток и его количество.
- **Административная панель:** Администраторы могут управлять заказами, просматривать текущие заказы, редактировать их и отмечать как выполненные.
- **Фильтры и поиск:** Поиск заказов по различным критериям для удобства администрирования.
- **Авторизация и безопасность:** Использование json web токенов для авторизации и сохранение их в куки.

## Технологии

- **Frontend:** Разработан с использованием React.js.
- **Backend:** Используется Flask для создания API, обеспечивающего взаимодействие frontend с базой данных и обработку заказов.
- **База данных:** Данные о заказах и клиентах хранятся в PostgreSQL базе данных.
- **Контейнеризация:** Используется Docker.
- **Тестирование:** Используется unittest для тестирования API.

## Контейнеры

- **Frontend:** `frontend`
- **Backend:** `backend`
- **База данных:** `db`
- **PGAdmin:** `pgadmin`
- **Тестирование:** `test_backend`

## Установка и запуск

1. **Клонирование репозитория:**
   ```bash
   git clone https://github.com/mlldzi/Coffee-Corner-SP
   cd Coffee-Corner-SP
   ```

2. **Запуск контейнеров docker:**
   ```bash
   docker compose up
   ```
   Фронтенд будет доступен по адресу `http://localhost:3000`, однако следует в качестве адреса писать айпи, потому что `localhost` не сохраняет куки.

    Бэкенд: `http://localhost:2500`.

    PGAdmin: `http://localhost:5050`.    


3. **Запуск тестов:**
   ```bash
   docker compose up backend db test_backend
   ```