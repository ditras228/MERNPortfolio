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
    id     INT GENERATED ALWAYS AS IDENTITY,
    workId INT NOT NULL REFERENCES public.work (id),
    tagId  INT NOT NULL REFERENCES public.tag (id)
);

INSERT INTO public.worktag(workId, tagId)
VALUES (0, 0),
       (0, 1),

       (1, 3),
       (1, 5),
       (1, 6),

       (2, 2),
       (2, 4),
       (2, 6);
