package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"portfolio/container"
	"portfolio/middlewares/keys"
)

func MiddleWare() func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			token := request.Header.Get("Authorization")
			locale := request.Header.Get("Locale")
			fmt.Println(token)
			res, err := container.UserRepository.GetOne(request.Context(), 1)
			if err != nil {
				fmt.Errorf(err.Error())
			}

			ctx := context.WithValue(request.Context(), keys.UserCtxKey, res)
			localeCtx := context.WithValue(request.Context(), keys.LocaleCtxKey, locale)

			request = request.WithContext(ctx)
			request = request.WithContext(localeCtx)
			next.ServeHTTP(writer, request)
		})
	}
}
