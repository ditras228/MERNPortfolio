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
    entityId INT,
    locale            INT REFERENCES public.locales("id"),
    field             TEXT
);

INSERT INTO public.translation(translateId, entityId, locale, field)
VALUES
--     Инфо
       (1, 1, 1, 'Dmitrii Druzhinin'),
       (1, 2, 1, '<ul> <li>commercial experience <br/> early development </li> <li>usage and development<br/>functionality in Angular </li> <li>API development with <br/>using GraphQl </li> <li> developed server-side<br/> logic in Golang </li> </ul>'),

--     Карусель
       (1, 3, 1, 'I''ve been creating websites for more than three years'),
       (2, 3, 1, 'Worked with many front-end frameworks: <b>Angular, Next, Vue</b>'),
       (3, 3, 1, 'In addition to server and client logic, I also practice layout'),
       (4, 3, 1, 'On the backend I use <b>Golang</b>. Worked with different types of db'),

--     Работы
       (1, 20, 1, 'Cloud storage'),
       (1, 21, 1, '<ul> <li> Upload, search, download<br/> files or folders </li> <li> Recursively upload folders, <br> download using a ZIP archive </li> <li> Drag & drop system </li> <li> Authorization system </li> <li> Email newsletter </li> </ul>'),

       (2, 20, 1, 'Music platform'),
       (2, 21, 1, '<ul> <li> Loading, commenting tracks </li> <li> Grouping by playlists </li> <li> Authorization using OAuth </li> <li> Server Side Rendering </li> <li> Switching day and night themes </li> </ul>'),

       (3, 20, 1, 'Portfolio'),
       (3, 21, 1, '<ul> <li> Presentation of works, section "about me" </li> <li> Admin: CRUD of all data provided on the site </li> <li> Original UI/UX design , Mobile first </li><li>Switch languages, edit translations</li></ul>');

