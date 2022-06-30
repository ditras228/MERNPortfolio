package info

import (
	"context"
	"portfolio/graph/model"
	"portfolio/internal/info"
	"portfolio/postgresql"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindOne(ctx context.Context) (model.Info, error) {
	q := `SELECT job FROM public.info WHERE id = 0`

	var inf model.Info

	err := r.client.QueryRow(ctx, q).Scan(&inf.Job)
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
