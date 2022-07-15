package utils

import (
	"regexp"
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

	html = liRegex.ReplaceAllString(html, "\n<li>")
	html = ulRegex.ReplaceAllString(html, "\n</ul>")
	html = brRegex.ReplaceAllString(html, "\n<br/>")

	return html
}
