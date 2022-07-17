CREATE TABLE public.tag
(
    id    SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO public.tag(id, title)
VALUES (0, 'Angular'),
       (1, 'GraphQL'),
       (2, 'React'),
       (3, 'NextJS'),
       (4, 'Express'),
       (5, 'NestJS'),
       (6, 'NodeJS');

CREATE TABLE public.worktag
(
    id     SERIAL PRIMARY KEY,
    workId INT NOT NULL REFERENCES public.work (id),
    tagId  INT NOT NULL REFERENCES public.tag (id)
);

INSERT INTO public.worktag(id, workId, tagId)
VALUES (0, 0, 0),
       (1, 0, 1),

       (2, 1, 3),
       (3, 1, 5),
       (4, 1, 6),

       (5, 2, 2),
       (6, 2, 4),
       (7, 2, 6);
