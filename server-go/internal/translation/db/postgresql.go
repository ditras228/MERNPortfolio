package translation

import (
	"context"
	"fmt"
	"github.com/ztrue/tracerr"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/translation"
	"portfolio/middlewares/keys"
	"strconv"
)

type repository struct {
	client postgres.Client
}

func (r *repository) FindOne(ctx context.Context, translateId, entityId int, origValue string) (model.GetTranslations, error) {
	q := `

		SELECT 
			field, locale

		FROM 
			public.translation

		WHERE 
			translateId = $1 AND entityId = $2 

		`

	rows, err := r.client.Query(ctx, q, translateId, entityId)
	if err != nil {
		return model.GetTranslations{}, err
	}

	translations := make([]*model.Translation, 0)
	var newField string
	for rows.Next() {
		var trn model.Translation

		err := rows.Scan(&trn.Field, &trn.Locale)
		if err != nil {
			return model.GetTranslations{}, err
		}

		translations = append(translations, &trn)
		if trn.Locale == keys.LocaleForContext(ctx) {
			newField = trn.Field
		} else {
			newField = origValue
		}
	}
	// На тот случай, если нужно выводить все переводы, а орига в базе нет
	if len(translations) == 1 {
		var mockTranslation model.Translation
		mockTranslation.Locale = 2
		mockTranslation.Field = origValue
		translations = append(translations, &mockTranslation)
	}
	return model.GetTranslations{Field: newField, Translations: translations}, err
}

func (r *repository) UpdateOne(ctx context.Context, input *model.UpdateTranslationInput, entityId int, origValue string) (model.GetTranslations, error) {
	qDelete := `
				DELETE FROM 
					public.translation

				WHERE 
					translateId = $1 AND entityId = $2

				RETURNING
					translateId
  			 `

	var id int
	err := r.client.QueryRow(ctx, qDelete, input.TranslationID, entityId).Scan(&id)

	if err != nil {
		return model.GetTranslations{}, tracerr.Errorf(`Не удалось удалить: `, err)
	}
	qAddTranslations := `
			INSERT INTO 
				public.translation (translateId, entityId, locale, field)

			VALUES

`

	for i := 0; i < len(input.Translations); i++ {
		var qAddTranslationItem = "(" + strconv.Itoa(input.TranslationID) + "," + strconv.Itoa(entityId) + "," + strconv.Itoa(input.Translations[i].Locale) + ", '" + input.Translations[i].Field + "') "

		if i != len(input.Translations)-1 {
			qAddTranslationItem = qAddTranslationItem + ","
		}
		qAddTranslations = qAddTranslations + qAddTranslationItem
		fmt.Println(qAddTranslations)
	}

	rows, err := r.client.Query(ctx, qAddTranslations)
	if err != nil {
		return model.GetTranslations{}, err
	}

	translations := make([]*model.Translation, 0)
	for rows.Next() {
		var trn model.Translation

		err := rows.Scan(&trn.Field, &trn.Locale)
		if err != nil {
			return model.GetTranslations{}, err
		}

		translations = append(translations, &trn)
	}

	return model.GetTranslations{Field: origValue, Translations: translations}, err
}
func NewRepository(client postgres.Client) translation.Repository {
	return &repository{
		client: client,
	}
}
