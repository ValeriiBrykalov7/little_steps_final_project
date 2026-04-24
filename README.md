# Little Steps Backend

Backend-частина застосунку **Little Steps** (Node.js + Express + MongoDB), що відповідає за:
- авторизацію користувачів,
- керування профілем,
- подальшу роботу із задачами, щоденником та даними за тижнями вагітності.

## Технологічний стек

- Node.js
- Express
- MongoDB + Mongoose
- Celebrate/Joi (валідація)
- Cookie-based session auth
- Multer (завантаження файлів)
- Pino HTTP Logger
- Helmet, CORS, Cookie Parser

## Локальний запуск

### Development

```bash
npm install
npm run dev
```

### Production

```bash
npm start
```

## Змінні середовища (`.env`)

### Приклад `.env`

Створи `.env` на основі `.env.example`:

```env
PORT=3000

# Рядок підключення до MongoDB (локально або Atlas)
# Приклад: mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
MONGO_URL=your_mongodb_connection_string

# Режим роботи додатка: development або production
NODE_ENV=development

# Адреса фронтенду
FRONTEND_DOMAIN=http://localhost:3000

# Налаштування Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


## Обробка помилок

### Middleware

- У застосунку використовується централізована обробка помилок через middleware `errorHandler`.
- Для неіснуючих маршрутів працює `notFoundHandler` (повертає `404 Not Found`).
- Валідаційні помилки (`celebrate/Joi`) обробляються окремим middleware `errors()` перед `errorHandler`.

### Типові статус-коди

- `400 Bad Request` — невалідні вхідні дані
- `401 Unauthorized` — відсутня або невалідна сесія/токен
- `404 Not Found` — маршрут або ресурс не знайдено
- `500 Internal Server Error` — непередбачена серверна помилка

## Структура проєкту

```text
little_steps_final_project/
├── src/
│   ├── constants/      # константи застосунку
│   ├── controllers/    # логіка endpoint-ів
│   ├── db/             # підключення до MongoDB
│   ├── middleware/     # auth, logger, error handlers, upload
│   ├── models/         # Mongoose-моделі
│   ├── routes/         # маршрути API
│   ├── services/       # бізнес-логіка (auth/session)
│   ├── utils/          # helper-функції
│   ├── validations/    # Joi/Celebrate схеми
│   └── server.js       # точка входу
├── .env.example
├── package.json
└── README.md
```

---

## API Endpoints

### `/api/auth`

- `POST /register`  
  **Вимагає:** `username`, `email`, `password`  
  **Повертає:** створеного користувача (без пароля) + cookies сесії (`accessToken`, `refreshToken`, `sessionId`)

- `POST /login`  
  **Вимагає:** `email`, `password`  
  **Повертає:** дані користувача (без пароля) + оновлені cookies сесії

- `POST /logout`  
  **Вимагає:** активну сесію (`accessToken`, `sessionId` у cookies)  
  **Повертає:** `204 No Content` + очищення cookies

- `POST /refresh`  
  **Вимагає:** `sessionId`, `refreshToken` у cookies  
  **Повертає:** нові cookies сесії/токени + повідомлення `Session refreshed`

### `/api/users`

- `GET /current`  
  **Вимагає:** активну сесію (`accessToken`, `sessionId`)  
  **Повертає:** обʼєкт з даними поточного користувача (`status`, `message`, `data`)

- `PATCH /avatar`  
  **Вимагає:** активну сесію + файл зображення (`multipart/form-data`, до 2 МБ)  
  **Повертає:** оновлений URL аватара користувача

- `PATCH /profile`  
  **Вимагає:** активну сесію + поля для оновлення (наприклад: `username`, `gender`, `dueDate`)  
  **Повертає:** оновлений профіль користувача

### `/api/tasks`

- `POST /`  
  **Вимагає:** активну сесію + `title` (опційно `date`)  
  **Повертає:** створену задачу (`title`, `date`, `isDone`, `userId`)

- `GET /`  
  **Вимагає:** активну сесію  
  **Повертає:** список задач користувача

- `PATCH /:taskId/status`  
  **Вимагає:** активну сесію + `taskId` + `isDone` (boolean)  
  **Повертає:** задачу після оновлення статусу

### `/api/diaries`

- `POST /`  
  **Вимагає:** активну сесію + `title`, `description`, `emotions[]` (опційно `date`)  
  **Повертає:** створений запис щоденника

- `GET /`  
  **Вимагає:** активну сесію  
  **Повертає:** список записів щоденника користувача

- `PATCH /:diaryId`  
  **Вимагає:** активну сесію + `diaryId` + поля для редагування (`title`, `description`, `emotions`)  
  **Повертає:** оновлений запис щоденника

- `DELETE /:diaryId`  
  **Вимагає:** активну сесію + `diaryId`  
  **Повертає:** підтвердження видалення запису

### `/api/weeks`

- `GET /public`  
  **Вимагає:** без авторизації  
  **Повертає:** `weekNumber`, `daysToDueDate`, інформацію про малюка (dashboard), пораду для мами

- `GET /private`  
  **Вимагає:** активну сесію  
  **Повертає:** `weekNumber`, `daysToDueDate`, інформацію про малюка (dashboard), пораду для мами (персоналізовано)

- `GET /baby-development`  
  **Вимагає:** активну сесію + тиждень (з профілю або query)  
  **Повертає:** дані про розвиток малюка відповідно до тижня

- `GET /mom-body`  
  **Вимагає:** активну сесію + тиждень (з профілю або query)  
  **Повертає:** дані про зміни тіла мами відповідно до тижня

### Приклади request/response

#### `POST /api/auth/register`

Request:

```json
{
  "username": "anna",
  "email": "anna@example.com",
  "password": "StrongPass123"
}
```

Response:

```json
{
  "status": 201,
  "message": "Successfully registered a user!",
  "data": {
    "_id": "userId",
    "username": "anna",
    "email": "anna@example.com"
  }
}
```

#### `POST /api/auth/login`

Request:

```json
{
  "email": "anna@example.com",
  "password": "StrongPass123"
}
```

Response:

```json
{
  "status": 200,
  "message": "Successfully logged in an user!",
  "data": {
    "_id": "userId",
    "username": "anna",
    "email": "anna@example.com"
  }
}
```

#### `GET /api/users/current`

Response:

```json
{
  "status": 200,
  "message": "Successfully found user!",
  "data": {
    "_id": "userId",
    "username": "anna",
    "email": "anna@example.com"
  }
}
```

## Як користуватись API

### Авторизація (cookie-based)

- **Публічні endpoint-и:** `POST /api/auth/register`, `POST /api/auth/login`.
- **Приватні endpoint-и:** всі інші, де вимагається активна сесія.
- **Після login/register** сервер встановлює `httpOnly` cookies:
  - `sessionId`
  - `accessToken`
  - `refreshToken`
- **Доступ до приватних маршрутів:** middleware `authenticate` перевіряє `sessionId` + `accessToken`.
- **Оновлення сесії:** `POST /api/auth/refresh` використовує `sessionId` + `refreshToken` і видає нові cookies.
- **Вихід:** `POST /api/auth/logout` видаляє сесію та очищає cookies.
- **Коли повертається `401 Unauthorized`:** відсутні cookies, невалідна/прострочена сесія або недійсний токен.

1. Запусти сервер локально:
   - `npm install`
   - `npm run dev`
2. Базовий URL локально: `http://localhost:3000`
3. Зареєструй користувача: `POST /api/auth/register` або увійди: `POST /api/auth/login`.
4. Після успішного login/register браузер або HTTP-клієнт зберігає cookies (`sessionId`, `accessToken`, `refreshToken`).
5. Викликай приватні endpoint-и (наприклад, `GET /api/users/current`) з передачею cookies.
6. Якщо `accessToken` протермінований, виконай `POST /api/auth/refresh`, щоб оновити сесію.
7. Для виходу з акаунта виконай `POST /api/auth/logout`.

### Рекомендований тестовий flow

1. `POST /api/auth/register`
2. `POST /api/auth/login`
3. `GET /api/users/current`
4. `POST /api/auth/refresh`
5. `POST /api/auth/logout`

---

## Розподіл задач між учасниками

### Core setup

1. Розгорнув сервер для розробки (підключив основні модулі, налаштував `CORS`, додав middleware для обробки помилок і `notFound`), а також узгодив базову структуру backend-проєкту, ініціалізував та підключив MongoDB до застосунку — **Valerii Brykalov**

### API tasks

2. `POST /api/auth/register` — **Ivanna Shchokalo**  
3. `POST /api/auth/login` — **Ivanna Shchokalo**  
4. Middleware авторизації — **Hanna Muzychuk**  
5. `POST /api/auth/logout` — **Tetiana Kolomeichuk**  
6. `POST /api/auth/refresh` — **Tetiana Kolomeichuk**  
7. `GET /api/users/current` — **Hanna Muzychuk**  
8. `PATCH /api/users/avatar` — **Nebelskiy Max**  
9. `PATCH /api/users/profile` — **Nebelskiy Max** 
10. `POST /api/tasks` — **Vitalii**  
11. `GET /api/tasks` — **Vitalii**  
12. `PATCH /api/tasks/:taskId/status` — **Andriy Baranovich**  
13. `POST /api/diaries` — **Bogdan Ostapenko**  
14. `GET /api/diaries` — **Bogdan Ostapenko**  
15. `PATCH /api/diaries/:diaryId` — **Alinka**  
16. `DELETE /api/diaries/:diaryId` — **Alinka**  
17. `GET /api/weeks/public` — **Andrii Storozhenko**  
18. `GET /api/weeks/private` — **Nazar Ismailov**  
19. `GET /api/weeks/baby-development` — **Nazar Ismailov**  
20. `GET /api/weeks/mom-body` — **Anna Anishchenko**

---


## Колекції MongoDB

### User and auth data

- `users` — дані користувача: `username`, `email`, `password`, `gender`, `dueDate`, `avatar`
- `sessions` — сесії авторизації: `userId`, `accessToken`, `refreshToken`, `accessTokenValidUntil`, `refreshTokenValidUntil`

### Application data

- `tasks` — задачі користувача: `title`, `date`, `isDone`, `userId`
- `diaries` — записи щоденника: `title`, `description`, `date`, `emotions`, `userId`
- `emotions` — довідник емоцій: `title`

### Pregnancy reference data

- `baby_states` — дані про розвиток малюка за тижнями: `weekNumber`, `analogy`, `babySize`, `babyWeight`, `image`, `babyActivity`, `babyDevelopment`, `interestingFact`, `momDailyTips`
- `mom_states` — дані про стан мами за тижнями: `weekNumber`, `feelings`, `comfortTips`


---


