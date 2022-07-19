package utils

import (
	"encoding/base64"
	"errors"
	uuid2 "github.com/gofrs/uuid"
	"os"
	"regexp"
	"strings"
	"time"
)

func DoWithTries(fn func() error, attemtps int, delay time.Duration) (err error) {
	for attemtps > 0 {
		if err = fn(); err != nil {
			time.Sleep(delay)
			attemtps--

			continue
		}
		return nil
	}
	return
}

func FormatHTML(html string) string {
	liRegex := regexp.MustCompile("<li>")
	ulRegex := regexp.MustCompile("</ul>")
	brRegex := regexp.MustCompile("<br/>")

	html = liRegex.ReplaceAllString(html, "\n\t<li>")
	html = ulRegex.ReplaceAllString(html, "\n</ul>")
	html = brRegex.ReplaceAllString(html, "\n\t<br/>")

	return html
}

func SaveImage(imgBase64 string) (imgLink string, err error) {
	imgUUID, err := uuid2.NewV1()
	if err != nil {
		return "", err
	}
	path := "uploaded"
	link := path + "/" + imgUUID.String() + ".png"

	b64data := imgBase64[strings.IndexByte(imgBase64, ',')+1:]
	dec, err := base64.StdEncoding.DecodeString(b64data)
	if err != nil {
		return "", err
	}

	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		err = os.Mkdir("uploaded", 0750)
		if err != nil {
			return "", err
		}
	}

	f, err := os.Create(link)

	if err != nil {
		return "", err
	}
	defer f.Close()

	if _, err := f.Write(dec); err != nil {
		return "", err

	}
	if err := f.Sync(); err != nil {
		return "", err

	}

	return link, nil
}
