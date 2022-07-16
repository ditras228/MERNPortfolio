package tag

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindAll(ctx context.Context) ([]*model.GetTag, error)
	Find(ctx context.Context) ([]*model.GetTag, error)
}
