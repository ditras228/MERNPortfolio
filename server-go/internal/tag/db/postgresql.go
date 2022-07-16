package tag

import (
	"context"
	"fmt"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/tag"
	"strconv"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindAll(ctx context.Context) ([]*model.GetTag, error) {
	q := `
		SELECT 
			id, title

		FROM public.tag 
		`
	rows, err := r.client.Query(ctx, q)

	if err != nil {
		return nil, err
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
func removeByIndex(array []*model.GetTag, index int) []*model.GetTag {
	return append(array[:index], array[index+1:]...)
}
func (r *repository) Find(ctx context.Context) ([]*model.GetTag, error) {
	qWorkTags := `
		SELECT
			id, workid, tagid
	
		FROM public.workTag
		`

	qTags := `
		SELECT 
			id

		FROM public.tag 
		`

	rows, err := r.client.Query(ctx, qWorkTags)
	tags := make([]*model.GetWorkTag, 0)
	for rows.Next() {
		var wrk model.GetWorkTag

		err = rows.Scan(&wrk.ID, &wrk.WorkID, &wrk.TagID)
		if err != nil {
			return nil, err
		}
		if wrk.WorkID == 0 {
			tags = append(tags, &wrk)
		}

	}

	for i := 0; i < len(tags); i++ {
		if i == 0 {
			qTags = qTags + " WHERE id != " + strconv.Itoa(tags[i].TagID)
		}
		qTags = qTags + " AND id != " + strconv.Itoa(tags[i].TagID)
	}
	fmt.Println(qTags)

	rows2, err := r.client.Query(ctx, qTags)
	tags2 := make([]*model.GetTag, 0)
	for rows2.Next() {
		var wrk2 model.GetTag

		err = rows2.Scan(&wrk2.ID)
		if err != nil {
			return nil, err
		}

		tags2 = append(tags2, &wrk2)

	}

	return tags2, nil
}

func NewRepository(client postgres.Client) tag.Repository {
	return &repository{
		client: client,
	}
}
