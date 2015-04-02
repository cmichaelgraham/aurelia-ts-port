for f in **/*.js; do mv "$f" "${f/.js/.ts}"; done
