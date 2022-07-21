CREATE TABLE public.user
(
    id       SERIAL UNIQUE PRIMARY KEY,
    login     TEXT NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO public.user(id, login, password)
VALUES (0, 'admin', 'admin')
