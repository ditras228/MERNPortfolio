CREATE TABLE public.desc
(
    id     SERIAL UNIQUE PRIMARY KEY,
    text   TEXT NOT NULL,
    img    TEXT NOT NULL
);

INSERT INTO public.desc(text, img)
VALUES ( 'Созданием сайтов занимаюсь более трёх лет', 'uploaded/e9b2fe8c-0aad-11ed-8284-7412b3c0b125.png'),
       ( 'Работал с множеством фронтенд-фреймворков: <b>Angular, Next, Vue</b>', 'uploaded/d489e051-0aad-11ed-8284-7412b3c0b125.png'),
       ( 'Кроме серверной и клиентской логики, также практикую верстку', 'uploaded/dbae8256-0aad-11ed-8284-7412b3c0b125.png'),
       ( 'На бэкенде использую <b>Golang</b>. Работал с разными видами БД', 'uploaded/e3269f11-0aad-11ed-8284-7412b3c0b125.png');

