package desc

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindAll(ctx context.Context) (model.GetDescOutput, error)
	UpdateDesc(ctx context.Context, input model.UpdateDescInput) (model.UpdateDescOutput, error)
	CreateDesc(ctx context.Context, input model.CreateDescInput) (model.CreateDescOutput, error)
	DeleteDesc(ctx context.Context, input model.DeleteDescInput) (model.DeleteDescOutput, error)
}
