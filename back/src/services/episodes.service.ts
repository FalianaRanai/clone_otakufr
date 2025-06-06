import { Episode } from '@/interfaces/episodes.interface';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class EpisodeService {
  public async findAllEpisode(): Promise<Episode[]> {
    const { rows } = await pg.query(`
        SELECT
          *
        FROM
          episodes
        `);
    return rows;
  }

  public async findEpisodeById(episodeId: number): Promise<Episode> {
    const { rows, rowCount } = await pg.query(
      `
        SELECT
          *
        FROM
          episodes
        WHERE
          id_episode = $1
        `,
      [episodeId],
    );
    if (!rowCount) throw new HttpException(409, "Episode doesn't exist");

    return rows[0];
  }

  public async createEpisode(episodeData: Episode): Promise<Episode> {
    const { nom_episode, numero, id_media, date_sortie } = episodeData;

    const { rows: createEpisodeData } = await pg.query(
      `
          INSERT INTO
            episodes(
              "nom_episode", "numero", "id_media", "date_sortie"
            )
          VALUES ($1, $2, $3, $4)
          RETURNING "nom_episode", "numero", "id_media", "date_sortie"
          `,
      [nom_episode, numero, id_media, date_sortie],
    );

    return createEpisodeData[0];
  }

  public async updateEpisode(episodeId: number, episodeData: Episode): Promise<Episode[]> {
    const { rows: findEpisode } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_episode"
            FROM
              episodes
            WHERE
              "id_episode" = $1
          )`,
      [episodeId],
    );
    if (!findEpisode[0].exists) throw new HttpException(409, "Episode doesn't exist");

    const { nom_episode, numero, id_media, date_sortie } = episodeData;
    const { rows: updateEpisodeData } = await pg.query(
      `
          UPDATE
            episodes
          SET
            "nom_episode" = $2,
            "numero"=$3, "id_media"=$4, "date_sortie"=$5,
            "updated_at" = NOW()
          WHERE
            "id_episode" = $1
          RETURNING "nom_episode", "numero", "id_media", "date_sortie"
        `,
      [episodeId, nom_episode, numero, id_media, date_sortie],
    );

    return updateEpisodeData;
  }

  public async deleteEpisode(episodeId: number): Promise<Episode[]> {
    const { rows: findEpisode } = await pg.query(
      `
          SELECT EXISTS(
            SELECT
              "id_episode"
            FROM
              episodes
            WHERE
              "id_episode" = $1
          )`,
      [episodeId],
    );
    if (!findEpisode[0].exists) throw new HttpException(409, "Episode doesn't exist");

    const { rows: deleteEpisodeData } = await pg.query(
      `
          DELETE
          FROM
            episodes
          WHERE
            id_episode = $1
          RETURNING "nom_episode"
          `,
      [episodeId],
    );

    return deleteEpisodeData;
  }

  public async getHomePagination(page: number): Promise<Episode[]> {
    const sample = 20;
    const { rows } = await pg.query(
      `
        SELECT e.id_media, e.date_sortie, e.nom_episode, m.affiche
          FROM episodes e
            JOIN medias m ON m.id_media = e.id_media
            ORDER BY e.date_sortie DESC
            LIMIT $1 OFFSET ($2 - 1) * $3
        ;
        `,
      [sample, page, sample],
    );

    return rows;
  }

  public async getPagination(page: number, sample = 10): Promise<Episode[]> {
    const { rows } = await pg.query(
      `
            SELECT *
              FROM episodes 
                LIMIT $1 OFFSET ($2 - 1) * $3
            ;
            `,
      [sample, page, sample],
    );

    return rows;
  }

  public async getCountPagination(sample = 20): Promise<any> {
    const { rows } = await pg.query(
      `
        SELECT COUNT(*) as count_pages
          FROM episodes
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

  public async search(search: string, page = 1, sample = 10): Promise<Episode[]> {
    const { rows } = await pg.query(
      `
            SELECT
              *
            FROM
              episodes
            WHERE
              LOWER("nom_episode") LIKE LOWER($1)
              LIMIT $2 OFFSET ($3 - 1) * $4
            `,
      [`%${search}%`, sample, page, sample],
    );
    return rows;
  }

  public async getCountPaginationSearch(search: string, sample = 10): Promise<any> {
    const { rows } = await pg.query(
      `
            SELECT
              COUNT(*) as count_pages
            FROM
              episodes
            WHERE
              LOWER("nom_episode") LIKE LOWER($1)
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
