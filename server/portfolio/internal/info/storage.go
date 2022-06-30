package info

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindOne(ctx context.Context) (model.Info, error)
	EditInfo(ctx context.Context) (model.Info, error)
}
