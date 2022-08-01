package info

import (
	"context"
	"portfolio/graph/model"
	"portfolio/pkg/utils"
)

func GetInfoForDTO(name, exp model.GetTranslations, desc []*model.GetDesc, contacts model.Contacts, img, job string) model.GetInfo {
	var info model.GetInfo
	info.Name = &name
	info.Experience = utils.FormatHTML(exp)
	info.Img = img
	info.Job = job
	info.Desc = desc
	info.Contacts = &contacts

	return info
}

type Repository interface {
	FindOne(ctx context.Context) (model.GetInfo, error)
	UpdateInfo(ctx context.Context, input model.UpdateInfoInput) (model.GetInfo, error)
}
