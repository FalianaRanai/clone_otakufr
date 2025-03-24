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

BEGIN;

ALTER TABLE "medias" ADD COLUMN "affiche" VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE "medias" DROP COLUMN "auteur";
ALTER TABLE "medias" DROP COLUMN "realisateur";
ALTER TABLE "medias" DROP COLUMN "studio";

CREATE TABLE IF NOT EXISTS realisateurs(
    "id_realisateur" SERIAL PRIMARY KEY,
    "nom_realisateur" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS auteurs(
    "id_auteur" SERIAL PRIMARY KEY,
    "nom_auteur" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS studios(
    "id_studio" SERIAL PRIMARY KEY,
    "nom_studio" VARCHAR(100) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

ALTER TABLE "medias" ADD COLUMN "id_realisateur" INT NOT NULL;
ALTER TABLE "medias" ADD COLUMN "id_auteur" INT NOT NULL;
ALTER TABLE "medias" ADD COLUMN "id_studio" INT NOT NULL;

ALTER TABLE "medias" ADD CONSTRAINT "fk_medias_realisateurs"
FOREIGN KEY ("id_realisateur") REFERENCES "realisateurs"("id_realisateur") ON DELETE CASCADE;

ALTER TABLE "medias" ADD CONSTRAINT "fk_medias_auteurs"
FOREIGN KEY ("id_auteur") REFERENCES "auteurs"("id_auteur") ON DELETE CASCADE;

ALTER TABLE "medias" ADD CONSTRAINT "fk_medias_studios"
FOREIGN KEY ("id_studio") REFERENCES "studios"("id_studio") ON DELETE CASCADE;


COMMIT;

ALTER TABLE "medias" ALTER COLUMN "titre" TYPE TEXT;  
ALTER TABLE "medias" ALTER COLUMN "autre_nom" TYPE TEXT;



INSERT INTO "medias"(
    "titre", "sygnopsis", "autre_nom", "id_type", "date_sortie", "duree", "id_statut", "affiche", "id_auteur", "id_realisateur", "id_studio"
) VALUES (
    'Re:Zero kara Hajimeru Isekai Seikatsu Saison 3',
    'Il s''agit de la troisième saison de la série animée Re:Zero kara Hajimeru Isekai Seikatsu.

    Après avoir repoussé les violentes attaques d''Elsa et de ses troupes, une année s''est écoulée depuis la libération du "Sanctuaire", où Béatrice a passé un contrat avec Subaru pendant la bataille contre le Grand Lapin. Le camp d''Emilia était uni face à l''élection royale, et Natsuki Subaru profitait pleinement de ses journées lorsque la paix et la tranquillité prirent fin avec la livraison d''une lettre par un messager.
    Elle provenait d''Anastasia, l''une des candidates à l''élection royale, qui l''invitait à se rendre dans la capitale de l''eau de Priestella, où diverses retrouvailles les attendaient. Une inattendue, une involontaire, et une à venir.
    Face à la malveillance qui règne sous la surface et à la crise sans précédent qui s''ensuit, Subaru est une fois de plus confronté à un destin éprouvant.',
    'Re:Zero - Re:vivre dans un autre monde à partir de zéro Saison 3 / Re:ZERO -Starting Life in Another World- 3rd Season',
    1,
    '2024-10-02',
    23,
    1,
    'https://a.storyblok.com/f/178900/1064x1503/b5245a2097/re-zero-starting-life-in-another-world-season-3-key-visual-3.jpg/m/filters:quality(95)format(webp)',
    1,
    1,
    1
);

