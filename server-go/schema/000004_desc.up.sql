CREATE TABLE public.desc
(
    id     SERIAL PRIMARY KEY,
    text   TEXT NOT NULL,
    imgUrl TEXT NOT NULL
);

INSERT INTO public.desc(id, text, imgUrl)
VALUES (0, 'Созданием сайтов занимаюсь более <b>трёх</b> лет', 'https://place-hold.it/76"'),
       (1, 'ANGULAR', 'https://place-hold.it/76"')

