package translation

import (
	"context"
)

type Repository interface {
	FindOne(ctx context.Context, translateId, entity int, origValue string) (string, error)
}
