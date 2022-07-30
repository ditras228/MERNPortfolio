package translation

import (
	"context"
	"fmt"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/translation"
	"portfolio/middlewares/keys"
)

type repository struct {
	client postgres.Client
}

//
//func (r *repository) FindOne(ctx context.Context, translateId, entity int) (model.GetTranslate, error) {
//	qTranslate := `
//
//		SELECT
//			locale, field
//
//		FROM
//			public.translation
//
//		WHERE
//			translateId = $1 AND entityId = $2
//
//		`
//
//	translatesRows, err := r.client.Query(ctx, qTranslate, translateId, entity)
//	if err != nil {
//		return model.GetTranslate{}, err
//	}
//
//	translates := make([]*model.Translation, 0)
//	for translatesRows.Next() {
//		var trn model.Translation
//		err = translatesRows.Scan(&trn.Locale, &trn.Field)
//
//		if err != nil {
//			return model.GetTranslate{}, err
//		}
//		translates = append(translates, &trn)
//	}
//	return model.GetTranslate{Translations: translates}, err
//}
func (r *repository) FindOne(ctx context.Context, translateId, entity int, origValue string) (string, error) {
	qTranslate := `

		SELECT 
			field

		FROM 
			public.translation

		WHERE 
			translateId = $1 AND entityId = $2 AND locale = $3

		`

	var translate string
	row := r.client.QueryRow(ctx, qTranslate, translateId, entity, keys.LocaleForContext(ctx))
	fmt.Println(keys.LocaleForContext(ctx))
	fmt.Println("123")
	err := row.Scan(&translate)

	if translate == "" {
		return origValue, nil
	}

	return translate, err
}
func NewRepository(client postgres.Client) translation.Repository {
	return &repository{
		client: client,
	}
}
