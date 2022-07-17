CREATE TABLE public.desc
(
    id     INT GENERATED ALWAYS AS IDENTITY,
    text   TEXT NOT NULL,
    imgUrl TEXT NOT NULL
);

INSERT INTO public.desc(text, imgUrl)
VALUES ( 'Созданием сайтов занимаюсь более <b>трёх</b> лет', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'),
       ( 'ANGULAR', 'https://cdn4.telegram-cdn.org/file/kH5Fb6TuR6qtyuOGTrJ1FNjbRk57w5-VEmnOqBM9IThvbCFbZ9MrRnVy12FIUbjt6G6i2pwY1hUycfvjvfoJ8oPuRu7xQh72eMTWyPq0MkpGfbWLfoA0A7kbOWfFmPPDMhmhXx-ZjwArdem4S19jFLp5gM1GhBJxAq9Mgj2Wx3pQknxzwP82DPjclXE2a-NNNn_pw11PWVfFY4f7BjInf6vrT6sYFDnW0YxAHvhMsmgID1gjvEt_kTJJ7PDfQ6h6FZAHmkiEv8AEM3Vlkqq63loP33rSoDyrkS5hTFDa5Qs4tjSkGQxsJ8VeqidMs9FHimNAfV7Y-ohjVxJfUMGC3g.jpg"')

