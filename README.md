# Test-Assignment-Welbex
Microservice Architecture (Users, Posts, Email notifications) + JWT, Docker, Swagger

**Задание: Необходимо разработать бэкенд для сервиса заметок используя микросервисную архитектуру.**
<details>
<summary>Описание</summary>
Структура сервисов:

- Сервис пользователей
    - Авторизация + регистрация (JWT)
    - После регистрации отправлять пользователю приветственное письмо.
    - CRUD пользователей
- Сервис записей
    - Авторизация (JWT)
    - CRUD записей
- Сервис рассылки E-mail уведомлений
    - Сервис должен обрабатывать сообщения в порядке очереди ( 1 сообщение за 1 секунду), для этого стоит использовать брокеры (RabbitMQ, *Kafka и т.д.)

Требования к сервисам:

- Необходимо поместить каждый сервис в отдельный докер контейнер (Dockerfile).
- Каждый сервис должен содержать отдельный Http сервер.
- Каждый сервис должен работать со своей базой данных.
- Уметь горизонтально масштабироваться (одновременно может быть запущено 1 + n копий сервиса).

Плюсом будет:

- Подключение автоматизированной документации (Swagger / AsyncApi).

<aside>
✅ Можно использовать:

</aside>

- Fastify / Express для Http сервера
- NodeJS
- Базы данных MySQL, *PostgreSQL
- ORM-фреймворки (TypeORM / *Sequelize)
- Месседж брокеры RabbitMQ, *Kafka или др.

***** - предпочтительнее использовать

<aside>
❌ Нельзя использовать:

</aside>

- NestJS
</details>

**Решение:**

[Документация сервиса Users (Swagger)](https://app.swaggerhub.com/apis/ROMANKUBASOV/APIWelbexServiceUsers/1.0.0)

[Документация сервиса Posts (Swagger)](https://app.swaggerhub.com/apis/ROMANKUBASOV/APIWelbexServicePosts/1.0.0)

Новый пользователь может зарегистрироваться, нужно ввести login (является уникальным), email и пароль. Автоматически ему присваивается роль User.
Пользователь может авторизоваться, нужно ввести login и пароль.
После регистрации и авторизации пользователь получает access JWToken, использую который он получает доступ к остальным сервисам.
Пользователь может выйти из своей учетной записи, в этом случае его JWToken дактивируется.

Администратор может просматривать список пользователей (login, email), также изменять email пользователей и удалять пользователей. Запрещено удалять администратора.

Все пользователи (в т.ч. неавторизованные) могут просматривать посты. Авторизованным пользователям доступна возможность создания новых, редактирования и удаления постов. Пользователь может редактировать и удалять только свои посты. Можно редактировать только текст самого поста.

Техническая реализация: каждый сервис на отдельном сервере и в отдельном контейнере Docker, у каждого сервиса своя БД. БД внешние - вне контейнеров.


**Трудности:**

Есть несколько проверок, которые хотелось бы добавить:

1. Деактивация токенов пользователя при новой авторизации (выдаче нового токена).

<details>
<summary>вероятное решение</summary>
- скорее всего бы добавил в таблицу tokens поле id, при выдаче нового токена, удалял бы все токены из этой таблицы по id.
</details>

2. Удаление токенов пользователя при удалении этого пользователя Администратором

<details>
<summary>вероятное решение</summary>
- аналогично, скорее всего бы добавил в таблицу tokens поле id, при удалении пользователя, удалял бы все токены из этой таблицы по id.
</details>

3. Выдача Refresh JWTokens

Также не успел реализовать сервис отправки Email сообщений с помощью Kafka. Решил больше времени потратить на документирование в Swagger.
