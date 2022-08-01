package work

import (
	"context"
	"portfolio/enitity"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/translation"
	"portfolio/internal/work"
	"strconv"
)

type repository struct {
	client          postgres.Client
	translationRepo translation.Repository
}

func (r *repository) FindAll(ctx context.Context) ([]*model.GetWork, error) {
	qWork := `

		SELECT 
			id, name, description,
			github, demo

		FROM public.work 

		ORDER
			BY id  	

		`
	workRows, err := r.client.Query(ctx, qWork)
	if err != nil {
		return nil, err
	}

	works := make([]*model.GetWork, 0)
	for workRows.Next() {
		var wrk model.GetWork

		err = workRows.Scan(&wrk.ID, &wrk.Name, &wrk.Description,
			&wrk.Github, &wrk.Demo)
		if err != nil {
			return nil, err
		}

		//wrk.Description = utils.FormatHTML(wrk.Description)

		qWorkTag := `

					SELECT 
						id, workid, tagid
			
					FROM 
						public.worktag 

					WHERE 
						workid = $1

					`
		workTagRows, err := r.client.Query(ctx, qWorkTag, &wrk.ID)
		if err != nil {
			return nil, err
		}

		tags := make([]*model.GetTag, 0)
		for workTagRows.Next() {
			var wrkTg model.GetWorkTag
			err = workTagRows.Scan(&wrkTg.ID, &wrkTg.WorkID, &wrkTg.TagID)
			if err != nil {
				return nil, err
			}

			qTag := `

					SELECT
						id, title
		
					FROM 
						public.tag

					WHERE 
						id = $1

					`

			tagRows, err := r.client.Query(ctx, qTag, &wrkTg.TagID)
			if err != nil {
				return nil, err
			}

			for tagRows.Next() {
				var tg model.GetTag
				err = tagRows.Scan(&tg.ID, &tg.Title)

				if err != nil {
					return nil, err
				}

				tags = append(tags, &tg)
			}
			wrk.Tags = tags
		}

		wrkNameTranslate, err := r.translationRepo.FindOne(ctx, wrk.ID, enitity.WorkTitle, wrk.Name)
		if err != nil {
			return nil, err
		}
		wrk.Name = wrkNameTranslate.Field

		wrkDescTranslate, err := r.translationRepo.FindOne(ctx, wrk.ID, enitity.WorkFunctional, wrk.Description)
		if err != nil {
			return nil, err
		}
		wrk.Description = wrkDescTranslate.Field

		works = append(works, &wrk)
	}
	if err != nil {
		return nil, err
	}

	return works, nil
}

func (r *repository) CreateWork(ctx context.Context, input model.CreateWorkInput) (model.GetWork, error) {

	qUpdWork := `

				INSERT INTO
					public.work
					(name, description, github, demo, figma)

				VALUES
					($1,$2,$3,$4,$5)
			
				RETURNING
					id, name, description, github, demo

			   `

	var wrk model.GetWork

	err := r.client.
		QueryRow(ctx, qUpdWork, input.Name, input.Description, input.Github, input.Demo, input.Figma).
		Scan(&wrk.ID, &wrk.Name, &wrk.Description, &wrk.Github, &wrk.Demo)
	if err != nil {
		return model.GetWork{}, err
	}

	qAddTags := `

				INSERT INTO 
					public.worktag (workid, tagid) 
				
				VALUES 

				`

	for i := 0; i < len(input.Tags); i++ {
		var qAddTagsItem = "(" + strconv.Itoa(wrk.ID) + "," + strconv.Itoa(*input.Tags[i]) + ") "

		if i != len(input.Tags)-1 {
			qAddTagsItem = qAddTagsItem + ","
		}
		qAddTags = qAddTags + qAddTagsItem
	}

	res, err := r.client.Query(ctx, qAddTags)
	if err != nil {
		return model.GetWork{}, err
	}
	defer res.Close()

	return wrk, nil
}
func (r *repository) UpdateWork(ctx context.Context, input model.UpdateWorkInput) (model.UpdateWorkOutput, error) {
	qDeleteTags := `

					DELETE FROM
						public.worktag
			
					WHERE 
						workid = $1

					`

	res, err := r.client.Query(ctx, qDeleteTags, input.ID)
	if err != nil {
		return model.GetWork{}, err
	}

	defer res.Close()

	qAddTags := `

				INSERT INTO 
					public.worktag (workid, tagid) 
				
				VALUES 

				`

	for i := 0; i < len(input.Tags); i++ {
		var qAddTagsItem = "(" + strconv.Itoa(input.ID) + "," + strconv.Itoa(*input.Tags[i]) + ") "

		if i != len(input.Tags)-1 {
			qAddTagsItem = qAddTagsItem + ","
		}
		qAddTags = qAddTags + qAddTagsItem
	}

	res, err = r.client.Query(ctx, qAddTags)
	if err != nil {
		return model.GetWork{}, err
	}
	defer res.Close()

	qUpdWork := `

		UPDATE
			public.work

		SET
			name = $2, description = $3,
			github = $4, demo = $5, figma = $6

		WHERE 
			id = $1

		RETURNING 
			id, name, description, github, demo, figma

		`

	var wrk model.GetWork

	err = r.client.
		QueryRow(ctx, qUpdWork, input.ID, input.Name, input.Description, input.Github, input.Demo, input.Figma).
		Scan(&wrk.ID, &wrk.Name, &wrk.Description, &wrk.Github, &wrk.Demo, &wrk.Figma)
	if err == nil {
		return model.NotFoundError{Message: "Работа не найдена", ID: input.ID}, nil
	}

	return wrk, nil
}

func (r *repository) DeleteWork(ctx context.Context, input model.DeleteWorkInput) (model.DeleteWorkOutput, error) {
	qWorkTag := `

			DELETE FROM 
				public.worktag

			WHERE 
				workid = $1

		`

	qWork := `

			DELETE FROM 
				public.work

			WHERE 
				id = $1

			RETURNING 
				id

		`

	var res model.DeleteWorkResult
	r.client.QueryRow(ctx, qWorkTag, input.ID)

	err := r.client.QueryRow(ctx, qWork, input.ID).Scan(&res.ID)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func NewRepository(client postgres.Client, translationRepo translation.Repository) work.Repository {
	return &repository{
		client:          client,
		translationRepo: translationRepo,
	}
}
