package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"portfolio/container"
	"portfolio/graph/model"
)

var userCtxKey = &contextKey{"user"}

type contextKey struct {
	name string
}

func MiddleWare() func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			token := request.Header.Get("Authorization")
			fmt.Println(token)
			res, err := container.UserRepository.GetOne(request.Context(), 1)
			if err != nil {
				fmt.Errorf(err.Error())
			}
			fmt.Println(res.Login)
			fmt.Println(res.Login)
			ctx := context.WithValue(request.Context(), userCtxKey, res)

			request = request.WithContext(ctx)
			next.ServeHTTP(writer, request)
		})
	}
}

func ForContext(ctx context.Context) model.User {
	raw := ctx.Value(userCtxKey).(model.User)
	return raw
}
