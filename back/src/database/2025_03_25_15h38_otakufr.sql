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
-- Name: saisons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saisons (
    id_saison integer NOT NULL,
    numero integer NOT NULL,
    id_media integer NOT NULL,
    created_at timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    updated_at timestamp without time zone
);


ALTER TABLE public.saisons OWNER TO postgres;

--
-- Name: saisons_id_saison_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saisons_id_saison_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saisons_id_saison_seq OWNER TO postgres;

--
-- Name: saisons_id_saison_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saisons_id_saison_seq OWNED BY public.saisons.id_saison;


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
-- Name: saisons id_saison; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saisons ALTER COLUMN id_saison SET DEFAULT nextval('public.saisons_id_saison_seq'::regclass);


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
2	UNKNOWN	2025-03-25 12:35:42.321576	\N
3	Aniplex	2025-03-25 12:35:42.321576	\N
4	Notes	2025-03-25 12:35:42.321576	\N
5	Kadokawa	2025-03-25 12:35:42.321576	\N
6	Level-5	2025-03-25 12:35:42.321576	\N
7	Mainichi Broadcasting System	2025-03-25 12:35:42.321576	\N
8	Showgate	2025-03-25 12:35:42.321576	\N
9	Bandai Namco Entertainment	2025-03-25 12:35:42.321576	\N
10	Hakuhodo DY Music & Pictures	2025-03-25 12:35:42.321576	\N
11	Bandai Namco Arts	2025-03-25 12:35:42.321576	\N
12	Shueisha	2025-03-25 12:35:42.321576	\N
13	bilibili	2025-03-25 12:35:42.321576	\N
14	Harappa	2025-03-25 12:35:42.321576	\N
15	Shinshokan	2025-03-25 12:35:42.321576	\N
16	Kodansha	2025-03-25 12:35:42.321576	\N
17	King Records	2025-03-25 12:35:42.321576	\N
18	DMM Music	2025-03-25 12:35:42.321576	\N
19	AT-X	2025-03-25 12:35:42.321576	\N
20	Takeshobo	2025-03-25 12:35:42.321576	\N
21	Kadokawa Media House	2025-03-25 12:35:42.321576	\N
22	Cygames	2025-03-25 12:35:42.321576	\N
23	Kanetsu Investment	2025-03-25 12:35:42.321576	\N
24	Global Solutions	2025-03-25 12:35:42.321576	\N
25	Sony Music Solutions	2025-03-25 12:35:42.321576	\N
26	IRMA LA DOUCE	2025-03-25 12:35:42.321576	\N
27	AZ Creative	2025-03-25 12:35:42.321576	\N
28	Half H.P Studio	2025-03-25 12:35:42.321576	\N
29	Nippon Columbia	2025-03-25 12:35:42.321576	\N
30	81 Produce	2025-03-25 12:35:42.321576	\N
31	Docomo Anime Store	2025-03-25 12:35:42.321576	\N
32	Fujipacific Music	2025-03-25 12:35:42.321576	\N
33	Ai Addiction	2025-03-25 12:35:42.321576	\N
34	Twin Engine	2025-03-25 12:35:42.321576	\N
35	WOWOW	2025-03-25 12:35:42.321576	\N
36	Genco	2025-03-25 12:35:42.321576	\N
37	Lantis	2025-03-25 12:35:42.321576	\N
38	BS Fuji	2025-03-25 12:35:42.321576	\N
39	Nippon Television Network	2025-03-25 12:35:42.321576	\N
40	Forecast Communications	2025-03-25 12:35:42.321576	\N
41	Yomiuri TV Enterprise	2025-03-25 12:35:42.321576	\N
42	Marui Group	2025-03-25 12:35:42.321576	\N
43	TO Books	2025-03-25 12:35:42.321576	\N
44	MediaNet Pictures	2025-03-25 12:35:42.321576	\N
45	Studio Mausu	2025-03-25 12:35:42.321576	\N
46	NBCUniversal Entertainment Japan	2025-03-25 12:35:42.321576	\N
47	JY Animation	2025-03-25 12:35:42.321576	\N
48	KLab	2025-03-25 12:35:42.321576	\N
49	Legs	2025-03-25 12:35:42.321576	\N
50	Tokyo MX	2025-03-25 12:35:42.321576	\N
51	Q-Tec	2025-03-25 12:35:42.321576	\N
52	Chugai Mining	2025-03-25 12:35:42.321576	\N
53	BS11	2025-03-25 12:35:42.321576	\N
54	Bit grooove promotion	2025-03-25 12:35:42.321576	\N
55	Sotsu	2025-03-25 12:35:42.321576	\N
56	Infinite	2025-03-25 12:35:42.321576	\N
57	Imagine	2025-03-25 12:35:42.321576	\N
58	Ultra Super Pictures	2025-03-25 12:35:42.321576	\N
59	Bushiroad	2025-03-25 12:35:42.321576	\N
60	Good Smile Company	2025-03-25 12:35:42.321576	\N
61	HoriPro International	2025-03-25 12:35:42.321576	\N
62	Cloud22	2025-03-25 12:35:42.321576	\N
63	Pony Canyon	2025-03-25 12:35:42.321576	\N
64	TBS	2025-03-25 12:35:42.321576	\N
65	Movic	2025-03-25 12:35:42.321576	\N
66	Tokuma Shoten	2025-03-25 12:35:42.321576	\N
67	Avex Pictures	2025-03-25 12:35:42.321576	\N
68	Tencent Penguin Pictures	2025-03-25 12:35:42.321576	\N
69	China Literature Limited	2025-03-25 12:35:42.321576	\N
70	Colored Pencil Animation Japan	2025-03-25 12:35:42.321576	\N
71	Bandai Visual	2025-03-25 12:35:42.321576	\N
72	Bandai Namco Games	2025-03-25 12:35:42.321576	\N
73	Sammy	2025-03-25 12:35:42.321576	\N
74	Crunchyroll	2025-03-25 12:35:42.321576	\N
75	NTT Plala	2025-03-25 12:35:42.321576	\N
76	Shochiku	2025-03-25 12:35:42.321576	\N
77	ABC Animation	2025-03-25 12:35:42.321576	\N
78	Netflix	2025-03-25 12:35:42.321576	\N
79	Magic Capsule	2025-03-25 12:35:42.321576	\N
80	DeNA	2025-03-25 12:35:42.321576	\N
81	TV Aichi	2025-03-25 12:35:42.321576	\N
82	Production Ace	2025-03-25 12:35:42.321576	\N
83	BS NTV	2025-03-25 12:35:42.321576	\N
84	Yomiuri Telecasting	2025-03-25 12:35:42.321576	\N
85	Toho	2025-03-25 12:35:42.321576	\N
86	JR East Marketing & Communications	2025-03-25 12:35:42.321576	\N
87	Movie Walker	2025-03-25 12:35:42.321576	\N
88	Production I.G	2025-03-25 12:35:42.321576	\N
89	Delightworks	2025-03-25 12:35:42.321576	\N
90	Toei Animation	2025-03-25 12:35:42.321576	\N
91	VAP	2025-03-25 12:35:42.321576	\N
92	Bandai	2025-03-25 12:35:42.321576	\N
93	Asmik Ace	2025-03-25 12:35:42.321576	\N
94	Tohokushinsha Film Corporation	2025-03-25 12:35:42.321576	\N
95	Nippon Cultural Broadcasting	2025-03-25 12:35:42.321576	\N
96	Bandai Spirits	2025-03-25 12:35:42.321576	\N
97	NetEase	2025-03-25 12:35:42.321576	\N
98	Fosun Entertainment Japan	2025-03-25 12:35:42.321576	\N
99	Houbunsha	2025-03-25 12:35:42.321576	\N
100	f4samurai	2025-03-25 12:35:42.321576	\N
101	Toei Video	2025-03-25 12:35:42.321576	\N
102	Being	2025-03-25 12:35:42.321576	\N
103	MAGNET	2025-03-25 12:35:42.321576	\N
104	Video Market	2025-03-25 12:35:42.321576	\N
105	Tencent Animation & Comics	2025-03-25 12:35:42.321576	\N
106	Tencent Games	2025-03-25 12:35:42.321576	\N
107	Friendly Land	2025-03-25 12:35:42.321576	\N
108	Stray Cats	2025-03-25 12:35:42.321576	\N
109	Chukyo TV Broadcasting	2025-03-25 12:35:42.321576	\N
110	MAGES.	2025-03-25 12:35:42.321576	\N
111	KlockWorx	2025-03-25 12:35:42.321576	\N
112	FuRyu	2025-03-25 12:35:42.321576	\N
113	Square Enix	2025-03-25 12:35:42.321576	\N
114	Warner Bros. Japan	2025-03-25 12:35:42.321576	\N
115	Ichijinsha	2025-03-25 12:35:42.321576	\N
116	Nichion	2025-03-25 12:35:42.321576	\N
117	Akita Shoten	2025-03-25 12:35:42.321576	\N
118	CA-Cygames Anime Fund	2025-03-25 12:35:42.321576	\N
119	Hochi Shimbun	2025-03-25 12:35:42.321576	\N
120	ADK	2025-03-25 12:35:42.321576	\N
121	Shogakukan-Shueisha Productions	2025-03-25 12:35:42.321576	\N
122	TOHO animation	2025-03-25 12:35:42.321576	\N
123	Shogakukan	2025-03-25 12:35:42.321576	\N
124	Sumitomo	2025-03-25 12:35:42.321576	\N
125	RAY	2025-03-25 12:35:42.321576	\N
126	Pia	2025-03-25 12:35:42.321576	\N
127	Pierrot	2025-03-25 12:35:42.321576	\N
128	Crest	2025-03-25 12:35:42.321576	\N
129	D-techno	2025-03-25 12:35:42.321576	\N
130	Dentsu	2025-03-25 12:35:42.321576	\N
131	flying DOG	2025-03-25 12:35:42.321576	\N
132	Satelight	2025-03-25 12:35:42.321576	\N
133	Frontier Works	2025-03-25 12:35:42.321576	\N
134	Exa International	2025-03-25 12:35:42.321576	\N
135	GREE	2025-03-25 12:35:42.321576	\N
136	arma bianca	2025-03-25 12:35:42.321576	\N
137	COLOPL	2025-03-25 12:35:42.321576	\N
138	Royal Limousine	2025-03-25 12:35:42.321576	\N
139	Sony Music Entertainment	2025-03-25 12:35:42.321576	\N
140	Hobby Japan	2025-03-25 12:35:42.321576	\N
141	Anima&Co.	2025-03-25 12:35:42.321576	\N
142	Avex Technologies	2025-03-25 12:35:42.321576	\N
143	Sunrise	2025-03-25 12:35:42.321576	\N
144	iQIYI	2025-03-25 12:35:42.321576	\N
145	Flex Comix	2025-03-25 12:35:42.321576	\N
146	Hokkaido Cultural Broadcasting	2025-03-25 12:35:42.321576	\N
147	Toyo Recording	2025-03-25 12:35:42.321576	\N
148	ibis Capital Partners	2025-03-25 12:35:42.321576	\N
149	Y&N Brothers	2025-03-25 12:35:42.321576	\N
150	SUPA LOVE	2025-03-25 12:35:42.321576	\N
151	Nihon Ad Systems	2025-03-25 12:35:42.321576	\N
152	GYAO!	2025-03-25 12:35:42.321576	\N
153	BookLive	2025-03-25 12:35:42.321576	\N
154	Liber Entertainment	2025-03-25 12:35:42.321576	\N
155	Heart Company	2025-03-25 12:35:42.321576	\N
156	GRANTdesign	2025-03-25 12:35:42.321576	\N
157	Good Smile Film	2025-03-25 12:35:42.321576	\N
158	Saber Links	2025-03-25 12:35:42.321576	\N
159	TV Tokyo	2025-03-25 12:35:42.321576	\N
160	Avex Entertainment	2025-03-25 12:35:42.321576	\N
161	DAX Production	2025-03-25 12:35:42.321576	\N
162	Fuji TV	2025-03-25 12:35:42.321576	\N
163	Nexon	2025-03-25 12:35:42.321576	\N
164	Hakuhodo DY Media Partners	2025-03-25 12:35:42.321576	\N
165	Fuji Creative	2025-03-25 12:35:42.321576	\N
166	Studio Hibari	2025-03-25 12:35:42.321576	\N
167	Contents Seed	2025-03-25 12:35:42.321576	\N
168	Egg Firm	2025-03-25 12:35:42.321576	\N
169	Toho Music	2025-03-25 12:35:42.321576	\N
170	Marvelous	2025-03-25 12:35:42.321576	\N
171	Delfi Sound	2025-03-25 12:35:42.321576	\N
172	North Stars Pictures	2025-03-25 12:35:42.321576	\N
173	Mixer	2025-03-25 12:35:42.321576	\N
174	Sony Pictures Entertainment	2025-03-25 12:35:42.321576	\N
175	SB Creative	2025-03-25 12:35:42.321576	\N
176	Muse Communication	2025-03-25 12:35:42.321576	\N
177	Happinet	2025-03-25 12:35:42.321576	\N
178	Mime Corporation	2025-03-25 12:35:42.321576	\N
179	it's	2025-03-25 12:35:42.321576	\N
180	Memory-Tech	2025-03-25 12:35:42.321576	\N
181	TV Asahi	2025-03-25 12:35:42.321576	\N
182	Lucent Pictures Entertainment	2025-03-25 12:35:42.321576	\N
183	CyberAgent	2025-03-25 12:35:42.321576	\N
184	AbemaTV	2025-03-25 12:35:42.321576	\N
185	DMM.futureworks	2025-03-25 12:35:42.321576	\N
186	Nice Boat Animation	2025-03-25 12:35:42.321576	\N
187	Wolf Smoke Studio	2025-03-25 12:35:42.321576	\N
188	Blue Lynx	2025-03-25 12:35:42.321576	\N
189	Warner Music Japan	2025-03-25 12:35:42.321576	\N
190	NHK Enterprises	2025-03-25 12:35:42.321576	\N
191	Victor Entertainment	2025-03-25 12:35:42.321576	\N
192	Smile Company	2025-03-25 12:35:42.321576	\N
193	Spectrum	2025-03-25 12:35:42.321576	\N
194	Tsuburaya Productions	2025-03-25 12:35:42.321576	\N
195	Sony Creative Products	2025-03-25 12:35:42.321576	\N
196	Bridge	2025-03-25 12:35:42.321576	\N
197	A3	2025-03-25 12:35:42.321576	\N
198	Ichigo Animation	2025-03-25 12:35:42.321576	\N
199	Comic Animation	2025-03-25 12:35:42.321576	\N
200	Mary Jane	2025-03-25 12:35:42.321576	\N
201	Techno Sound	2025-03-25 12:35:42.321576	\N
202	Pony Canyon Enterprise	2025-03-25 12:35:42.321576	\N
203	NewGin	2025-03-25 12:35:42.321576	\N
204	Age Global Networks	2025-03-25 12:35:42.321576	\N
205	AIC RIGHTS	2025-03-25 12:35:42.321576	\N
206	Toranoana	2025-03-25 12:35:42.321576	\N
207	MediaNet	2025-03-25 12:35:42.321576	\N
208	Nikkatsu	2025-03-25 12:35:42.321576	\N
209	Glovision	2025-03-25 12:35:42.321576	\N
210	LIDENFILMS	2025-03-25 12:35:42.321576	\N
211	Amuse	2025-03-25 12:35:42.321576	\N
212	YUKE'S	2025-03-25 12:35:42.321576	\N
213	Konami Cross Media NY	2025-03-25 12:35:42.321576	\N
214	Nagoya Broadcasting Network	2025-03-25 12:35:42.321576	\N
215	Buzz Wave	2025-03-25 12:35:42.321576	\N
216	Slow Curve	2025-03-25 12:35:42.321576	\N
217	DMM pictures	2025-03-25 12:35:42.321576	\N
218	dugout	2025-03-25 12:35:42.321576	\N
219	Sanrio	2025-03-25 12:35:42.321576	\N
220	Sega	2025-03-25 12:35:42.321576	\N
221	Rialto Entertainment	2025-03-25 12:35:42.321576	\N
222	Sola Entertainment	2025-03-25 12:35:42.321576	\N
223	Naver Webtoons	2025-03-25 12:35:42.321576	\N
224	Nippon Animation	2025-03-25 12:35:42.321576	\N
225	entama	2025-03-25 12:35:42.321576	\N
226	Rock’n Roll Mountain	2025-03-25 12:35:42.321576	\N
227	GARNET	2025-03-25 12:35:42.321576	\N
228	Voyager Entertainment	2025-03-25 12:35:42.321576	\N
229	ADK Marketing Solutions	2025-03-25 12:35:42.321576	\N
230	Tencent Japan	2025-03-25 12:35:42.321576	\N
231	TV Osaka	2025-03-25 12:35:42.321576	\N
232	Hakusensha	2025-03-25 12:35:42.321576	\N
233	TMS Music	2025-03-25 12:35:42.321576	\N
234	8PAN	2025-03-25 12:35:42.321576	\N
235	Animax	2025-03-25 12:35:42.321576	\N
236	Live Viewing Japan	2025-03-25 12:35:42.321576	\N
237	Medicos Entertainment	2025-03-25 12:35:42.321576	\N
238	Straight Edge	2025-03-25 12:35:42.321576	\N
239	NHK	2025-03-25 12:35:42.321576	\N
240	Sonilude	2025-03-25 12:35:42.321576	\N
241	Lune Pictures	2025-03-25 12:35:42.321576	\N
242	APDREAM	2025-03-25 12:35:42.321576	\N
243	Dream Shift	2025-03-25 12:35:42.321576	\N
244	Bergamo	2025-03-25 12:35:42.321576	\N
245	Bit Promotion	2025-03-25 12:35:42.321576	\N
246	OLM	2025-03-25 12:35:42.321576	\N
247	Banpresto	2025-03-25 12:35:42.321576	\N
248	Studio Live	2025-03-25 12:35:42.321576	\N
249	DMM.com	2025-03-25 12:35:42.321576	\N
250	AQUAPLUS	2025-03-25 12:35:42.321576	\N
251	Tapioca	2025-03-25 12:35:42.321576	\N
252	Rakuonsha	2025-03-25 12:35:42.321576	\N
253	Anchor	2025-03-25 12:35:42.321576	\N
254	Asatsu DK	2025-03-25 12:35:42.321576	\N
255	Asahi Broadcasting	2025-03-25 12:35:42.321576	\N
256	Pink Pineapple	2025-03-25 12:35:42.321576	\N
257	Tohan Corporation	2025-03-25 12:35:42.321576	\N
258	Japan Volleyball Association	2025-03-25 12:35:42.321576	\N
259	Chiptune	2025-03-25 12:35:42.321576	\N
260	Antechinus	2025-03-25 12:35:42.321576	\N
261	A-Sketch	2025-03-25 12:35:42.321576	\N
262	Youku	2025-03-25 12:35:42.321576	\N
263	Suiseisha	2025-03-25 12:35:42.321576	\N
264	Sumzap	2025-03-25 12:35:42.321576	\N
265	Polygon Pictures	2025-03-25 12:35:42.321576	\N
266	Visual Arts	2025-03-25 12:35:42.321576	\N
267	Evil Line Records	2025-03-25 12:35:42.321576	\N
268	Tokyo Animator Gakuin	2025-03-25 12:35:42.321576	\N
269	JTB Next Creation	2025-03-25 12:35:42.321576	\N
270	studioGONG	2025-03-25 12:35:42.321576	\N
271	F.M.F	2025-03-25 12:35:42.321576	\N
272	Wicky.Records	2025-03-25 12:35:42.321576	\N
273	Abe Shuuji Jimusho	2025-03-25 12:35:42.321576	\N
274	Shizuoka Asahi Television	2025-03-25 12:35:42.321576	\N
275	Nitroplus	2025-03-25 12:35:42.321576	\N
276	Sunrise Music	2025-03-25 12:35:42.321576	\N
277	syn Sophia	2025-03-25 12:35:42.321576	\N
278	Studio Gokumi	2025-03-25 12:35:42.321576	\N
279	My Theater D.D.	2025-03-25 12:35:42.321576	\N
280	Bushiroad Music	2025-03-25 12:35:42.321576	\N
281	Front Wing	2025-03-25 12:35:42.321576	\N
282	Bushiroad Move	2025-03-25 12:35:42.321576	\N
283	Yomiuri Shimbun	2025-03-25 12:35:42.321576	\N
284	Mousou Jitsugen Media	2025-03-25 12:35:42.321576	\N
285	NichiNare	2025-03-25 12:35:42.321576	\N
286	Tohjak	2025-03-25 12:35:42.321576	\N
287	Hifumi Shobo	2025-03-25 12:35:42.321576	\N
288	Shufu to Seikatsusha	2025-03-25 12:35:42.321576	\N
289	Daiichi Shokai	2025-03-25 12:35:42.321576	\N
290	ELF-IN	2025-03-25 12:35:42.321576	\N
291	Gallop	2025-03-25 12:35:42.321576	\N
292	Yomiko Advertising	2025-03-25 12:35:42.321576	\N
293	Amusement Media Academy	2025-03-25 12:35:42.321576	\N
294	BloomZ	2025-03-25 12:35:42.321576	\N
295	AMG Entertainment	2025-03-25 12:35:42.321576	\N
296	Christmas Holly	2025-03-25 12:35:42.321576	\N
297	Miyazaki Broadcasting	2025-03-25 12:35:42.321576	\N
298	C-one	2025-03-25 12:35:42.321576	\N
299	Universal Music Japan	2025-03-25 12:35:42.321576	\N
300	KDDI	2025-03-25 12:35:42.321576	\N
301	Dentsu Meitetsu Communications	2025-03-25 12:35:42.321576	\N
302	BOMB! CUTE! BOMB!	2025-03-25 12:35:42.321576	\N
303	iDreamSky	2025-03-25 12:35:42.321576	\N
304	Enterbrain	2025-03-25 12:35:42.321576	\N
305	INCS toenter	2025-03-25 12:35:42.321576	\N
306	IMAGICA Lab.	2025-03-25 12:35:42.321576	\N
307	Sound Team Don Juan	2025-03-25 12:35:42.321576	\N
308	Nihon Keizai Koukokusha	2025-03-25 12:35:42.321576	\N
309	nobishiro lab	2025-03-25 12:35:42.321576	\N
310	Queen Bee	2025-03-25 12:35:42.321576	\N
311	Mediabank	2025-03-25 12:35:42.321576	\N
312	AMG MUSIC	2025-03-25 12:35:42.321576	\N
313	Picante Circus	2025-03-25 12:35:42.321576	\N
314	Happinet Phantom Studios	2025-03-25 12:35:42.321576	\N
315	CUCURI	2025-03-25 12:35:42.321576	\N
316	Hayakawa Shobou	2025-03-25 12:35:42.321576	\N
317	Grooove	2025-03-25 12:35:42.321576	\N
318	Quyue Technology	2025-03-25 12:35:42.321576	\N
319	Manhoo Culture	2025-03-25 12:35:42.321576	\N
320	Yomiuri Advertising	2025-03-25 12:35:42.321576	\N
321	Aeon Entertainment	2025-03-25 12:35:42.321576	\N
322	ADK Emotions	2025-03-25 12:35:42.321576	\N
323	Stella Promotion	2025-03-25 12:35:42.321576	\N
324	Tower Records	2025-03-25 12:35:42.321576	\N
325	Micro Magazine Publishing	2025-03-25 12:35:42.321576	\N
326	ASK Animation Studio	2025-03-25 12:35:42.321576	\N
327	Showten	2025-03-25 12:35:42.321576	\N
328	XFLAG	2025-03-25 12:35:42.321576	\N
329	Pure Arts	2025-03-25 12:35:42.321576	\N
330	Manga Productions	2025-03-25 12:35:42.321576	\N
331	Toy's Factory	2025-03-25 12:35:42.321576	\N
332	Tianwen Kadokawa Animation & Comics	2025-03-25 12:35:42.321576	\N
333	Kanon Sound	2025-03-25 12:35:42.321576	\N
334	Show Corporation	2025-03-25 12:35:42.321576	\N
335	Chongzhuo Animation	2025-03-25 12:35:42.321576	\N
336	WOWMAX	2025-03-25 12:35:42.321576	\N
337	Gold Bear	2025-03-25 12:35:42.321576	\N
338	Marvelous AQL	2025-03-25 12:35:42.321576	\N
339	Year Young Culture	2025-03-25 12:35:42.321576	\N
340	Office Nobu	2025-03-25 12:35:42.321576	\N
341	Mirai-Kojo	2025-03-25 12:35:42.321576	\N
342	Laftel	2025-03-25 12:35:42.321576	\N
343	Micro House	2025-03-25 12:35:42.321576	\N
344	CG Year	2025-03-25 12:35:42.321576	\N
345	Nintendo	2025-03-25 12:35:42.321576	\N
346	Creatures Inc.	2025-03-25 12:35:42.321576	\N
347	Nippon Television Music	2025-03-25 12:35:42.321576	\N
348	miHoYoAnime	2025-03-25 12:35:42.321576	\N
349	Imagineer	2025-03-25 12:35:42.321576	\N
350	Planet Cartoon	2025-03-25 12:35:42.321576	\N
351	TV Tokyo Music	2025-03-25 12:35:42.321576	\N
352	CD Projekt Red	2025-03-25 12:35:42.321576	\N
353	Wolfsbane	2025-03-25 12:35:42.321576	\N
354	Starry Cube	2025-03-25 12:35:42.321576	\N
355	TV Asahi Music	2025-03-25 12:35:42.321576	\N
356	tamakoshi	2025-03-25 12:35:42.321576	\N
357	CTW	2025-03-25 12:35:42.321576	\N
358	FUTURE LEAP	2025-03-25 12:35:42.321576	\N
359	Jinnan Studio	2025-03-25 12:35:42.321576	\N
360	TMS Entertainment	2025-03-25 12:35:42.321576	\N
361	Kanade Creative	2025-03-25 12:35:42.321576	\N
362	Fenz	2025-03-25 12:35:42.321576	\N
363	Beijing Enlight Pictures	2025-03-25 12:35:42.321576	\N
364	Horgos Coloroom Pictures Co.	2025-03-25 12:35:42.321576	\N
365	Ltd.	2025-03-25 12:35:42.321576	\N
366	CEKAI	2025-03-25 12:35:42.321576	\N
367	CBC Television	2025-03-25 12:35:42.321576	\N
368	Planet	2025-03-25 12:35:42.321576	\N
369	Maho Film	2025-03-25 12:35:42.321576	\N
370	Zipang	2025-03-25 12:35:42.321576	\N
371	GREE Entertainment	2025-03-25 12:35:42.321576	\N
372	AQUA ARIS	2025-03-25 12:35:42.321576	\N
373	jeux d'eau	2025-03-25 12:35:42.321576	\N
374	Toei Advertising	2025-03-25 12:35:42.321576	\N
375	Foch Films	2025-03-25 12:35:42.321576	\N
376	Wave Master	2025-03-25 12:35:42.321576	\N
377	Wright Staff	2025-03-25 12:35:42.321576	\N
378	Aiming	2025-03-25 12:35:42.321576	\N
379	Qiyuan Yinghua	2025-03-25 12:35:42.321576	\N
380	Magilm Pictures	2025-03-25 12:35:42.321576	\N
381	Shanghai Animation Film Studio	2025-03-25 12:35:42.321576	\N
382	Liyu Culture	2025-03-25 12:35:42.321576	\N
383	Yunyi Animation	2025-03-25 12:35:42.321576	\N
384	Haowan Dongman	2025-03-25 12:35:42.321576	\N
385	Qizhiying Culture	2025-03-25 12:35:42.321576	\N
386	Capcom	2025-03-25 12:35:42.321576	\N
387	BS Asahi	2025-03-25 12:35:42.321576	\N
388	FABTONE	2025-03-25 12:35:42.321576	\N
389	P.I.C.S.	2025-03-25 12:35:42.321576	\N
390	D.N. Dream Partners	2025-03-25 12:35:42.321576	\N
391	CHANCE iN	2025-03-25 12:35:42.321576	\N
392	Nobel	2025-03-25 12:35:42.321576	\N
393	ZIZ Entertainment (ZIZ)	2025-03-25 12:35:42.321576	\N
394	Pyramid	2025-03-25 12:35:42.321576	\N
395	AlphaPolis	2025-03-25 12:35:42.321576	\N
396	FILMONY	2025-03-25 12:35:42.321576	\N
397	Aoi Studio	2025-03-25 12:35:42.321576	\N
398	San-X	2025-03-25 12:35:42.321576	\N
399	TYO	2025-03-25 12:35:42.321576	\N
400	Studio Easter	2025-03-25 12:35:42.321576	\N
401	Bandai Namco Live Creative	2025-03-25 12:35:42.321576	\N
402	Office ENDLESS	2025-03-25 12:35:42.321576	\N
403	Studio A-CAT	2025-03-25 12:35:42.321576	\N
404	Fields	2025-03-25 12:35:42.321576	\N
405	Kansai Telecasting	2025-03-25 12:35:42.321576	\N
406	Myrica Music	2025-03-25 12:35:42.321576	\N
407	KBS Kyoto	2025-03-25 12:35:42.321576	\N
408	U-NEXT	2025-03-25 12:35:42.321576	\N
409	Alibaba Pictures	2025-03-25 12:35:42.321576	\N
410	Yaoqi	2025-03-25 12:35:42.321576	\N
411	BeDream	2025-03-25 12:35:42.321576	\N
412	Seasun Pictures	2025-03-25 12:35:42.321576	\N
413	Bytehoo	2025-03-25 12:35:42.321576	\N
414	Strawberry Meets Pictures	2025-03-25 12:35:42.321576	\N
415	Melonbooks	2025-03-25 12:35:42.321576	\N
416	Mixi	2025-03-25 12:35:42.321576	\N
417	Toho Interactive Animation	2025-03-25 12:35:42.321576	\N
418	High Energy Studio	2025-03-25 12:35:42.321576	\N
419	Hololive Production	2025-03-25 12:35:42.321576	\N
420	Tatsunoko Production	2025-03-25 12:35:42.321576	\N
421	Libre	2025-03-25 12:35:42.321576	\N
422	animate	2025-03-25 12:35:42.321576	\N
423	Kuaikan Manhua	2025-03-25 12:35:42.321576	\N
424	D.ROCK-ART	2025-03-25 12:35:42.321576	\N
425	Shufunotomo	2025-03-25 12:35:42.321576	\N
426	Hakuhodo	2025-03-25 12:35:42.321576	\N
427	Kamimine-chou	2025-03-25 12:35:42.321576	\N
428	Coamix	2025-03-25 12:35:42.321576	\N
429	eStream	2025-03-25 12:35:42.321576	\N
430	Oriental Creative Color	2025-03-25 12:35:42.321576	\N
431	AHA Entertainment	2025-03-25 12:35:42.321576	\N
432	FIREBUG	2025-03-25 12:35:42.321576	\N
433	Days	2025-03-25 12:35:42.321576	\N
434	Yoshimoto Kogyo	2025-03-25 12:35:42.321576	\N
435	feel.	2025-03-25 12:35:42.321576	\N
436	Children's Playground Entertainment	2025-03-25 12:35:42.321576	\N
437	Creek	2025-03-25 12:35:42.321576	\N
438	HJ Holdings	2025-03-25 12:35:42.321576	\N
439	Shogakukan Music & Digital Entertainment	2025-03-25 12:35:42.321576	\N
440	blackflag	2025-03-25 12:35:42.321576	\N
441	CBS	2025-03-25 12:35:42.321576	\N
442	Alpha Pictures	2025-03-25 12:35:42.321576	\N
443	FLAGSHIP LINE	2025-03-25 12:35:42.321576	\N
444	Sun TV	2025-03-25 12:35:42.321576	\N
445	Bandai Namco Music Live	2025-03-25 12:35:42.321576	\N
446	Mag Garden	2025-03-25 12:35:42.321576	\N
447	Nihon Falcom	2025-03-25 12:35:42.321576	\N
448	NADA Holdings	2025-03-25 12:35:42.321576	\N
449	USERJOY Technology	2025-03-25 12:35:42.321576	\N
450	Konami Digital Entertainment	2025-03-25 12:35:42.321576	\N
451	BS Japan	2025-03-25 12:35:42.321576	\N
452	Liu Cong Animation	2025-03-25 12:35:42.321576	\N
453	Earth Star Entertainment	2025-03-25 12:35:42.321576	\N
454	Culture Entertainment	2025-03-25 12:35:42.321576	\N
455	Happy Elements	2025-03-25 12:35:42.321576	\N
456	CMI	2025-03-25 12:35:42.321576	\N
457	Arch	2025-03-25 12:35:42.321576	\N
458	Bouncy	2025-03-25 12:35:42.321576	\N
459	Colored Pencil Animation	2025-03-25 12:35:42.321576	\N
460	Quaras	2025-03-25 12:35:42.321576	\N
461	Scarlet	2025-03-25 12:35:42.321576	\N
462	Brave group	2025-03-25 12:35:42.321576	\N
463	Infinity Animations	2025-03-25 12:35:42.321576	\N
464	Overlap	2025-03-25 12:35:42.321576	\N
465	Midorimatsu	2025-03-25 12:35:42.321576	\N
466	Polygon Magic	2025-03-25 12:35:42.321576	\N
467	Bandai Namco Filmworks	2025-03-25 12:35:42.321576	\N
468	Sankyo	2025-03-25 12:35:42.321576	\N
469	Music Brains	2025-03-25 12:35:42.321576	\N
470	RX-RECORDS	2025-03-25 12:35:42.321576	\N
471	UK.PROJECT INC.	2025-03-25 12:35:42.321576	\N
472	Bandai Namco Online	2025-03-25 12:35:42.321576	\N
473	Haoliners Animation League	2025-03-25 12:35:42.321576	\N
474	Painted Blade Studio	2025-03-25 12:35:42.321576	\N
475	Takara Tomy A.R.T.S	2025-03-25 12:35:42.321576	\N
476	Funimation	2025-03-25 12:35:42.321576	\N
477	CHOCOLATE	2025-03-25 12:35:42.321576	\N
478	ABC Frontier	2025-03-25 12:35:42.321576	\N
479	Chosen	2025-03-25 12:35:42.321576	\N
480	Fujian Ziyan Animation Technology	2025-03-25 12:35:42.321576	\N
481	Yokohama Animation Lab	2025-03-25 12:35:42.321576	\N
482	Brave Hearts	2025-03-25 12:35:42.321576	\N
483	EXNOA	2025-03-25 12:35:42.321576	\N
484	Yostar Pictures	2025-03-25 12:35:42.321576	\N
485	Poplar Publishing	2025-03-25 12:35:42.321576	\N
486	Yuewen Animation & Comics	2025-03-25 12:35:42.321576	\N
487	Geek Pictures	2025-03-25 12:35:42.321576	\N
488	Koei Tecmo Games	2025-03-25 12:35:42.321576	\N
489	Futabasha	2025-03-25 12:35:42.321576	\N
490	MusicRay’n	2025-03-25 12:35:42.321576	\N
491	Lawson Entertainment	2025-03-25 12:35:42.321576	\N
492	flaggs	2025-03-25 12:35:42.321576	\N
493	Laulea Works	2025-03-25 12:35:42.321576	\N
494	Alice	2025-03-25 12:35:42.321576	\N
495	White Bear	2025-03-25 12:35:42.321576	\N
496	Yostar	2025-03-25 12:35:42.321576	\N
497	HM Heros	2025-03-25 12:35:42.321576	\N
498	Disney Platform Distribution	2025-03-25 12:35:42.321576	\N
499	Youliao Studio	2025-03-25 12:35:42.321576	\N
500	Kill Time Communication	2025-03-25 12:35:42.321576	\N
501	Gentosha Comics	2025-03-25 12:35:42.321576	\N
502	Graphinica	2025-03-25 12:35:42.321576	\N
503	Village Studio	2025-03-25 12:35:42.321576	\N
504	Yikuiduo Animation	2025-03-25 12:35:42.321576	\N
505	Akatsuki	2025-03-25 12:35:42.321576	\N
506	Kamitsubaki Studio	2025-03-25 12:35:42.321576	\N
507	Cloud Art	2025-03-25 12:35:42.321576	\N
508	Geidai Animation	2025-03-25 12:35:42.321576	\N
509	Tokyo Zokei University	2025-03-25 12:35:42.321576	\N
510	Ichikara Inc.	2025-03-25 12:35:42.321576	\N
511	Hypergryph	2025-03-25 12:35:42.321576	\N
512	Studio Montagne	2025-03-25 12:35:42.321576	\N
513	LOGIC&MAGIC	2025-03-25 12:35:42.321576	\N
514	WarRock	2025-03-25 12:35:42.321576	\N
515	Studio Massket	2025-03-25 12:35:42.321576	\N
516	Paper Plane Animation Studio	2025-03-25 12:35:42.321576	\N
517	Miyu Productions	2025-03-25 12:35:42.321576	\N
518	Xuanyuan Network	2025-03-25 12:35:42.321576	\N
519	YURUPPE Inc.	2025-03-25 12:35:42.321576	\N
520	CMC MEDIA	2025-03-25 12:35:42.321576	\N
521	Craftsman Animation	2025-03-25 12:35:42.321576	\N
522	Wonder Cat Animation	2025-03-25 12:35:42.321576	\N
523	STORY	2025-03-25 12:35:42.321576	\N
524	Xuanshi Tangmen	2025-03-25 12:35:42.321576	\N
525	Fengyun Animation	2025-03-25 12:35:42.321576	\N
526	Epicross	2025-03-25 12:35:42.321576	\N
527	Bushiroad Creative	2025-03-25 12:35:42.321576	\N
528	GAGA	2025-03-25 12:35:42.321576	\N
529	Rakuten	2025-03-25 12:35:42.321576	\N
530	Jumondo	2025-03-25 12:35:42.321576	\N
531	ensky	2025-03-25 12:35:42.321576	\N
532	TV Tokyo Communications	2025-03-25 12:35:42.321576	\N
533	Shinchosha	2025-03-25 12:35:42.321576	\N
534	Stay Luck	2025-03-25 12:35:42.321576	\N
535	Miki Production	2025-03-25 12:35:42.321576	\N
536	Wanda Media	2025-03-25 12:35:42.321576	\N
537	Maxilla	2025-03-25 12:35:42.321576	\N
538	Vobile Japan	2025-03-25 12:35:42.321576	\N
539	Kizuna AI	2025-03-25 12:35:42.321576	\N
540	Felix Film	2025-03-25 12:35:42.321576	\N
541	Aoni Production	2025-03-25 12:35:42.321576	\N
542	GKIDS	2025-03-25 12:35:42.321576	\N
543	Tianshi Wenhua	2025-03-25 12:35:42.321576	\N
544	China South Angel	2025-03-25 12:35:42.321576	\N
545	Tezuka Productions	2025-03-25 12:35:42.321576	\N
546	QualiArts	2025-03-25 12:35:42.321576	\N
547	Alpha Animation	2025-03-25 12:35:42.321576	\N
548	TiMi Studio Group	2025-03-25 12:35:42.321576	\N
549	MediBang	2025-03-25 12:35:42.321576	\N
550	HoriPro	2025-03-25 12:35:42.321576	\N
551	Miracle Bus	2025-03-25 12:35:42.321576	\N
552	Audio Planning U	2025-03-25 12:35:42.321576	\N
553	Donuts	2025-03-25 12:35:42.321576	\N
554	China Film Animation	2025-03-25 12:35:42.321576	\N
555	Youth Film Studio	2025-03-25 12:35:42.321576	\N
556	Huaxia Film Distribution	2025-03-25 12:35:42.321576	\N
557	King Bee	2025-03-25 12:35:42.321576	\N
558	Fantawild Animation	2025-03-25 12:35:42.321576	\N
559	Soular Animation Studio	2025-03-25 12:35:42.321576	\N
560	Haneda xR Studio	2025-03-25 12:35:42.321576	\N
561	NANON CREATIVE	2025-03-25 12:35:42.321576	\N
562	Korean Academy of Film Arts	2025-03-25 12:35:42.321576	\N
563	Atelier Musa	2025-03-25 12:35:42.321576	\N
564	Asahi Shimbun	2025-03-25 12:35:42.321576	\N
565	Asahi Shinbun Shuppan	2025-03-25 12:35:42.321576	\N
566	INoNaKa Music	2025-03-25 12:35:42.321576	\N
567	Fanworks	2025-03-25 12:35:42.321576	\N
568	INSPION Edge	2025-03-25 12:35:42.321576	\N
569	Bibury Animation CG	2025-03-25 12:35:42.321576	\N
570	Shounen Gahousha	2025-03-25 12:35:42.321576	\N
571	Happinet Media Marketing	2025-03-25 12:35:42.321576	\N
572	Composition Inc.	2025-03-25 12:35:42.321576	\N
573	Rainbow Entertainment	2025-03-25 12:35:42.321576	\N
574	Seikaisha	2025-03-25 12:35:42.321576	\N
575	D&C WEBTOON Biz	2025-03-25 12:35:42.321576	\N
576	Xiaoming Taiji	2025-03-25 12:35:42.321576	\N
577	Imagin	2025-03-25 12:35:42.321576	\N
578	TVA advance	2025-03-25 12:35:42.321576	\N
579	Zhou Shen Studio	2025-03-25 12:35:42.321576	\N
580	Ranzai Studio	2025-03-25 12:35:42.321576	\N
581	Half HP Studio	2025-03-25 12:35:42.321576	\N
582	Yahoo! Japan	2025-03-25 12:35:42.321576	\N
583	Beyond C.	2025-03-25 12:35:42.321576	\N
584	K contents	2025-03-25 12:35:42.321576	\N
585	COMICSMART	2025-03-25 12:35:42.321576	\N
586	Sentai Filmworks	2025-03-25 12:35:42.321576	\N
587	A-1 Pictures	2025-03-25 12:35:42.321576	\N
588	Precious Tone	2025-03-25 12:35:42.321576	\N
589	Tomoyasu Murata Company	2025-03-25 12:35:42.321576	\N
590	Robot Communications	2025-03-25 12:35:42.321576	\N
591	Hawkeye	2025-03-25 12:35:42.321576	\N
592	Daito Giken	2025-03-25 12:35:42.321576	\N
593	THINKR	2025-03-25 12:35:42.321576	\N
594	Zack Promotion	2025-03-25 12:35:42.321576	\N
595	Digital Network Animation	2025-03-25 12:35:42.321576	\N
596	Majime Inc.	2025-03-25 12:35:42.321576	\N
597	HIAN	2025-03-25 12:35:42.321576	\N
598	The Answer Studio	2025-03-25 12:35:42.321576	\N
599	100studio	2025-03-25 12:35:42.321576	\N
600	Quebico	2025-03-25 12:35:42.321576	\N
601	REALCOFFEE ENTERTAINMENT	2025-03-25 12:35:42.321576	\N
602	Oddjob	2025-03-25 12:35:42.321576	\N
603	Studio Nanahoshi	2025-03-25 12:35:42.321576	\N
604	BS-TBS	2025-03-25 12:35:42.321576	\N
605	Trinity Sound	2025-03-25 12:35:42.321576	\N
606	Ace Crew Entertainment	2025-03-25 12:35:42.321576	\N
607	Zero-G	2025-03-25 12:35:42.321576	\N
608	Whatever Co.	2025-03-25 12:35:42.321576	\N
609	THINGS.	2025-03-25 12:35:42.321576	\N
610	MAZRI	2025-03-25 12:35:42.321576	\N
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
15	Re:Zero kara Hajimeru Isekai Seikatsu S3 15 Vostfr	15	1	2025-03-24 17:54:36.557116	2025-03-24 21:17:06.232061	2025-03-18 03:00:00
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
149	Award Winning	2025-03-25 12:27:35.141986	\N
150	Drama	2025-03-25 12:27:35.141986	\N
151	Slice of Life	2025-03-25 12:27:35.141986	\N
152	Fantasy	2025-03-25 12:27:35.141986	\N
153	Supernatural	2025-03-25 12:27:35.141986	\N
154	Comedy	2025-03-25 12:27:35.141986	\N
155	UNKNOWN	2025-03-25 12:27:35.141986	\N
156	Adventure	2025-03-25 12:27:35.141986	\N
157	Boys Love	2025-03-25 12:27:35.141986	\N
158	Erotica	2025-03-25 12:27:35.141986	\N
159	Mystery	2025-03-25 12:27:35.141986	\N
160	Girls Love	2025-03-25 12:27:35.141986	\N
161	Sports	2025-03-25 12:27:35.141986	\N
162	Horror	2025-03-25 12:27:35.141986	\N
163	Gourmet	2025-03-25 12:27:35.141986	\N
164	Hentai	2025-03-25 12:27:35.141986	\N
165	Avant Garde	2025-03-25 12:27:35.141986	\N
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
-- Data for Name: saisons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saisons (id_saison, numero, id_media, created_at, updated_at) FROM stdin;
1	3	1	2025-03-24 18:35:40.852919	\N
\.


--
-- Data for Name: statuts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.statuts (id_statut, nom_statut, created_at, updated_at) FROM stdin;
1	En cours	2025-03-21 18:55:08.055591	\N
2	Terminé	2025-03-21 18:55:08.055591	\N
3	Finished Airing	2025-03-25 12:33:33.739942	\N
4	Not yet aired	2025-03-25 12:33:33.739942	\N
5	Currently Airing	2025-03-25 12:33:33.739942	\N
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
4	Movie	2025-03-25 12:29:23.518807	\N
5	TV	2025-03-25 12:29:23.518807	\N
6	Special	2025-03-25 12:29:23.518807	\N
7	OVA	2025-03-25 12:29:23.518807	\N
8	ONA	2025-03-25 12:29:23.518807	\N
9	Music	2025-03-25 12:29:23.518807	\N
10	UNKNOWN	2025-03-25 12:29:23.518807	\N
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

SELECT pg_catalog.setval('public.auteurs_id_auteur_seq', 610, true);


--
-- Name: episodes_id_episode_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.episodes_id_episode_seq', 15, true);


--
-- Name: genres_id_genre_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_genre_seq', 165, true);


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
-- Name: saisons_id_saison_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saisons_id_saison_seq', 1, true);


--
-- Name: statuts_id_statut_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statuts_id_statut_seq', 5, true);


--
-- Name: studios_id_studio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.studios_id_studio_seq', 1, true);


--
-- Name: types_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.types_id_type_seq', 10, true);


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
-- Name: saisons saisons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saisons
    ADD CONSTRAINT saisons_pkey PRIMARY KEY (id_saison);


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
-- Name: saisons saisons_id_media_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saisons
    ADD CONSTRAINT saisons_id_media_fkey FOREIGN KEY (id_media) REFERENCES public.medias(id_media) ON DELETE CASCADE;


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

