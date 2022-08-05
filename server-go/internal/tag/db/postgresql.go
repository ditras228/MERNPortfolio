package tag

import (
	"context"
	"github.com/ztrue/tracerr"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/tag"
	"strconv"
	"strings"
)

type repository struct {
	client postgres.Client
}

func (r *repository) Create(ctx context.Context, workId int, tags []int) ([]*model.GetTag, error) {
	qAddTags := `

				INSERT INTO 
					public.workTag (workID, tagID) 
				
				VALUES 

				`

	for i := 0; i < len(tags); i++ {
		var values []string
		values = append(values,
			strconv.Itoa(workId),
			strconv.Itoa(tags[i]))

		valuesStr := strings.Join(values, "', '")
		var qAddTranslationItem = "('" + valuesStr + "'),"
		qAddTags = qAddTags + qAddTranslationItem
	}
	qAddTags = qAddTags[0 : len(qAddTags)-1]

	rows, err := r.client.Query(ctx, qAddTags)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	resTags, err := r.FindOne(ctx, workId)
	if err != nil {
		return nil, tracerr.Errorf("Не удалось найти теги: %s", err)
	}
	return resTags, err
}

func (r *repository) UpdateOne(ctx context.Context, workId int, tagsId []int) ([]*model.GetTag, error) {
	_, err := r.Delete(ctx, workId)
	if err != nil {
		return nil, tracerr.Errorf("Не удалось удалить теги: %s", err)
	}

	tags, err := r.Create(ctx, workId, tagsId)
	if err != nil {
		return nil, err
	}

	return tags, nil
}

func (r *repository) Delete(ctx context.Context, workId int) ([]*int, error) {
	qDeleteTags := `

					DELETE FROM
						public.workTag
			
					WHERE 
						workID = $1
					
					RETURNING 
						ID

					`

	rows, err := r.client.Query(ctx, qDeleteTags, workId)
	if err != nil {
		return nil, tracerr.Errorf("Не удалось удалить теги: %s", err)
	}
	ids := make([]*int, 0)
	for rows.Next() {
		var id int
		err := rows.Scan(&id)
		if err != nil {
			return nil, err
		}
		ids = append(ids, &id)
	}

	return ids, nil
}

func (r *repository) FindOne(ctx context.Context, workId int) (tags []*model.GetTag, err error) {
	qWorkTag := `

					SELECT 
						ID, workID, tagID
			
					FROM 
						public.workTag 

					WHERE 
						workID = $1

					`

	workTagRows, err := r.client.Query(ctx, qWorkTag, &workId)
	if err != nil {
		return nil, tracerr.Errorf("Не удалось найти теги: %s", err)
	}

	tags = make([]*model.GetTag, 0)
	for workTagRows.Next() {
		var wrkTg model.GetWorkTag
		err = workTagRows.Scan(&wrkTg.ID, &wrkTg.WorkID, &wrkTg.TagID)
		if err != nil {
			return nil, err
		}

		qTag := `

					SELECT
						ID, title
		
					FROM 
						public.tag

					WHERE 
						ID = $1

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

	}
	defer workTagRows.Close()
	return tags, nil

}

func (r *repository) FindAll(ctx context.Context) ([]*model.GetTag, error) {
	q := `

		SELECT 
			ID, title

		FROM public.tag 

		`
	rows, err := r.client.Query(ctx, q)

	if err != nil {
		return nil, tracerr.Errorf("Не удалось найти все теги: %s", err)
	}
	tags := make([]*model.GetTag, 0)
	for rows.Next() {
		var wrk model.GetTag

		err = rows.Scan(&wrk.ID, &wrk.Title)
		if err != nil {
			return nil, err
		}

		tags = append(tags, &wrk)

	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return tags, nil
}

func NewRepository(client postgres.Client) tag.Repository {
	return &repository{
		client: client,
	}
}
