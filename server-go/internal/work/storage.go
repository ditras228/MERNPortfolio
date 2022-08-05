package work

import (
	"context"
	"portfolio/graph/model"
)

func GetWorkToDTO(work model.GetWork, name, desc model.GetTranslations, tags []*model.GetTag) model.GetWork {
	work.Name = &name
	work.Description = &desc
	work.Tags = tags
	return work
}

type Repository interface {
	FindAll(ctx context.Context) ([]*model.GetWork, error)
	CreateWork(ctx context.Context, input model.CreateWorkInput) (model.GetWork, error)
	UpdateWork(ctx context.Context, input model.UpdateWorkInput) (model.UpdateWorkOutput, error)
	DeleteWork(ctx context.Context, input model.DeleteWorkInput) (model.DeleteWorkOutput, error)
}
