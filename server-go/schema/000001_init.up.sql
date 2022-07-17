CREATE TABLE public.info
(
    id            INT PRIMARY KEY,
    name          TEXT NOT NULL,
    job           TEXT NOT NULL,
    experience    TEXT NOT NULL,
    telegramTitle TEXT NOT NULL,
    telegramLink  TEXT NOT NULL,
    githubTitle   TEXT NOT NULL,
    githubLink    TEXT NOT NULL
);

INSERT INTO public.info(id, name, job, experience, telegramTitle, telegramLink, githubTitle, githubLink)
VALUES (0, 'Дмитрий Дружинин', 'Middle Fullstack',
        '<ul> <li> коммерческой опыт <br/> разработки в команде </li> <li> исправлял и разрабатывал<br/> функционал на Angular </li> <li> разрабатывал API с <br/>использованием GraphQl </li> <li> разрабатывал серверную<br/> логику на Golang </li> </ul>',
        '+7 (911) 878-03-02',
        'https://t.me/Ditras',
        'ditras228',
        'https://github.com/ditras228');


CREATE TABLE public.work
(
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    github      TEXT NOT NULL,
    demo        TEXT NOT NULL,
    figma       TEXT
);

INSERT INTO public.work(id, name, description, github, demo)

VALUES (0, 'Облачное хранилище',
        '<ul> <li> Загрузка, поиск, скачивание<br/> файлов, либо папок </li>  <li> Рекурсивная загрузка папок на сервер, скачивание с помощью ZIP-архива </li> <li> Система drag & drop, как в проводнике </li> <li> Система авторизации </li> <li> Рассылка писем на email </li> </ul>',
        'https://github.com/ditras228/cloud-disk',
        'http://localhost:4201'),
       (1, 'Музыкальная платформа',
        '<ul> <li> Загрузка, комментирование треков </li> <li> Группировка по плейлистам </li> <li> Авторизация с помощью OAuth </li> <li> Server Side Rendering </li> <li> Переключение дневной и ночной тем </li> </ul>',
        'https://github.com/ditras228/cloud-disk',
        'http://localhost:5432'),
       (2, 'Портфолио',
        '<ul> <li> Презентация работ, раздел «обо мне» </li> <li> Админпанель: редактирование всех<br/> данных, предоставленных на сайте </li> </ul>',
        'https://github.com/ditras228/MERNPortfolio',
        'http://localhost:4200')