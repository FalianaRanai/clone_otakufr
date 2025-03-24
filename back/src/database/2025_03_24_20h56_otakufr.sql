--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auteurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auteurs (
    id_auteur integer NOT NULL,
    nom_auteur character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.auteurs OWNER TO postgres;

--
-- Name: auteurs_id_auteur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auteurs_id_auteur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auteurs_id_auteur_seq OWNER TO postgres;

--
-- Name: auteurs_id_auteur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auteurs_id_auteur_seq OWNED BY public.auteurs.id_auteur;


--
-- Name: episodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.episodes (
    id_episode integer NOT NULL,
    nom_episode text,
    numero integer NOT NULL,
    id_media integer NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone,
    date_sortie timestamp without time zone
);


ALTER TABLE public.episodes OWNER TO postgres;

--
-- Name: episodes_id_episode_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.episodes_id_episode_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.episodes_id_episode_seq OWNER TO postgres;

--
-- Name: episodes_id_episode_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.episodes_id_episode_seq OWNED BY public.episodes.id_episode;


--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id_genre integer NOT NULL,
    nom_genre character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: genres_id_genre_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_id_genre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_id_genre_seq OWNER TO postgres;

--
-- Name: genres_id_genre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_id_genre_seq OWNED BY public.genres.id_genre;


--
-- Name: media_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_genres (
    id_media_genre integer NOT NULL,
    id_media integer NOT NULL,
    id_genre integer NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.media_genres OWNER TO postgres;

--
-- Name: media_genres_id_media_genre_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_genres_id_media_genre_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_genres_id_media_genre_seq OWNER TO postgres;

--
-- Name: media_genres_id_media_genre_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_genres_id_media_genre_seq OWNED BY public.media_genres.id_media_genre;


--
-- Name: medias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medias (
    id_media integer NOT NULL,
    titre text,
    sygnopsis text,
    autre_nom text,
    id_type integer NOT NULL,
    date_sortie timestamp without time zone,
    duree integer,
    id_statut integer NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone,
    affiche character varying(255) DEFAULT ''::character varying NOT NULL,
    id_realisateur integer NOT NULL,
    id_auteur integer NOT NULL,
    id_studio integer NOT NULL
);


ALTER TABLE public.medias OWNER TO postgres;

--
-- Name: medias_id_media_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medias_id_media_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medias_id_media_seq OWNER TO postgres;

--
-- Name: medias_id_media_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medias_id_media_seq OWNED BY public.medias.id_media;


--
-- Name: realisateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.realisateurs (
    id_realisateur integer NOT NULL,
    nom_realisateur character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.realisateurs OWNER TO postgres;

--
-- Name: realisateurs_id_realisateur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.realisateurs_id_realisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.realisateurs_id_realisateur_seq OWNER TO postgres;

--
-- Name: realisateurs_id_realisateur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.realisateurs_id_realisateur_seq OWNED BY public.realisateurs.id_realisateur;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_role integer NOT NULL,
    nom_role character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_role_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_role_seq OWNER TO postgres;

--
-- Name: roles_id_role_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_role_seq OWNED BY public.roles.id_role;


--
-- Name: statuts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statuts (
    id_statut integer NOT NULL,
    nom_statut character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.statuts OWNER TO postgres;

--
-- Name: statuts_id_statut_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.statuts_id_statut_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.statuts_id_statut_seq OWNER TO postgres;

--
-- Name: statuts_id_statut_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.statuts_id_statut_seq OWNED BY public.statuts.id_statut;


--
-- Name: studios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studios (
    id_studio integer NOT NULL,
    nom_studio character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.studios OWNER TO postgres;

--
-- Name: studios_id_studio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studios_id_studio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.studios_id_studio_seq OWNER TO postgres;

--
-- Name: studios_id_studio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studios_id_studio_seq OWNED BY public.studios.id_studio;


--
-- Name: types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.types (
    id_type integer NOT NULL,
    nom_type character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.types OWNER TO postgres;

--
-- Name: types_id_type_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.types_id_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.types_id_type_seq OWNER TO postgres;

--
-- Name: types_id_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.types_id_type_seq OWNED BY public.types.id_type;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id_user_role integer NOT NULL,
    id_user integer NOT NULL,
    id_role integer NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: user_roles_id_user_role_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_id_user_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_roles_id_user_role_seq OWNER TO postgres;

--
-- Name: user_roles_id_user_role_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_id_user_role_seq OWNED BY public.user_roles.id_user_role;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- Name: auteurs id_auteur; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auteurs ALTER COLUMN id_auteur SET DEFAULT nextval('public.auteurs_id_auteur_seq'::regclass);


--
-- Name: episodes id_episode; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes ALTER COLUMN id_episode SET DEFAULT nextval('public.episodes_id_episode_seq'::regclass);


--
-- Name: genres id_genre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN id_genre SET DEFAULT nextval('public.genres_id_genre_seq'::regclass);


--
-- Name: media_genres id_media_genre; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres ALTER COLUMN id_media_genre SET DEFAULT nextval('public.media_genres_id_media_genre_seq'::regclass);


--
-- Name: medias id_media; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias ALTER COLUMN id_media SET DEFAULT nextval('public.medias_id_media_seq'::regclass);


--
-- Name: realisateurs id_realisateur; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.realisateurs ALTER COLUMN id_realisateur SET DEFAULT nextval('public.realisateurs_id_realisateur_seq'::regclass);


--
-- Name: roles id_role; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_role SET DEFAULT nextval('public.roles_id_role_seq'::regclass);


--
-- Name: statuts id_statut; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuts ALTER COLUMN id_statut SET DEFAULT nextval('public.statuts_id_statut_seq'::regclass);


--
-- Name: studios id_studio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studios ALTER COLUMN id_studio SET DEFAULT nextval('public.studios_id_studio_seq'::regclass);


--
-- Name: types id_type; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types ALTER COLUMN id_type SET DEFAULT nextval('public.types_id_type_seq'::regclass);


--
-- Name: user_roles id_user_role; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN id_user_role SET DEFAULT nextval('public.user_roles_id_user_role_seq'::regclass);


--
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- Data for Name: auteurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auteurs (id_auteur, nom_auteur, created_at, updated_at) FROM stdin;
1	Tappei Nagatsuki	2025-03-24 10:06:18.865897	\N
\.


--
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.episodes (id_episode, nom_episode, numero, id_media, created_at, updated_at, date_sortie) FROM stdin;
1	Re:Zero kara Hajimeru Isekai Seikatsu S3 01 Vostfr	1	1	2025-03-24 17:49:19.967523	\N	2024-10-02 03:00:00
2	Re:Zero kara Hajimeru Isekai Seikatsu S3 02 Vostfr	2	1	2025-03-24 17:49:54.680368	\N	2024-10-09 03:00:00
3	Re:Zero kara Hajimeru Isekai Seikatsu S3 03 Vostfr	3	1	2025-03-24 17:50:07.89815	\N	2024-10-16 03:00:00
4	Re:Zero kara Hajimeru Isekai Seikatsu S3 04 Vostfr	4	1	2025-03-24 17:50:18.157895	\N	2024-10-23 03:00:00
5	Re:Zero kara Hajimeru Isekai Seikatsu S3 05 Vostfr	5	1	2025-03-24 17:50:33.059463	\N	2024-10-30 03:00:00
6	Re:Zero kara Hajimeru Isekai Seikatsu S3 06 Vostfr	6	1	2025-03-24 17:50:44.137694	\N	2024-11-06 03:00:00
7	Re:Zero kara Hajimeru Isekai Seikatsu S3 07 Vostfr	7	1	2025-03-24 17:50:54.113207	\N	2024-11-13 00:00:00
8	Re:Zero kara Hajimeru Isekai Seikatsu S3 08 Vostfr	8	1	2025-03-24 17:53:01.993443	\N	2024-11-20 03:00:00
9	Re:Zero kara Hajimeru Isekai Seikatsu S3 09 Vostfr	9	1	2025-03-24 17:53:16.857205	\N	2025-02-05 03:00:00
10	Re:Zero kara Hajimeru Isekai Seikatsu S3 10 Vostfr	10	1	2025-03-24 17:53:30.265608	\N	2025-02-11 03:00:00
11	Re:Zero kara Hajimeru Isekai Seikatsu S3 11 Vostfr	11	1	2025-03-24 17:53:43.165168	\N	2025-02-19 03:00:00
12	Re:Zero kara Hajimeru Isekai Seikatsu S3 12 Vostfr	12	1	2025-03-24 17:53:54.694275	\N	2025-02-26 03:00:00
13	Re:Zero kara Hajimeru Isekai Seikatsu S3 13 Vostfr	13	1	2025-03-24 17:54:10.51408	\N	2025-03-05 03:00:00
14	Re:Zero kara Hajimeru Isekai Seikatsu S3 14 Vostfr	14	1	2025-03-24 17:54:25.356646	\N	2025-03-10 03:00:00
15	Re:Zero kara Hajimeru Isekai Seikatsu S3 15 Vostfr	15	1	2025-03-24 17:54:36.557116	\N	2025-03-18 03:00:00
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id_genre, nom_genre, created_at, updated_at) FROM stdin;
2	Aventure	2025-03-21 18:44:22.274544	\N
3	Comedie	2025-03-21 18:44:22.274544	\N
4	Crime	2025-03-21 18:44:22.274544	\N
5	Démons	2025-03-21 18:44:22.274544	\N
6	Drame	2025-03-21 18:44:22.274544	\N
7	Ecchi	2025-03-21 18:44:22.274544	\N
8	Espace	2025-03-21 18:44:22.274544	\N
9	Fantastique	2025-03-21 18:44:22.274544	\N
10	Gore	2025-03-21 18:44:22.274544	\N
11	Harem	2025-03-21 18:44:22.274544	\N
12	Historique	2025-03-21 18:44:22.274544	\N
13	Horreur	2025-03-21 18:44:22.274544	\N
14	Isekai	2025-03-21 18:44:22.274544	\N
15	Jeux	2025-03-21 18:44:22.274544	\N
16	L'école	2025-03-21 18:44:22.274544	\N
17	LGBT+	2025-03-21 18:44:22.274544	\N
18	Magical girls	2025-03-21 18:44:22.274544	\N
19	Magie	2025-03-21 18:44:22.274544	\N
20	Martial Arts	2025-03-21 18:44:22.274544	\N
21	Mecha	2025-03-21 18:44:22.274544	\N
22	Militaire	2025-03-21 18:44:22.274544	\N
23	Musique	2025-03-21 18:44:22.274544	\N
24	Mysterieux	2025-03-21 18:44:22.274544	\N
25	Parodie	2025-03-21 18:44:22.274544	\N
26	Police	2025-03-21 18:44:22.274544	\N
27	Psychologique	2025-03-21 18:44:22.274544	\N
28	Romance	2025-03-21 18:44:22.274544	\N
29	Samurai	2025-03-21 18:44:22.274544	\N
30	Sci-Fi	2025-03-21 18:44:22.274544	\N
31	Seinen	2025-03-21 18:44:22.274544	\N
32	Shoujo	2025-03-21 18:44:22.274544	\N
33	Shoujo Ai	2025-03-21 18:44:22.274544	\N
34	Shounen	2025-03-21 18:44:22.274544	\N
35	Shounen Ai	2025-03-21 18:44:22.274544	\N
36	Sport	2025-03-21 18:44:22.274544	\N
37	Super Power	2025-03-21 18:44:22.274544	\N
38	Surnaturel	2025-03-21 18:44:22.274544	\N
39	Suspense	2025-03-21 18:44:22.274544	\N
40	Thriller	2025-03-21 18:44:22.274544	\N
41	Tranche de vie	2025-03-21 18:44:22.274544	\N
42	Vampire	2025-03-21 18:44:22.274544	\N
1	Action	2025-03-21 18:44:22.274544	2025-03-24 20:01:32.003707
\.


--
-- Data for Name: media_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_genres (id_media_genre, id_media, id_genre, created_at, updated_at) FROM stdin;
1	1	1	2025-03-24 16:13:39.798921	\N
2	1	2	2025-03-24 16:13:39.798921	\N
3	1	3	2025-03-24 16:13:39.798921	\N
4	1	5	2025-03-24 16:13:39.798921	\N
5	1	7	2025-03-24 16:13:39.798921	\N
6	1	9	2025-03-24 16:13:39.798921	\N
7	1	14	2025-03-24 16:13:39.798921	\N
8	1	27	2025-03-24 16:13:39.798921	\N
\.


--
-- Data for Name: medias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medias (id_media, titre, sygnopsis, autre_nom, id_type, date_sortie, duree, id_statut, created_at, updated_at, affiche, id_realisateur, id_auteur, id_studio) FROM stdin;
1	Re:Zero kara Hajimeru Isekai Seikatsu Saison 3	Il s'agit de la troisième saison de la série animée Re:Zero kara Hajimeru Isekai Seikatsu.\r\n\r\n    Après avoir repoussé les violentes attaques d'Elsa et de ses troupes, une année s'est écoulée depuis la libération du "Sanctuaire", où Béatrice a passé un contrat avec Subaru pendant la bataille contre le Grand Lapin. Le camp d'Emilia était uni face à l'élection royale, et Natsuki Subaru profitait pleinement de ses journées lorsque la paix et la tranquillité prirent fin avec la livraison d'une lettre par un messager.\r\n    Elle provenait d'Anastasia, l'une des candidates à l'élection royale, qui l'invitait à se rendre dans la capitale de l'eau de Priestella, où diverses retrouvailles les attendaient. Une inattendue, une involontaire, et une à venir.\r\n    Face à la malveillance qui règne sous la surface et à la crise sans précédent qui s'ensuit, Subaru est une fois de plus confronté à un destin éprouvant.	Re:Zero - Re:vivre dans un autre monde à partir de zéro Saison 3 / Re:ZERO -Starting Life in Another World- 3rd Season	1	2024-10-02 00:00:00	23	1	2025-03-24 10:08:42.553819	\N	https://a.storyblok.com/f/178900/1064x1503/b5245a2097/re-zero-starting-life-in-another-world-season-3-key-visual-3.jpg/m/filters:quality(95)format(webp)	1	1	1
\.


--
-- Data for Name: realisateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.realisateurs (id_realisateur, nom_realisateur, created_at, updated_at) FROM stdin;
1	WHITE FOX	2025-03-24 10:07:44.457997	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_role, nom_role, created_at, updated_at) FROM stdin;
1	admin	2025-03-21 15:16:31.557405	\N
2	user	2025-03-21 15:16:31.557405	\N
5	moderator	2025-03-21 15:35:42.996034	\N
\.


--
-- Data for Name: statuts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.statuts (id_statut, nom_statut, created_at, updated_at) FROM stdin;
1	En cours	2025-03-21 18:55:08.055591	\N
2	Terminé	2025-03-21 18:55:08.055591	\N
\.


--
-- Data for Name: studios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.studios (id_studio, nom_studio, created_at, updated_at) FROM stdin;
1	WHITE FOX	2025-03-24 10:07:55.528088	\N
\.


--
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.types (id_type, nom_type, created_at, updated_at) FROM stdin;
1	Serie	2025-03-21 19:01:50.022785	\N
2	Film	2025-03-21 19:01:50.022785	\N
3	Film d'animation	2025-03-21 19:01:50.022785	\N
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id_user_role, id_user, id_role, created_at, updated_at) FROM stdin;
9	1	2	2025-03-21 18:28:05.545022	\N
10	2	2	2025-03-21 18:28:05.545022	\N
11	3	2	2025-03-21 18:28:05.545022	\N
12	4	2	2025-03-21 18:28:05.545022	\N
13	5	2	2025-03-21 18:28:05.545022	\N
14	6	2	2025-03-21 18:28:05.545022	\N
15	7	2	2025-03-21 18:28:05.545022	\N
16	8	2	2025-03-21 18:28:05.545022	\N
17	9	2	2025-03-21 18:28:05.545022	\N
18	10	2	2025-03-21 18:28:05.545022	\N
19	11	1	2025-03-21 18:28:05.545022	\N
20	12	2	2025-03-21 18:28:05.545022	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, email, password, created_at, updated_at) FROM stdin;
1	lucas_dupont@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
2	emma_martin@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
3	noah_bernard@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
4	chloé_petit@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
5	hugo_robert@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
6	léa_durand@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
7	nathan_leroy@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
8	sophie_moreau@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
9	léo_simon@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
10	camille_laurent@gmail.com	$2b$10$i1fOrwPyTqfreIVEfVSucOKLD3Wc97R7OX70HzLAKmK/qtfMzDNYe	2025-03-21 14:46:02.70869	\N
11	admin@email.com	$2b$10$6wZB7zYqybq2putxGR5HWe6nes17eNouk9xUZokkPOO.aGxqV4m/K	2025-03-21 17:55:58.145872	\N
12	user@email.com	$2b$10$oWYY.gfXdYttbVerR01YauO1h4uAUByH6oOtEtjxZzrIA0FB8x32m	2025-03-21 17:57:24.361563	\N
\.


--
-- Name: auteurs_id_auteur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auteurs_id_auteur_seq', 1, true);


--
-- Name: episodes_id_episode_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.episodes_id_episode_seq', 15, true);


--
-- Name: genres_id_genre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_genre_seq', 42, true);


--
-- Name: media_genres_id_media_genre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_genres_id_media_genre_seq', 8, true);


--
-- Name: medias_id_media_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medias_id_media_seq', 3, true);


--
-- Name: realisateurs_id_realisateur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.realisateurs_id_realisateur_seq', 1, true);


--
-- Name: roles_id_role_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_role_seq', 5, true);


--
-- Name: statuts_id_statut_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statuts_id_statut_seq', 2, true);


--
-- Name: studios_id_studio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studios_id_studio_seq', 1, true);


--
-- Name: types_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.types_id_type_seq', 3, true);


--
-- Name: user_roles_id_user_role_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_user_role_seq', 20, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 12, true);


--
-- Name: auteurs auteurs_nom_auteur_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auteurs
    ADD CONSTRAINT auteurs_nom_auteur_key UNIQUE (nom_auteur);


--
-- Name: auteurs auteurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auteurs
    ADD CONSTRAINT auteurs_pkey PRIMARY KEY (id_auteur);


--
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id_episode);


--
-- Name: genres genres_nom_genre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_nom_genre_key UNIQUE (nom_genre);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id_genre);


--
-- Name: media_genres media_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres
    ADD CONSTRAINT media_genres_pkey PRIMARY KEY (id_media_genre);


--
-- Name: medias medias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT medias_pkey PRIMARY KEY (id_media);


--
-- Name: realisateurs realisateurs_nom_realisateur_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.realisateurs
    ADD CONSTRAINT realisateurs_nom_realisateur_key UNIQUE (nom_realisateur);


--
-- Name: realisateurs realisateurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.realisateurs
    ADD CONSTRAINT realisateurs_pkey PRIMARY KEY (id_realisateur);


--
-- Name: roles roles_nom_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nom_role_key UNIQUE (nom_role);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_role);


--
-- Name: statuts statuts_nom_statut_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuts
    ADD CONSTRAINT statuts_nom_statut_key UNIQUE (nom_statut);


--
-- Name: statuts statuts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuts
    ADD CONSTRAINT statuts_pkey PRIMARY KEY (id_statut);


--
-- Name: studios studios_nom_studio_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studios
    ADD CONSTRAINT studios_nom_studio_key UNIQUE (nom_studio);


--
-- Name: studios studios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studios
    ADD CONSTRAINT studios_pkey PRIMARY KEY (id_studio);


--
-- Name: types types_nom_type_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_nom_type_key UNIQUE (nom_type);


--
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (id_type);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id_user_role);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: episodes episodes_id_media_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_id_media_fkey FOREIGN KEY (id_media) REFERENCES public.medias(id_media) ON DELETE CASCADE;


--
-- Name: medias fk_medias_auteurs; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT fk_medias_auteurs FOREIGN KEY (id_auteur) REFERENCES public.auteurs(id_auteur) ON DELETE CASCADE;


--
-- Name: medias fk_medias_realisateurs; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT fk_medias_realisateurs FOREIGN KEY (id_realisateur) REFERENCES public.realisateurs(id_realisateur) ON DELETE CASCADE;


--
-- Name: medias fk_medias_studios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT fk_medias_studios FOREIGN KEY (id_studio) REFERENCES public.studios(id_studio) ON DELETE CASCADE;


--
-- Name: media_genres media_genres_id_genre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres
    ADD CONSTRAINT media_genres_id_genre_fkey FOREIGN KEY (id_genre) REFERENCES public.genres(id_genre) ON DELETE CASCADE;


--
-- Name: media_genres media_genres_id_media_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres
    ADD CONSTRAINT media_genres_id_media_fkey FOREIGN KEY (id_media) REFERENCES public.medias(id_media) ON DELETE CASCADE;


--
-- Name: medias medias_id_statut_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT medias_id_statut_fkey FOREIGN KEY (id_statut) REFERENCES public.statuts(id_statut) ON DELETE CASCADE;


--
-- Name: medias medias_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medias
    ADD CONSTRAINT medias_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.types(id_type) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_id_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.roles(id_role) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_user) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

