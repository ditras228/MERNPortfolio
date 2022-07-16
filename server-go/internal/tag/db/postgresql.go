package tag

import (
	"context"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/tag"
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

func NewRepository(client postgres.Client) tag.Repository {
	return &repository{
		client: client,
	}
}
