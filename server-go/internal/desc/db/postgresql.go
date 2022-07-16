package desc

import (
	"context"
	"portfolio/graph/model"
	postgres "portfolio/infrastructure/postgresql"
	"portfolio/internal/desc"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindAll(ctx context.Context) (model.GetDescOutput, error) {
	q := `

			SELECT 
				id, text, imgUrl

			FROM public.desc

		 `
	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return model.UnexpectedError{Message: err.Error()}, nil
	}
	var res model.GetDescResult
	descs := make([]*model.GetDesc, 0)
	for rows.Next() {
		var dsc model.GetDesc
		err := rows.Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)
		if err != nil {
			return nil, nil
		}
		descs = append(descs, &dsc)
	}
	res.Desc = descs
	return res, nil
}
func NewRepository(client postgres.Client) desc.Repository {
	return &repository{
		client: client,
	}
}
