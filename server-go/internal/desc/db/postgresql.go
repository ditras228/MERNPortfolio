package desc

import (
	"context"
	"github.com/ztrue/tracerr"
	"os"
	"portfolio/enitity"
	"portfolio/graph/model"
	postgres "portfolio/infrastructure/postgresql"
	"portfolio/internal/desc"
	"portfolio/internal/translation"
	"portfolio/pkg/utils"
)

type repository struct {
	client          postgres.Client
	translationRepo translation.Repository
}

func (r *repository) FindAll(ctx context.Context) ([]*model.GetDesc, error) {
	q := `

			SELECT 
				id, text, img

			FROM 
				public.desc

		 `

	rows, err := r.client.Query(ctx, q)
	if err != nil {
		return nil, tracerr.Errorf("failed to find all descs: %w", err)
	}
	var res []*model.GetDesc
	descs := make([]*model.GetDesc, 0)
	for rows.Next() {
		var dsc model.GetDesc
		err := rows.Scan(&dsc.ID, &dsc.Text, &dsc.Img)
		if err != nil {
			return nil, nil
		}

		dscTextTranslate, err := r.translationRepo.FindOne(ctx, dsc.ID, enitity.InfoDesc, dsc.Text)
		if err != nil {
			return nil, err
		}
		dsc.Text = dscTextTranslate.Field
		descs = append(descs, &dsc)
	}
	res = descs
	return res, nil
}

func (r *repository) UpdateDesc(ctx context.Context, input model.UpdateDescInput) (model.UpdateDescOutput, error) {
	qImg := `

				SELECT 
					img
				
				FROM 
					public.desc

				WHERE 
					id = $1

				`
	var oldLink string
	var newLink string

	err := r.client.
		QueryRow(ctx, qImg, input.ID).
		Scan(&oldLink)
	if err != nil {
		return model.NotFoundError{Message: "Описание не найдено", ID: input.ID}, nil
	}

	var dsc model.GetDesc

	qDesc := `

				UPDATE
					public.desc
				
				SET 
					text = $2, img = $3

				WHERE 
					id = $1

				RETURNING
					id, text, img

			 `

	if oldLink == input.Img {
		newLink = input.Img
	} else {
		err = os.Remove(oldLink)
		newLink, err = utils.SaveImage(input.Img)
		if err != nil {
			return nil, tracerr.Errorf("failed to save image: %w", err)
		}
	}

	err = r.client.
		QueryRow(ctx, qDesc, input.ID, input.Text, newLink).
		Scan(&dsc.ID, &dsc.Text, &dsc.Img)
	if err != nil {
		return nil, tracerr.Errorf("failed to update desc: %w", err)
	}

	return dsc, nil
}

func (r *repository) CreateDesc(ctx context.Context, input model.CreateDescInput) (model.CreateDescOutput, error) {
	qDesc := `

				INSERT INTO 
					public.desc (text, img)

				VALUES
					($1, $2)

				RETURNING
					id, text, img

			 `
	var dsc model.GetDesc
	link, err := utils.SaveImage(input.Img)
	if err != nil {
		return nil, tracerr.Errorf("failed to save image: %w", err)
	}
	err = r.client.
		QueryRow(ctx, qDesc, input.Text, link).
		Scan(&dsc.ID, &dsc.Text, &dsc.Img)

	if err != nil {
		return nil, tracerr.Errorf("failed to create desc: %w", err)
	}
	return dsc, nil
}

func (r *repository) DeleteDesc(ctx context.Context, input model.DeleteDescInput) (model.DeleteDescOutput, error) {
	qDesc := `

			DELETE FROM 
				public.desc
	
			WHERE 
				id = $1

			RETURNING 
				id

			`

	var res model.DeleteDescResult

	err := r.client.
		QueryRow(ctx, qDesc, input.ID).
		Scan(&res.ID)

	if err != nil {
		return model.NotFoundError{Message: "Описание не найдено", ID: input.ID}, nil
	}
	return res, nil
}
func NewRepository(client postgres.Client, translationRepo translation.Repository) desc.Repository {
	return &repository{
		client:          client,
		translationRepo: translationRepo,
	}
}
