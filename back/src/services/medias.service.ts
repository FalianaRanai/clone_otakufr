import { Media } from '@/interfaces/medias.interface';
import { getDateIncremented } from '@/utils/getDateIncrementedEpisode.utils';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import * as fs from 'fs';
import path from 'path';
import { Service } from 'typedi';

@Service()
export class MediaService {
  public async findAllMedia(): Promise<Media[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          medias
        `);
    return rows;
  }

  public async findMediaById(mediaId: number): Promise<Media> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          medias
        WHERE
          id_media = $1
        `,
      [mediaId],
    );
    if (!rowCount) throw new HttpException(409, "Media doesn't exist");

    return rows[0];
  }

  public async createMedia(mediaData: Media): Promise<Media> {
    const { titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche } = mediaData;

    // Variables pour le fichier
    const { originalname, buffer } = affiche;
    const extension = path.extname(originalname); // Récupérer l'extension du fichier
    let basename = path.basename(originalname, extension); // Récupérer le nom de base sans l'extension
    basename = basename.replace(/[\s-]/g, '_'); // Remplacer les espaces et tirets par des underscores
    const nomFichier = `${basename}_${Date.now()}${extension}`; // Nom final du fichier

    // Chemin où tu vas enregistrer le fichier
    const filePath = path.join(__dirname, '../../uploads', nomFichier); // Change le dossier "uploads" selon ta configuration

    // Sauvegarde le fichier sur le disque
    fs.writeFileSync(filePath, buffer); // Écrire le fichier dans le répertoire 'uploads'

    // URL relative que tu peux enregistrer en base de données
    const fileUrl = `/uploads/${nomFichier}`;

    const { rows: createMediaData } = await pg.query(
      `
          INSERT INTO
            medias(
              "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
            )
          VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)
          RETURNING "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
          `,
      [titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, fileUrl],
    );

    return createMediaData[0];
  }

  public async updateMedia(mediaId: number, mediaData: Media): Promise<Media[]> {
    const { rows: findMedia } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_media"
            FROM
              medias
            WHERE
              "id_media" = $1
          )`,
      [mediaId],
    );
    if (!findMedia[0].exists) throw new HttpException(409, "Media doesn't exist");

    const { titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche } = mediaData;
    const { rows: updateMediaData } = await pg.query(
      `
          UPDATE
            medias
          SET
            "titre"=$2,
            "sygnopsis"=$3,
            "autre_nom"=$4,
            "id_auteur"=$5,
            "id_realisateur"=$6,
            "id_studio"=$7,
            "date_sortie"=$8,
            "duree"=$9,
            "id_type"=$10,
            "id_statut"=$11,
            "affiche" = $12
          WHERE
            "id_media" = $1
          RETURNING "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
        `,
      [mediaId, titre, sygnopsis, autre_nom, id_auteur, id_realisateur, id_studio, date_sortie, duree, id_type, id_statut, affiche],
    );

    return updateMediaData;
  }

  public async deleteMedia(mediaId: number): Promise<Media[]> {
    const { rows: findMedia } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_media"
            FROM
              medias
            WHERE
              "id_media" = $1
          )`,
      [mediaId],
    );
    if (!findMedia[0].exists) throw new HttpException(409, "Media doesn't exist");

    const { rows: deleteMediaData } = await pg.query(
      `
          DELETE
          FROM
            medias
          WHERE
            id_media = $1
          RETURNING "titre"
          `,
      [mediaId],
    );

    return deleteMediaData;
  }

  public async findMediaByIdJoin(mediaId: number): Promise<Media> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
            m.*, a.nom_auteur, r.nom_realisateur, s.nom_statut, t.nom_type, st.nom_studio
          FROM
            medias m
            JOIN
            auteurs a ON m.id_auteur = a.id_auteur
          JOIN
            realisateurs r ON m.id_realisateur = r.id_realisateur
          JOIN
            statuts s ON m.id_statut = s.id_statut
          JOIN
            types t ON m.id_type = t.id_type
          JOIN
            studios st ON m.id_studio = st.id_studio
          WHERE
            m.id_media = $1;
        `,
      [mediaId],
    );
    if (!rowCount) throw new HttpException(409, "Media doesn't exist");

    const retour = rows[0];

    const { rows: rows_genres, rowCount: rowCount_genres } = await pg.query(
      `
        SELECT * 
          FROM 
            genres g
          JOIN
            media_genres mg
            ON g.id_genre = mg.id_genre
          WHERE 
            mg.id_media = $1;
        `,
      [mediaId],
    );
    if (rowCount_genres) {
      retour.genres = rows_genres;
    }

    const { rows: rows_episodes, rowCount: rowCount_episodes } = await pg.query(
      `
        SELECT 
          s.* 
          FROM
            episodes s
          JOIN 
            medias m ON s.id_media = m.id_media
          WHERE
            m.id_media = $1
          ORDER BY
            s.numero DESC;
        `,
      [mediaId],
    );
    if (rowCount_episodes) {
      retour.episodes = rows_episodes;
    }

    return retour;
  }

  public async generateDataset(): Promise<any[]> {
    const csv = require('csv-parser');
    const fs = require('fs');

    return new Promise((resolve, reject) => {
      const results: any[] = [];

      fs.createReadStream('./src/output.csv')
        .pipe(csv({ separator: ';' }))
        .on('data', data => results.push(data))
        .on('end', async () => {
          // console.log(results);

          try {
            await pg.query('BEGIN');
            for (let i = 0; i < results.length; i++) {
              // =============================================================================================================================
              // ON COMMENCE PAR LES GENRES
              const genres = results[i].Genres.split(',');

              for (let j = 0; j < genres.length; j++) {
                genres[j] = genres[j].trim();

                // Vérifier si le genre existe déjà
                const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM genres WHERE LOWER(nom_genre) = LOWER($1)`, [genres[j]]);
                if (parseInt(rows_verif[0].count) > 0) {
                  console.warn(`Genre ${genres[j]} déjà existant, genre ignoré.`);
                } else {
                  const { rows: rows_genres } = await pg.query(
                    `
                            INSERT INTO
                              genres(
                                "nom_genre"
                              )
                            VALUES ($1)
                            RETURNING "nom_genre"
                            `,
                    [genres[j]],
                  );
                }
              }

              // =========================================================================================
              // =============================================================================================================================
              // ON COMMENCE PAR LES TYPES
              const types = results[i].Type.split(',');

              for (let j = 0; j < types.length; j++) {
                types[j] = types[j].trim();

                // Vérifier si le type existe déjà
                const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM types WHERE LOWER(nom_type) = LOWER($1)`, [types[j]]);
                if (parseInt(rows_verif[0].count) > 0) {
                  console.warn(`Type ${types[j]} déjà existant, type ignoré.`);
                } else {
                  const { rows: rows_types } = await pg.query(
                    `
                            INSERT INTO
                              types(
                                "nom_type"
                              )
                            VALUES ($1)
                            RETURNING "nom_type"
                            `,
                    [types[j]],
                  );
                }
              }

              // =========================================================================================
              // =============================================================================================================================
              // ON COMMENCE PAR LES STATUTS
              const statuts = results[i].Status.split(',');

              for (let j = 0; j < statuts.length; j++) {
                statuts[j] = statuts[j].trim();

                // Vérifier si le statut existe déjà
                const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM statuts WHERE LOWER(nom_statut) = LOWER($1)`, [statuts[j]]);
                if (parseInt(rows_verif[0].count) > 0) {
                  console.warn(`Statut ${statuts[j]} déjà existant, statut ignoré.`);
                } else {
                  const { rows: rows_statuts } = await pg.query(
                    `
                            INSERT INTO
                              statuts(
                                "nom_statut"
                              )
                            VALUES ($1)
                            RETURNING "nom_statut"
                            `,
                    [statuts[j]],
                  );
                }
              }

              // =========================================================================================
              // =============================================================================================================================
              // ON COMMENCE PAR LES AUTEURS
              const auteurs = results[i].Producers.split(',');

              for (let j = 0; j < auteurs.length; j++) {
                auteurs[j] = auteurs[j].trim();

                // Vérifier si le auteur existe déjà
                const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM auteurs WHERE LOWER(nom_auteur) = LOWER($1)`, [auteurs[j]]);
                if (parseInt(rows_verif[0].count) > 0) {
                  console.warn(`Auteur ${auteurs[j]} déjà existant, auteur ignoré.`);
                } else {
                  const { rows: rows_auteurs } = await pg.query(
                    `
                            INSERT INTO
                              auteurs(
                                "nom_auteur"
                              )
                            VALUES ($1)
                            RETURNING "nom_auteur"
                            `,
                    [auteurs[j]],
                  );
                }
              }

              // =========================================================================================
              // =============================================================================================================================
              // ON COMMENCE PAR LES REALISATEURS
              const realisateurs = results[i].Licensors.split(',');

              for (let j = 0; j < realisateurs.length; j++) {
                realisateurs[j] = realisateurs[j].trim();

                // Vérifier si le realisateur existe déjà
                const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM realisateurs WHERE LOWER(nom_realisateur) = LOWER($1)`, [
                  realisateurs[j],
                ]);
                if (parseInt(rows_verif[0].count) > 0) {
                  console.warn(`Realisateur ${realisateurs[j]} déjà existant, realisateur ignoré.`);
                } else {
                  const { rows: rows_realisateurs } = await pg.query(
                    `
                            INSERT INTO
                              realisateurs(
                                "nom_realisateur"
                              )
                            VALUES ($1)
                            RETURNING "nom_realisateur"
                            `,
                    [realisateurs[j]],
                  );
                }
              }

              // =========================================================================================
              // =============================================================================================================================
              // ON COMMENCE PAR LES Studios
              const studios = results[i].Studios.split(',');

              for (let j = 0; j < studios.length; j++) {
                studios[j] = studios[j].trim();

                // Vérifier si le studio existe déjà
                const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM studios WHERE LOWER(nom_studio) = LOWER($1)`, [studios[j]]);
                if (parseInt(rows_verif[0].count) > 0) {
                  console.warn(`Studio ${studios[j]} déjà existant, studio ignoré.`);
                } else {
                  const { rows: rows_studios } = await pg.query(
                    `
                      INSERT INTO
                        studios(
                          "nom_studio"
                        )
                      VALUES ($1)
                      RETURNING "nom_studio"
                      `,
                    [studios[j]],
                  );
                }
              }

              // =========================================================================================
              // genres à insérer
              const genresToInsert = [];
              for (let j = 0; j < genres.length; j++) {
                const { rows: rows_genres_to_insert } = await pg.query(`SELECT * FROM genres WHERE LOWER(nom_genre) = LOWER($1)`, [genres[j]]);
                genresToInsert.push(rows_genres_to_insert[0]);
              }
              console.log('genresToInsert', genresToInsert);

              // types
              const { rows: rows_types_to_insert } = await pg.query(`SELECT * FROM types WHERE LOWER(nom_type) = LOWER($1)`, [types[0]]);
              const typesToInsert = rows_types_to_insert[0];

              // statuts auteurs realisateurs studios
              const { rows: rows_statuts_to_insert } = await pg.query(`SELECT * FROM statuts WHERE LOWER(nom_statut) = LOWER($1)`, [statuts[0]]);
              const statutsToInsert = rows_statuts_to_insert[0];

              // auteurs realisateurs studios
              const { rows: rows_auteurs_to_insert } = await pg.query(`SELECT * FROM auteurs WHERE LOWER(nom_auteur) = LOWER($1)`, [auteurs[0]]);
              const auteursToInsert = rows_auteurs_to_insert[0];

              //  realisateurs studios
              const { rows: rows_realisateurs_to_insert } = await pg.query(`SELECT * FROM realisateurs WHERE LOWER(nom_realisateur) = LOWER($1)`, [
                realisateurs[0],
              ]);
              const realisateursToInsert = rows_realisateurs_to_insert[0];

              // studios
              const { rows: rows_studios_to_insert } = await pg.query(`SELECT * FROM studios WHERE LOWER(nom_studio) = LOWER($1)`, [studios[0]]);
              const studiosToInsert = rows_studios_to_insert[0];

              const titre = results[i].Name;
              const autre_nom = `${results[i]['English name']} / ${results[i]['Other name']}`;
              const sygnopsis = results[i].Synopsis;

              const nombre_episodes = results[i].Episodes;
              const date_sortie = results[i].Aired;
              const duree = results[i].Duration;
              const affiche = results[i]['Image URL'];

              // Vérifier si le studio existe déjà
              const { rows: rows_media_to_insert } = await pg.query(`SELECT COUNT(*) FROM medias WHERE LOWER(titre) = LOWER($1)`, [titre]);
              if (parseInt(rows_media_to_insert[0].count) > 0) {
                console.warn(`media ${titre} déjà existant, studio ignoré.`);
              } else {
                const { rows: createMediaData } = await pg.query(
                  `
                      INSERT INTO
                        medias(
                          "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche"
                        )
                      VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)
                      RETURNING "titre", "sygnopsis", "autre_nom", "id_auteur", "id_realisateur", "id_studio", "date_sortie", "duree", "id_type", "id_statut", "affiche", "id_media"
                      `,
                  [
                    titre,
                    sygnopsis,
                    autre_nom,
                    rows_auteurs_to_insert[0].id_auteur,
                    rows_realisateurs_to_insert[0].id_realisateur,
                    rows_studios_to_insert[0].id_studio,
                    date_sortie,
                    duree,
                    rows_types_to_insert[0].id_type,
                    rows_statuts_to_insert[0].id_statut,
                    affiche,
                  ],
                );

                const id_media = createMediaData[0].id_media;
                console.log('AAAAAAAAAAAAAAAAAAA', id_media);

                // insertion media_genres
                for (let j = 0; j < genresToInsert.length; j++) {
                  const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM media_genres WHERE id_media = $1 AND id_genre = $2`, [
                    id_media,
                    genresToInsert[j].id_genre,
                  ]);

                  if (parseInt(rows_verif[0].count) > 0) {
                    console.warn(`Media_Genre ${genresToInsert[j].nom_genre} déjà existant, genre ignoré.`);
                  } else {
                    await pg.query(
                      `
                        INSERT INTO
                          media_genres(
                            "id_media",
                            "id_genre"
                          )
                        VALUES ($1, $2)
                        RETURNING "id_media", "id_genre"
                        `,
                      [id_media, genresToInsert[j].id_genre],
                    );
                  }
                }

                // insertion episodes
                for (let j = 1; j <= nombre_episodes; j++) {
                  const { rows: rows_verif } = await pg.query(`SELECT COUNT(*) FROM episodes WHERE id_media = $1 AND numero = $2`, [id_media, j]);

                  if (parseInt(rows_verif[0].count) > 0) {
                    console.warn(`Episode ${j} déjà existant, Episode ignoré.`);
                  } else {
                    const jFormatted = j < 10 ? `0${j}` : `${j}`;
                    const nom_episode = `${titre} ${jFormatted} Vostfr`;
                    const date_sortie_episode = getDateIncremented(date_sortie, j);

                    await pg.query(
                      `
                              INSERT INTO
                                episodes(
                                  "nom_episode", "numero", "id_media", "date_sortie"
                                )
                              VALUES ($1, $2, $3, $4)
                              RETURNING "nom_episode", "numero", "id_media", "date_sortie"
                              `,
                      [nom_episode, j, id_media, date_sortie_episode],
                    );

                    console.log(`+++++++++++++++${nom_episode} ${date_sortie_episode} INSERE +++++++++++++++++`);
                  }
                }
              }
            }
            await pg.query('COMMIT');
          } catch (error) {
            await pg.query('ROLLBACK');
            console.error('Erreur lors de l’insertion des media :', error);
            throw new HttpException(500, 'Erreur lors de la création des media genres');
          }

          resolve(results); // Résoudre la Promise avec les résultats
        })
        .on('error', error => {
          reject(error); // Rejeter la Promise en cas d'erreur
        });
    });
  }

  public async getPagination(page: number, sample = 10): Promise<Media[]> {
    const { rows } = await pg.query(
      `
            SELECT m.*, a.nom_auteur, r.nom_realisateur, s.nom_statut, t.nom_type, st.nom_studio
              FROM medias m
              JOIN auteurs a ON m.id_auteur = a.id_auteur
              JOIN realisateurs r ON m.id_realisateur = r.id_realisateur
              JOIN statuts s ON m.id_statut = s.id_statut
              JOIN types t ON m.id_type = t.id_type
              JOIN studios st ON m.id_studio = st.id_studio 
              ORDER BY m.id_media DESC
                LIMIT $1 OFFSET ($2 - 1) * $1
            ;
            `,
      [sample, page],
    );

    return rows;
  }

  public async getCountPagination(sample = 10): Promise<any> {
    const { rows } = await pg.query(
      `
            SELECT COUNT(*) as count_pages
              FROM medias
            ;
            `,
      [],
    );
    let nb_pages = Number(rows[0].count_pages / sample);
    // console.log(nb_pages, Math.trunc(nb_pages));
    if (nb_pages - Math.trunc(nb_pages) > 0) {
      nb_pages = Math.trunc(nb_pages) + 1;
    }

    return nb_pages;
  }

  public async search(search: string, page = 1, sample = 10): Promise<Media[]> {
    const { rows } = await pg.query(
      `
            SELECT m.*, a.nom_auteur, r.nom_realisateur, s.nom_statut, t.nom_type, st.nom_studio
              FROM medias m
              JOIN auteurs a ON m.id_auteur = a.id_auteur
              JOIN realisateurs r ON m.id_realisateur = r.id_realisateur
              JOIN statuts s ON m.id_statut = s.id_statut
              JOIN types t ON m.id_type = t.id_type
              JOIN studios st ON m.id_studio = st.id_studio 
            WHERE
              LOWER(m.titre) LIKE LOWER($1)
              OR LOWER(m.autre_nom) LIKE LOWER($1)
              LIMIT $2 OFFSET ($3 - 1) * $2
            `,
      [`%${search}%`, sample, page],
    );
    return rows;
  }

  public async getCountPaginationSearch(search: string, sample = 10): Promise<any> {
    const { rows } = await pg.query(
      `
            SELECT
              COUNT(*) as count_pages
            FROM
              medias
            WHERE
              LOWER("titre") LIKE LOWER($1)
              OR LOWER("autre_nom") LIKE LOWER($1)
            `,
      [`%${search}%`],
    );

    let nb_pages = Number(rows[0].count_pages / sample);
    // console.log(nb_pages, Math.trunc(nb_pages));
    if (nb_pages - Math.trunc(nb_pages) > 0) {
      nb_pages = Math.trunc(nb_pages) + 1;
    }

    return nb_pages;
  }
}
