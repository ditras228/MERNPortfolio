package desc

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindAll(ctx context.Context) (model.GetDescOutput, error)
	Update(ctx context.Context, input model.UpdateDescInput) (model.UpdateDescOutput, error)
	Create(ctx context.Context, input model.CreateDescInput) (model.CreateDescOutput, error)
	Delete(ctx context.Context, input model.DeleteDescInput) (model.DeleteDescOutput, error)
}
