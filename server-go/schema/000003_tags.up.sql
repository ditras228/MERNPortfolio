CREATE TABLE public.tag
(
    id    INT PRIMARY KEY,
    title TEXT NOT NULL
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
    id     INT PRIMARY KEY,
    workId INT NOT NULL,
    tagId  INT NOT NULL
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
