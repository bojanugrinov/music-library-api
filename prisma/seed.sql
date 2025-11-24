INSERT INTO artists (id, name, created_at, updated_at) VALUES
  (1, 'Eminem', now(), null),
  (2, 'Drake', now(), null),
  (3, '50 Cent', now(), null);

SELECT setval(pg_get_serial_sequence('artists', 'id'), (SELECT MAX(id) FROM artists));

INSERT INTO songs (id, title, artist_id, created_at, updated_at) VALUES
  (1, 'Lose Yourself', 1, now(), null),
  (2, 'Stan', 1, now(), null),
  (3, 'Without Me', 1, now(), null),
  (4, 'God''s Plan', 2, now(), null),
  (5, 'Hotline Bling', 2, now(), null),
  (6, 'In My Feelings', 2, now(), null),
  (7, 'In Da Club', 3, now(), null),
  (8, 'Candy Shop', 3, now(), null),
  (9, '21 Questions', 3, now(), null);

SELECT setval(pg_get_serial_sequence('songs', 'id'), (SELECT MAX(id) FROM songs));