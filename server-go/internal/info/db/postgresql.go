package info

import (
	"context"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/info"
	"portfolio/pkg/utils"
)

type repository struct {
	client postgres.Client
}

func (r *repository) UpdateInfo(ctx context.Context, input model.UpdateInfoInput) (model.GetInfo, error) {
	q := `

		UPDATE
			public.info

		SET
			name = $1, job = $2, description = $3, experience = $4,
			telegramtitle = $5, telegramlink = $6, githubtitle = $7, githublink = $8

		WHERE 
			id = 0

		RETURNING 
			name, job, description, experience,
			telegramtitle, telegramlink, githubtitle, githublink

		`

	var inf model.GetInfo
	var con model.Contacts

	err := r.client.QueryRow(ctx, q, input.Name, input.Job, input.Desc, input.Experience, input.TelegramTitle, input.TelegramLink, input.GithubTitle, input.GithubLink).
		Scan(&inf.Name, &inf.Job, &inf.Desc, &inf.Experience, &con.TelegramTitle, &con.TelegramLink, &con.GithubTitle, &con.GithubLink)
	inf.Contacts = &con
	if err != nil {
		return model.GetInfo{}, err
	}
	return inf, nil
}
func (r *repository) FindOne(ctx context.Context) (model.GetInfo, error) {
	q := `

		SELECT 
			name, job, description, experience,
			telegramTitle, telegramLink, githubTitle, githubLink

		FROM public.info 

		WHERE 
			id = 0

		`

	var inf model.GetInfo
	var con model.Contacts

	err := r.client.QueryRow(ctx, q).Scan(
		&inf.Name, &inf.Job,
		&inf.Desc, &inf.Experience,
		&con.TelegramTitle, &con.TelegramLink, &con.GithubTitle, &con.GithubLink,
	)
	if err != nil {
		return model.GetInfo{}, err
	}

	inf.Contacts = &con
	inf.Experience = utils.FormatHTML(inf.Experience)
	return inf, nil
}
func NewRepository(client postgres.Client) info.Repository {
	return &repository{
		client: client,
	}
}
