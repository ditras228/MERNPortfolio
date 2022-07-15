package info

import (
	"context"
	"portfolio/graph/model"
	modeld "portfolio/graph/model/GetInfo"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/info"
	"portfolio/pkg/utils"
)

type repository struct {
	client postgres.Client
}

func (r *repository) UpdateInfo(ctx context.Context) (model.GetInfo, error) {
	info2, err := r.FindOne(ctx)
	if err != nil {
		return model.GetInfo{}, err
	}
	return info2, nil
}
func (r *repository) FindOne(ctx context.Context) (model.GetInfo, error) {
	q := `
		SELECT 
			name, job, description, experience,
			telegram, github 

		FROM public.info 

		WHERE 
			id = 0
		`

	var inf modeld.GetInfoModel

	err := r.client.QueryRow(ctx, q).Scan(
		&inf.Name, &inf.Job,
		&inf.Desc, &inf.Experience,
		&inf.Telegram, &inf.Github,
	)
	if err != nil {
		return model.GetInfo{}, err
	}
	var infModel model.GetInfo

	// Transfer to DTO
	infModel.Name = inf.Name
	infModel.Desc = inf.Desc
	infModel.Job = inf.Job

	infModel.Experience = utils.FormatHTML(inf.Experience)

	infModel.Contacts = &model.Contacts{
		Telegram: inf.Telegram,
		Github:   inf.Github,
	}

	return infModel, nil
}
func NewRepository(client postgres.Client) info.Repository {
	return &repository{
		client: client,
	}
}
