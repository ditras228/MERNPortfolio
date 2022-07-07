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
        '<ul> <li> опыт коммерческой разработки в команде </li> <li> исправлял и разрабатывал функционал на Angular </li> <li> разрабатывал API с использованием GraphQl </li> <li> разрабатывал серверную логику на Go </li> <li> отличные навыки верстки, опыт работы с Figma </li> </ul>',
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
        '<ul> <li> Загрузка, поиск, скачивание файлов, либо папок </li> <li> Система drag & drop </li> <li> Рекурсивная загрузка папок на сервер </li> <li> Система авторизации </li> <li> Рассылка писем на Email </li> </ul>',
        'https://github.com/ditras228/cloud-disk',
        'http://localhost:4201');

INSERT INTO public.work(id, name, tags, description, github, demo)

VALUES (1, 'Музыкальная платформа',
        'MongoDB
        ExpressJS
        ReactJS
        NodeJS',
        '<ul> <li> Загрузка, комментирование треков </li> <li> Группировка по плейлистам </li> <li> Авторизация с помощью OAuth </li> <li> Server Side Rendering </li> <li> Переключение дневной/ночной тем </li> </ul>',
        'https://github.com/ditras228/cloud-disk',
        'http://localhost:5432');

INSERT INTO public.work(id, name, tags, description, github, demo)

VALUES (2, 'Портфолио',
        'Angular
        GraphQL
        Golang',
        '<ul> <li> Презентация работ </li> <li> Админпанель </li> <li> Gqlgen </li>  </ul>',
        'https://github.com/ditras228/MERNPortfolio',
        'http://localhost:4200')