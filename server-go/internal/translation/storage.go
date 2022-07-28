package translation

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindOne(ctx context.Context) (model.GetTranslate, error)
}
