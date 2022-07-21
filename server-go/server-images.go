package main

import (
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	fileServer := http.FileServer(http.Dir("./uploaded/"))

	mux.Handle("/uploaded/", http.StripPrefix("/uploaded", fileServer))
	log.Println("Запуск сервера на http://127.0.0.1:4000/")
	err := http.ListenAndServe(":4000", mux)
	log.Fatal(err)
}
