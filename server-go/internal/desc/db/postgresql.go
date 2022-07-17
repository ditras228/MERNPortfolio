package desc

import (
	"context"
	"encoding/base64"
	"errors"
	uuid2 "github.com/gofrs/uuid"
	"os"
	"portfolio/graph/model"
	postgres "portfolio/infrastructure/postgresql"
	"portfolio/internal/desc"
	"strings"
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
	path := "uploaded"

	uuid, err := uuid2.NewV1()
	if err != nil {
		return nil, err
	}
	link := path + "/" + uuid.String() + ".png"

	qImgUrl := `
				SELECT 
					imgUrl
				
				FROM 
					public.desc

				WHERE id = $1
`
	var oldLink string
	err = r.client.
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

	err = r.client.
		QueryRow(ctx, qDesc, input.ID, input.Text, link).
		Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)
	if err != nil {
		return nil, err
	}
	b64data := input.ImgURL[strings.IndexByte(input.ImgURL, ',')+1:]
	dec, err := base64.StdEncoding.DecodeString(b64data)
	if err != nil {
		return nil, err
	}

	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		err = os.Mkdir("uploaded", 0750)
		if err != nil {
			return nil, err
		}
	}

	f, err := os.Create(link)

	if err != nil {
		return nil, err

	}
	defer f.Close()

	if _, err := f.Write(dec); err != nil {
		return nil, err

	}
	if err := f.Sync(); err != nil {
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

	err := r.client.
		QueryRow(ctx, qDesc, input.Text, input.ImgURL).
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
