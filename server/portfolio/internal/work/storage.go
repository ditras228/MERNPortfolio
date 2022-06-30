package work

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindAll(ctx context.Context) ([]*model.Work, error)
}
