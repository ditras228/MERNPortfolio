package user

import (
	"context"
	"github.com/ztrue/tracerr"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/user"
)

type repository struct {
	client postgres.Client
}

func (r *repository) Auth(ctx context.Context, input model.UserInput) (model.UserOutput, error) {
	if input.Login == "" {
		return nil, tracerr.Errorf("Логин не может быть пустым")
	}
	if input.Password == "" {
		return nil, tracerr.Errorf("Пароль не может быть пустым")
	}

	q := `
		SELECT 
			login, password

		FROM public.user

		WHERE login = $1
		`

	var usr model.User
	row := r.client.QueryRow(ctx, q, input.Login)

	err := row.Scan(&usr.Login, &usr.Password)
	if err != nil {
		return nil, tracerr.Errorf("Unexpected error: ", err.Error())
	}

	if usr.Login == input.Login && usr.Password != input.Password {
		return nil, tracerr.Errorf("Неверный пароль")
	}

	return usr, nil
}
func NewRepository(client postgres.Client) user.Repository {
	return &repository{
		client: client,
	}
}
