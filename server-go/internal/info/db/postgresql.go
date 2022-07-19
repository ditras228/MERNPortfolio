package info

import (
	"context"
	"os"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/info"
	"portfolio/pkg/utils"
)

type repository struct {
	client postgres.Client
}

func (r *repository) UpdateInfo(ctx context.Context, input model.UpdateInfoInput) (model.GetInfo, error) {
	qImgUrl := `
				SELECT 
					img
				
				FROM 
					public.info

				WHERE id = 0
`
	q := `

		UPDATE
			public.info

		SET
			name = $1, job = $2,  experience = $3,
			telegramtitle = $4, telegramlink = $5, githubtitle = $6, githublink = $7, img = $8

		WHERE 
			id = 0

		RETURNING 
			name, job,  experience,
			telegramtitle, telegramlink, githubtitle, githublink

		`
	qDesc := `

			SELECT 
				id, text, imgUrl

			FROM public.desc

		 `

	var inf model.GetInfo
	var con model.Contacts

	var oldLink string

	err := r.client.
		QueryRow(ctx, qImgUrl).
		Scan(&oldLink)

	err = os.Remove(oldLink)
	imgLink, err := utils.SaveImage(input.Img)

	err = r.client.QueryRow(ctx, q, input.Name, input.Job, input.Experience, input.TelegramTitle, input.TelegramLink, input.GithubTitle, input.GithubLink, imgLink).
		Scan(&inf.Name, &inf.Job, &inf.Experience, &con.TelegramTitle, &con.TelegramLink, &con.GithubTitle, &con.GithubLink)

	rows, err := r.client.Query(ctx, qDesc)
	if err != nil {
		return model.GetInfo{}, err
	}
	descs := make([]*model.GetDesc, 0)
	for rows.Next() {
		var dsc model.GetDesc
		err := rows.Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)
		if err != nil {
			return model.GetInfo{}, nil
		}
		descs = append(descs, &dsc)
	}
	inf.Desc = descs
	inf.Contacts = &con
	if err != nil {
		return model.GetInfo{}, err
	}

	return inf, nil
}
func (r *repository) FindOne(ctx context.Context) (model.GetInfo, error) {
	q := `

		SELECT 
			name, job,  experience,
			telegramTitle, telegramLink, githubTitle, githubLink, img

		FROM public.info 

		WHERE 
			id = 0

		`

	var inf model.GetInfo
	var con model.Contacts

	err := r.client.QueryRow(ctx, q).Scan(
		&inf.Name, &inf.Job, &inf.Experience,
		&con.TelegramTitle, &con.TelegramLink, &con.GithubTitle, &con.GithubLink, &inf.Img,
	)
	if err != nil {
		return model.GetInfo{}, err
	}

	qDesc := `

			SELECT 
				id, text, imgUrl

			FROM public.desc

			ORDER BY id ASC


		 `
	descRows, err := r.client.Query(ctx, qDesc)
	if err != nil {
		return model.GetInfo{}, err
	}
	descs := make([]*model.GetDesc, 0)
	for descRows.Next() {
		var dsc model.GetDesc
		err := descRows.Scan(&dsc.ID, &dsc.Text, &dsc.ImgURL)
		if err != nil {
			return model.GetInfo{}, nil
		}
		descs = append(descs, &dsc)
	}
	inf.Desc = descs

	inf.Contacts = &con
	inf.Experience = utils.FormatHTML(inf.Experience)
	return inf, nil
}
func NewRepository(client postgres.Client) info.Repository {
	return &repository{
		client: client,
	}
}
