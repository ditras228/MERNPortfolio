CREATE TABLE public.info
(
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    job         TEXT NOT NULL,
    description TEXT NOT NULL,
    experience  TEXT NOT NULL,
    telegram    TEXT NOT NULL,
    github      TEXT NOT NULL
);

INSERT INTO public.info(id, name, job, description, experience, telegram, github)
VALUES (0, 'Дмитрий Дружинин', 'Middle Fullstack',
        'Созданием сайтов занимаюсь более <b>трёх</b> лет',
        '<ul> <li> коммерческой опыт <br/> разработки в команде </li> <li> исправлял и разрабатывал<br/> функционал на Angular </li> <li> разрабатывал API с <br/>использованием GraphQl </li> <li> разрабатывал серверную<br/> логику на Golang </li> </ul>',
        '+7 (911) 878-03-02',
        'ditras228');


CREATE TABLE public.work
(
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    tags        TEXT NOT NULL,
    description TEXT NOT NULL,
    github      TEXT NOT NULL,
    demo        TEXT NOT NULL,
    figma       TEXT
);

INSERT INTO public.work(id, name, tags, description, github, demo)

VALUES (0, 'Облачное хранилище',
        'MongoDB
        ExpressJS
        ReactJS
        NodeJS',
        '<ul> <li> Загрузка, поиск, скачивание<br/> файлов, либо папок </li>  <li> Рекурсивная загрузка папок на сервер, скачивание с помощью ZIP-архива </li> <li> Система drag & drop, как в проводнике </li> <li> Система авторизации </li> <li> Рассылка писем на email </li> </ul>',
        'https://github.com/ditras228/cloud-disk',
        'http://localhost:4201');

INSERT INTO public.work(id, name, tags, description, github, demo)

VALUES (1, 'Музыкальная платформа',
        'MongoDB
        ExpressJS
        ReactJS
        NodeJS',
        '<ul> <li> Загрузка, комментирование треков </li> <li> Группировка по плейлистам </li> <li> Авторизация с помощью OAuth </li> <li> Server Side Rendering </li> <li> Переключение дневной и ночной тем </li> </ul>',
        'https://github.com/ditras228/cloud-disk',
        'http://localhost:5432');

INSERT INTO public.work(id, name, tags, description, github, demo)

VALUES (2, 'Портфолио',
        'Angular
        GraphQL
        Golang',
        '<ul> <li> Презентация работ, раздел «обо мне» </li> <li> Админпанель: редактирование всех<br/> данных, предоставленных на сайте </li> </ul>',
        'https://github.com/ditras228/MERNPortfolio',
        'http://localhost:4200')