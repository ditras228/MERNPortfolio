package work

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindAll(ctx context.Context) ([]*model.GetWork, error)
	CreateWork(ctx context.Context, input model.CreateWorkInput) (model.GetWork, error)
	UpdateWork(ctx context.Context, input model.UpdateWorkInput) (model.UpdateWorkOutput, error)
	DeleteWork(ctx context.Context, input model.DeleteWorkInput) (model.DeleteWorkOutput, error)
}
