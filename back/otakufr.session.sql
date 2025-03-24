ALTER TABLE "medias" DROP CONSTRAINT "fk_medias_realisateur";
ALTER TABLE "medias" DROP CONSTRAINT "fk_medias_studio";
ALTER TABLE "medias" DROP CONSTRAINT "fk_medias_auteur";

drop table "realisateur";
drop table "studio";
drop table "auteur";