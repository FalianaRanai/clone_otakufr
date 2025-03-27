SELECT m.* FROM medias m 
  JOIN episodes e ON m.id_media = e.id_media
  WHERE m.id_media IN (SELECT e.id_media, COUNT(e.*) FROM episodes e WHERE COUNT(e.*) > 30 GROUP BY e.id_media);