package translation

import (
	"context"
	"portfolio/graph/model"
)

type Repository interface {
	FindOne(ctx context.Context, translateId, entityId int, origValue string) (model.GetTranslations, error)
	UpdateOne(ctx context.Context, input *model.UpdateTranslationInput, entityId int, origValue string) (model.GetTranslations, error)
}
