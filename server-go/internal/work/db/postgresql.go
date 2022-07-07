package work

import (
	"context"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/work"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindAll(ctx context.Context) ([]*model.GetWork, error) {
	q := `
		SELECT 
			id, name, tags, description,
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

		err = rows.Scan(&wrk.ID, &wrk.Name, &wrk.Tags, &wrk.Description,
			&wrk.Github, &wrk.Demo)
		if err != nil {
			return nil, err
		}
		works = append(works, &wrk)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return works, nil
}
func NewRepository(client postgres.Client) work.Repository {
	return &repository{
		client: client,
	}
}
