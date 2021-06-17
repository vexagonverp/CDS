type schema.sql | docker exec -i docker_postgres-db_1 psql -U postgres
type data.sql | docker exec -i docker_postgres-db_1 psql -U postgres