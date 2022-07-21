package desc

import (
	"context"
	"os"
	"portfolio/graph/model"
	postgres "portfolio/infrastructure/postgresql"
	"portfolio/internal/desc"
	"portfolio/pkg/utils"
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
func (r *repository) Update(ctx context.Context, input model.UpdateDescInput) (model.UpdateDescOutput, error) {
	qImgUrl := `
				SELECT 
					imgUrl
				
				FROM 
					public.desc

				WHERE id = $1
`
	var oldLink string
	err := r.client.
		QueryRow(ctx, qImgUrl, input.ID).
		Scan(&oldLink)

	err = os.Remove(oldLink)

	qDesc := `

				UPDATE
					public.desc
				
				SET 
					text = $2, imgUrl = $3

				WHERE 
					id = $1

				RETURNING
					id, text, imgUrl

			 `

	var dsc model.GetDesc

	link, err := utils.SaveImage(input.ImgURL)
	if err != nil {
		return nil, err
	}
	err = r.client.
		QueryRow(ctx, qDesc, input.ID, input.Text, link).
		Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)
	if err != nil {
		return nil, err
	}

	return dsc, nil
}

func (r *repository) Create(ctx context.Context, input model.CreateDescInput) (model.CreateDescOutput, error) {
	qDesc := `

				INSERT INTO 
					public.desc (text, imgurl)

				VALUES ($1, $2)

				RETURNING id, text, imgurl

			 `
	var dsc model.GetDesc
	link, err := utils.SaveImage(input.ImgURL)
	if err != nil {
		return nil, err
	}
	err = r.client.
		QueryRow(ctx, qDesc, input.Text, link).
		Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)

	if err != nil {
		return nil, err
	}
	return dsc, nil
}

func (r *repository) Delete(ctx context.Context, input model.DeleteDescInput) (model.DeleteDescOutput, error) {
	qDesc := `

			DELETE FROM 
				public.desc
	
			WHERE 
				id = $1

			RETURNING 
				id, text, imgUrl

			`

	var dsc model.GetDesc

	err := r.client.
		QueryRow(ctx, qDesc, input.ID).
		Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)
	if err != nil {
		return nil, err
	}
	return nil, nil
}
func NewRepository(client postgres.Client) desc.Repository {
	return &repository{
		client: client,
	}
}
