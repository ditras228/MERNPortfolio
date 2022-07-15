package user

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/ztrue/tracerr"
	"os"
	"portfolio/graph/model"
	"portfolio/infrastructure/postgresql"
	"portfolio/internal/user"
	"time"
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
		return model.NotFoundError{Message: "Пользователь не найден"}, nil
	}

	if usr.Login == input.Login && usr.Password != input.Password {
		return model.WrongPassword{Message: "Неверный пароль"}, nil
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		ExpiresAt: time.Now().Add(time.Hour).Unix(),
		Subject:   usr.Login,
	})

	jwtSecret, exists := os.LookupEnv("jwt_secret")
	fmt.Println(exists)
	fmt.Println(jwtSecret)

	if exists {
		signingString, err := token.SignedString([]byte(jwtSecret))
		if err != nil {
			return nil, err
		}
		usr.AccessToken = signingString
	}

	return usr, nil
}
func NewRepository(client postgres.Client) user.Repository {
	return &repository{
		client: client,
	}
}
