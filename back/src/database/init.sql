BEGIN;

-- If Exists Table Drop
DROP TABLE IF EXISTS users cascade;
-- ================
--   TABLE [users]
-- ================
-- create users table
CREATE TABLE users(
    "id_user" SERIAL PRIMARY KEY,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS roles(
    "id_role" SERIAL PRIMARY KEY,
    "nom_role" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS user_roles(
    "id_user_role" SERIAL PRIMARY KEY,
    "id_user" INT NOT NULL,
    "id_role" INT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE CASCADE,
    FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS genres(
    "id_genre" SERIAL PRIMARY KEY,
    "nom_genre" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS statuts(
    "id_statut" SERIAL PRIMARY KEY,
    "nom_statut" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS types(
    "id_type" SERIAL PRIMARY KEY,
    "nom_type" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS medias(
    "id_media" SERIAL PRIMARY KEY,
    "titre" VARCHAR(100),
    "sygnopsis" TEXT,
    "autre_nom" VARCHAR(100),
    "auteur" VARCHAR(100),
    "realisateur" VARCHAR(100),
    "studio" VARCHAR(100),
    "id_type" INT NOT NULL,
    "date_sortie" TIMESTAMP WITHOUT TIME ZONE,
    "duree" INT,
    "id_statut" INT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY ("id_type") REFERENCES "types"("id_type") ON DELETE CASCADE,
    FOREIGN KEY ("id_statut") REFERENCES "statuts"("id_statut") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS media_genres(
    "id_media_genre" SERIAL PRIMARY KEY,
    "id_media" INT NOT NULL,
    "id_genre" INT NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY ("id_media") REFERENCES "medias"("id_media") ON DELETE CASCADE,
    FOREIGN KEY ("id_genre") REFERENCES "genres"("id_genre") ON DELETE CASCADE
);

COMMIT;