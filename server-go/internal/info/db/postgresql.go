package info

import (
	"context"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/info"
)

type repository struct {
	client postgres.Client
}

func (r *repository) EditInfo(ctx context.Context) (model.Info, error) {
	info, err := r.FindOne(ctx)
	if err != nil {
		return model.Info{}, err
	}
	return info, nil
}
func (r *repository) FindOne(ctx context.Context) (model.Info, error) {
	q := `
		SELECT 
			name, job, description, experience,
			telegram, github 

		FROM public.info 

		WHERE 
			id = 0
		`

	var inf model.Info

	err := r.client.QueryRow(ctx, q).Scan(
		&inf.Name, &inf.Job,
		&inf.Desc, &inf.Experience,
		&inf.Telegram, &inf.Github,
	)
	if err != nil {
		return model.Info{}, err
	}
	return inf, nil
}
func NewRepository(client postgres.Client) info.Repository {
	return &repository{
		client: client,
	}
}
