CREATE TABLE public.tag
(
    id    SERIAL UNIQUE PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO public.tag(title)
VALUES ('Angular'),
       ('GraphQL'),
       ('React'),
       ('NextJS'),
       ('Express'),
       ('NestJS'),
       ('NodeJS');

CREATE TABLE public.worktag
(
    id     SERIAL UNIQUE PRIMARY KEY,
    workId INT NOT NULL REFERENCES public.work (id),
    tagId  INT NOT NULL REFERENCES public.tag (id)
);

INSERT INTO public.worktag(workId, tagId)
VALUES (1, 1),
       (1, 2),

       (2, 4),
       (2, 6),
       (2, 7),

       (3, 3),
       (3, 5),
       (3, 7);
