--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg19.04+1)

--
-- TOC entry 221 (class 1259 OID 49172)
-- Name: assessments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assessments (
    id integer NOT NULL,
    department_id integer NOT NULL,
    course_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.assessments OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49170)
-- Name: assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.assessments_id_seq OWNER TO postgres;

--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 220
-- Name: assessments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assessments_id_seq OWNED BY public.assessments.id;


--
-- TOC entry 205 (class 1259 OID 16396)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying NOT NULL,
    state character varying NOT NULL,
    city character varying NOT NULL,
    street character varying NOT NULL,
    zipcode character varying NOT NULL,
    country character varying NOT NULL,
    max_employee_count integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16394)
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 204
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- TOC entry 213 (class 1259 OID 40963)
-- Name: company_modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company_modules (
    id integer NOT NULL,
    company_id integer NOT NULL,
    module_id integer NOT NULL,
    module_count integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.company_modules OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 40961)
-- Name: company_modules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.company_modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_modules_id_seq OWNER TO postgres;

--
-- TOC entry 3110 (class 0 OID 0)
-- Dependencies: 212
-- Name: company_modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.company_modules_id_seq OWNED BY public.company_modules.id;


--
-- TOC entry 215 (class 1259 OID 40985)
-- Name: coupons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coupons (
    id integer NOT NULL,
    code character varying NOT NULL,
    discount_percent integer,
    discount_amount integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    name character varying NOT NULL
);


ALTER TABLE public.coupons OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 40983)
-- Name: coupons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coupons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coupons_id_seq OWNER TO postgres;

--
-- TOC entry 3111 (class 0 OID 0)
-- Dependencies: 214
-- Name: coupons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coupons_id_seq OWNED BY public.coupons.id;


--
-- TOC entry 209 (class 1259 OID 24589)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying NOT NULL,
    video_url character varying NOT NULL,
    sequence integer NOT NULL,
    module_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 24587)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.courses_id_seq OWNER TO postgres;

--
-- TOC entry 3112 (class 0 OID 0)
-- Dependencies: 208
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 219 (class 1259 OID 49155)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    company_id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 49153)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departments_id_seq OWNER TO postgres;

--
-- TOC entry 3113 (class 0 OID 0)
-- Dependencies: 218
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 207 (class 1259 OID 24579)
-- Name: modules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modules (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text NOT NULL,
    logo_url character varying NOT NULL,
    price integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.modules OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 24577)
-- Name: modules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modules_id_seq OWNER TO postgres;

--
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 206
-- Name: modules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modules_id_seq OWNED BY public.modules.id;


--
-- TOC entry 211 (class 1259 OID 32771)
-- Name: onboarding_statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.onboarding_statuses (
    id integer NOT NULL,
    user_id integer NOT NULL,
    last_step character varying,
    module_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.onboarding_statuses OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 32769)
-- Name: onboarding_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.onboarding_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.onboarding_id_seq OWNER TO postgres;

--
-- TOC entry 3115 (class 0 OID 0)
-- Dependencies: 210
-- Name: onboarding_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.onboarding_id_seq OWNED BY public.onboarding_statuses.id;


--
-- TOC entry 217 (class 1259 OID 40999)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    company_id integer NOT NULL,
    module_id integer NOT NULL,
    module_count integer NOT NULL,
    coupon_id integer,
    amount integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    payment_intent_id character varying NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 40997)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO postgres;

--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 216
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- TOC entry 203 (class 1259 OID 16387)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    auth0_id character varying NOT NULL,
    email character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    phone_number character varying NOT NULL,
    company_id integer,
    role_name character varying DEFAULT 'Employee'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16385)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 3117 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- TOC entry 2905 (class 2604 OID 49175)
-- Name: assessments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments ALTER COLUMN id SET DEFAULT nextval('public.assessments_id_seq'::regclass);


--
-- TOC entry 2889 (class 2604 OID 16399)
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 40966)
-- Name: company_modules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_modules ALTER COLUMN id SET DEFAULT nextval('public.company_modules_id_seq'::regclass);


--
-- TOC entry 2899 (class 2604 OID 40988)
-- Name: coupons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons ALTER COLUMN id SET DEFAULT nextval('public.coupons_id_seq'::regclass);


--
-- TOC entry 2893 (class 2604 OID 24592)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 2903 (class 2604 OID 49158)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 2891 (class 2604 OID 24582)
-- Name: modules id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules ALTER COLUMN id SET DEFAULT nextval('public.modules_id_seq'::regclass);


--
-- TOC entry 2895 (class 2604 OID 32774)
-- Name: onboarding_statuses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onboarding_statuses ALTER COLUMN id SET DEFAULT nextval('public.onboarding_id_seq'::regclass);


--
-- TOC entry 2901 (class 2604 OID 41002)
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- TOC entry 2886 (class 2604 OID 16390)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3118 (class 0 OID 0)
-- Dependencies: 220
-- Name: assessments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assessments_id_seq', 14, true);


--
-- TOC entry 3119 (class 0 OID 0)
-- Dependencies: 204
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.companies_id_seq', 3, true);


--
-- TOC entry 3120 (class 0 OID 0)
-- Dependencies: 212
-- Name: company_modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.company_modules_id_seq', 6, true);


--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 214
-- Name: coupons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coupons_id_seq', 1, true);


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 208
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 13, true);


--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 218
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 8, true);


--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 206
-- Name: modules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modules_id_seq', 2, true);


--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 210
-- Name: onboarding_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.onboarding_id_seq', 3, true);


--
-- TOC entry 3126 (class 0 OID 0)
-- Dependencies: 216
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 4, true);


--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 9, true);


--
-- TOC entry 2942 (class 2606 OID 49178)
-- Name: assessments assessments_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pk PRIMARY KEY (id);


--
-- TOC entry 2944 (class 2606 OID 49180)
-- Name: assessments assessments_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_un UNIQUE (department_id, course_id);


--
-- TOC entry 2912 (class 2606 OID 16408)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- TOC entry 2926 (class 2606 OID 40969)
-- Name: company_modules company_modules_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_modules
    ADD CONSTRAINT company_modules_pk PRIMARY KEY (id);


--
-- TOC entry 2928 (class 2606 OID 40982)
-- Name: company_modules company_modules_un; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_modules
    ADD CONSTRAINT company_modules_un UNIQUE (company_id, module_id);


--
-- TOC entry 2930 (class 2606 OID 40994)
-- Name: coupons coupons_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pk PRIMARY KEY (id);


--
-- TOC entry 2932 (class 2606 OID 40996)
-- Name: coupons coupons_uk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_uk UNIQUE (id);


--
-- TOC entry 2934 (class 2606 OID 41024)
-- Name: coupons coupons_uk1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_uk1 UNIQUE (code);


--
-- TOC entry 2918 (class 2606 OID 24599)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 2920 (class 2606 OID 24601)
-- Name: courses courses_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_ukey UNIQUE (id);


--
-- TOC entry 2940 (class 2606 OID 49164)
-- Name: departments departments_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pk PRIMARY KEY (id);


--
-- TOC entry 2914 (class 2606 OID 24603)
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (id);


--
-- TOC entry 2916 (class 2606 OID 24605)
-- Name: modules modules_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_ukey UNIQUE (id);


--
-- TOC entry 2922 (class 2606 OID 32779)
-- Name: onboarding_statuses onboarding_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onboarding_statuses
    ADD CONSTRAINT onboarding_pk PRIMARY KEY (id);


--
-- TOC entry 2924 (class 2606 OID 32781)
-- Name: onboarding_statuses onboarding_uk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onboarding_statuses
    ADD CONSTRAINT onboarding_uk UNIQUE (id, user_id);


--
-- TOC entry 2936 (class 2606 OID 41005)
-- Name: transactions transactions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pk PRIMARY KEY (id);


--
-- TOC entry 2938 (class 2606 OID 41007)
-- Name: transactions transactions_uk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_uk UNIQUE (id);


--
-- TOC entry 2908 (class 2606 OID 16404)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2910 (class 2606 OID 16406)
-- Name: users users_ukey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ukey UNIQUE (id, auth0_id, email);


--
-- TOC entry 2954 (class 2606 OID 49181)
-- Name: assessments assessments_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_fk FOREIGN KEY (department_id) REFERENCES public.departments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2955 (class 2606 OID 49186)
-- Name: assessments assessments_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_fk_1 FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2948 (class 2606 OID 40970)
-- Name: company_modules company_modules_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_modules
    ADD CONSTRAINT company_modules_fk FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2949 (class 2606 OID 40975)
-- Name: company_modules company_modules_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company_modules
    ADD CONSTRAINT company_modules_fk_1 FOREIGN KEY (company_id) REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2946 (class 2606 OID 24606)
-- Name: courses courses_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_fk FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2953 (class 2606 OID 49165)
-- Name: departments departments_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_fk FOREIGN KEY (company_id) REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2947 (class 2606 OID 32782)
-- Name: onboarding_statuses onboarding_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.onboarding_statuses
    ADD CONSTRAINT onboarding_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2950 (class 2606 OID 41008)
-- Name: transactions transactions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk FOREIGN KEY (company_id) REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2951 (class 2606 OID 41013)
-- Name: transactions transactions_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk_1 FOREIGN KEY (module_id) REFERENCES public.modules(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2952 (class 2606 OID 41018)
-- Name: transactions transactions_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_fk_2 FOREIGN KEY (coupon_id) REFERENCES public.coupons(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2945 (class 2606 OID 16409)
-- Name: users users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk FOREIGN KEY (company_id) REFERENCES public.companies(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2020-09-14 04:55:44 EDT

--
-- PostgreSQL database dump complete
--

