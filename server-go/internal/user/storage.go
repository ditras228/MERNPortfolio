package user

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	Auth(ctx context.Context, input model.UserInput) (model.UserOutput, error)
}
