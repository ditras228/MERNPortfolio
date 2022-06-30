package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"log"
	"net/http"
	"os"
	"portfolio/graph"
	"portfolio/graph/generated"
)

const defaultPort = "8080"

func main() {
	//cfg := config.GetConfig()
	//client, err := postgres.NewClient(context.TODO(), 3, cfg.Storage)
	//if err != nil {
	//	fmt.Println("ааааааааааааааааа")
	//}
	//
	//repository = info.NewRepository(client)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
