package info

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindOne(ctx context.Context) (model.GetInfo, error)
	UpdateInfo(ctx context.Context, input model.UpdateInfoInput) (model.GetInfo, error)
}
