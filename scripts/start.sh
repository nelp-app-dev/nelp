docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nelp_postgres_1
