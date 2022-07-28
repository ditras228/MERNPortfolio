CREATE TABLE public.locales
(
    id   SERIAL UNIQUE PRIMARY KEY,
    name TEXT
);
INSERT INTO public.locales(name)
VALUES ('EN'),
       ('RU');

CREATE TABLE public.translation
(
    id                SERIAL UNIQUE PRIMARY KEY,
    translateId       INT,
    translateEntityId INT,
    locale            INT REFERENCES public.locales("id"),
    field             TEXT
);

INSERT INTO public.translation(translateId, translateEntityId, locale, field)
VALUES (1, 1, 1, 'Привет, мир')


