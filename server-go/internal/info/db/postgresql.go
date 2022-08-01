package info

import (
	"context"
	"github.com/ztrue/tracerr"
	"portfolio/enitity"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/desc"
	"portfolio/internal/info"
	"portfolio/internal/translation"
	"portfolio/middlewares/keys"
	"portfolio/pkg/utils"
)

type repository struct {
	client          postgres.Client
	translationRepo translation.Repository
	descRepo        desc.Repository
}

func (r *repository) UpdateInfo(ctx context.Context, input model.UpdateInfoInput) (model.GetInfo, error) {
	qImg := `
				SELECT 
					img
				
				FROM 
					public.info

				WHERE 
					id = 1
			`

	var oldLink string
	var newLink string

	err := r.client.
		QueryRow(ctx, qImg).
		Scan(&oldLink)

	q := `

		UPDATE
			public.info

		SET
			name = $1, job = $2,  experience = $3,
			telegramtitle = $4, telegramlink = $5, githubtitle = $6, githublink = $7, img = $8

		WHERE 
			id = 1

		RETURNING 
			name, job,  experience,
			telegramtitle, telegramlink, githubtitle, githublink

		`

	var inf model.GetInfo
	var con model.Contacts

	if err != nil {
		return model.GetInfo{}, err
	}
	newLink, err = utils.ReplaceImage(oldLink, input.Img)
	if err != nil {
		return model.GetInfo{}, err
	}

	var name model.GetTranslations
	var exp model.GetTranslations

	var locale = keys.LocaleForContext(ctx) - 1
	err = r.client.QueryRow(ctx, q, input.Name.Translations[locale].Field, input.Job, input.Experience.Translations[locale].Field, input.TelegramTitle, input.TelegramLink, input.GithubTitle, input.GithubLink, newLink).
		Scan(&name.Field, &inf.Job, &exp.Field, &con.TelegramTitle, &con.TelegramLink, &con.GithubTitle, &con.GithubLink)

	nameUpd, err := r.translationRepo.UpdateOne(ctx, input.Name, enitity.InfoTitle, name.Field)
	if err != nil {
		return model.GetInfo{}, err
	}
	expUpd, err := r.translationRepo.UpdateOne(ctx, input.Experience, enitity.InfoExperience, name.Field)
	if err != nil {
		return model.GetInfo{}, err
	}

	descs, err := r.descRepo.FindAll(ctx)
	if err != nil {
		return model.GetInfo{}, err
	}
	inf = info.GetInfoForDTO(nameUpd, expUpd, descs, con, inf.Img, inf.Job)
	return inf, nil
}

func (r *repository) FindOne(ctx context.Context) (model.GetInfo, error) {
	q := `

		SELECT 
			name, job, 
			experience, telegramTitle,
			telegramLink, githubTitle,
			githubLink, img

		FROM 
			public.info 

		WHERE 
			id = 1

		`

	var inf model.GetInfo
	var con model.Contacts

	var name model.GetTranslations
	var exp model.GetTranslations
	err := r.client.QueryRow(ctx, q).Scan(
		&name.Field, &inf.Job, &exp.Field,
		&con.TelegramTitle, &con.TelegramLink, &con.GithubTitle, &con.GithubLink, &inf.Img,
	)
	if err != nil {
		return model.GetInfo{}, err
	}

	descs, err := r.descRepo.FindAll(ctx)
	if err != nil {
		return model.GetInfo{}, tracerr.Errorf("Ошибка получения описаний: ", err)
	}

	infoNameTranslate, err := r.translationRepo.FindOne(ctx, 1, enitity.InfoTitle, name.Field)
	if err != nil {
		return model.GetInfo{}, tracerr.Errorf("Ошибка получения перевода имени: ", err)
	}

	infExperienceTranslate, err := r.translationRepo.FindOne(ctx, 1, enitity.InfoExperience, exp.Field)
	if err != nil {
		return model.GetInfo{}, tracerr.Errorf("Ошибка получения перевода опыта: ", err)
	}

	inf = info.GetInfoForDTO(infoNameTranslate, infExperienceTranslate, descs, con, inf.Img, inf.Job)

	return inf, nil
}
func NewRepository(client postgres.Client, translationRepo translation.Repository, descRepo desc.Repository) info.Repository {
	return &repository{
		client:          client,
		translationRepo: translationRepo,
		descRepo:        descRepo,
	}
}
