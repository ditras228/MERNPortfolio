package translation

import (
	"context"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/translation"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindOne(ctx context.Context) (model.GetTranslate, error) {
	qTranslate := `

		SELECT 
			locale, field

		FROM 
			public.translation

		WHERE 
			id = $1

		`

	translatesRows, err := r.client.Query(ctx, qTranslate, 1)
	if err != nil {
		return model.GetTranslate{}, err
	}

	translates := make([]*model.Translation, 0)
	for translatesRows.Next() {
		var trn model.Translation
		err = translatesRows.Scan(&trn.Locale, &trn.Field)

		if err != nil {
			return model.GetTranslate{}, err
		}
		translates = append(translates, &trn)
	}

	return model.GetTranslate{Translations: translates}, err
}
func NewRepository(client postgres.Client) translation.Repository {
	return &repository{
		client: client,
	}
}
