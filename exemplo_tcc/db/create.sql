CREATE TABLE usuario (
	id_usuario INTEGER PRIMARY KEY,
	nome TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	senha TEXT NOT NULL
);