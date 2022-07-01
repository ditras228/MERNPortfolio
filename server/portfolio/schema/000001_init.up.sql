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
        'Созданием сайтов занимаюсь более трёх лет',
        'опыт коммерческой разработки в команде',
        '89118780302',
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
        'Загрузка, поиск, скачивание файлов, либо папок
        Система drag & drop
        Рекурсивная загрузка папок на сервер
        Система авторизации
        Рассылка писем на Email',
        'https://github.com/ditras228/cloud-disk',
        'localhost:4200')