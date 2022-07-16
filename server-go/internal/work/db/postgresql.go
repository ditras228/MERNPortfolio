package work

import (
	"context"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/work"
	"portfolio/pkg/utils"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindAll(ctx context.Context) ([]*model.GetWork, error) {
	q := `

		SELECT 
			id, name, description,
			github, demo

		FROM public.work 

		`
	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, err
	}

	works := make([]*model.GetWork, 0)
	for rows.Next() {
		var wrk model.GetWork

		err = rows.Scan(&wrk.ID, &wrk.Name, &wrk.Description,
			&wrk.Github, &wrk.Demo)
		if err != nil {
			return nil, err
		}

		wrk.Description = utils.FormatHTML(wrk.Description)

		qWorkTag := `

					SELECT 
						id, workid, tagid
			
					FROM 
						public.worktag 

					WHERE 
						workid = $1

					`
		rows2, err := r.client.Query(ctx, qWorkTag, &wrk.ID)
		if err != nil {
			return nil, err
		}

		tags := make([]*model.GetTag, 0)
		for rows2.Next() {
			var wrkTg model.GetWorkTag
			err = rows2.Scan(&wrkTg.ID, &wrkTg.WorkID, &wrkTg.TagID)
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

			rows3, err := r.client.Query(ctx, qTag, &wrkTg.TagID)
			if err != nil {
				return nil, err
			}

			for rows3.Next() {
				var tg model.GetTag
				err = rows3.Scan(&tg.ID, &tg.Title)
				if err != nil {
					return nil, err
				}
				tags = append(tags, &tg)

			}
			wrk.Tags = tags

		}

		works = append(works, &wrk)

	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return works, nil
}

func (r *repository) UpdateWork(ctx context.Context, input model.UpdateWorkInput) (model.GetWork, error) {
	q := `

		UPDATE
			public.work

		SET
			name = $2, description = $3,
			github = $4, demo = $5

		WHERE 
			id = $1

		RETURNING 
			id, name, description, github, demo

		`
	var wrk model.GetWork

	err := r.client.QueryRow(ctx, q, input.ID, input.Name, input.Description, input.Github, input.Demo).Scan(&wrk.ID, &wrk.Name, &wrk.Description, &wrk.Github, &wrk.Demo)
	if err != nil {
		return model.GetWork{}, err
	}

	return wrk, nil
}
func NewRepository(client postgres.Client) work.Repository {
	return &repository{
		client: client,
	}
}
