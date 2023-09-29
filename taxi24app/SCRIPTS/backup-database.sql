
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;


DO $$ 
BEGIN 
IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'public') THEN 
    CREATE SCHEMA public; 
	ALTER SCHEMA public OWNER TO postgres;
	SET default_tablespace = '';
	SET default_table_access_method = heap;
 END IF; 
END $$;


CREATE TABLE public.driver (
    name character varying(255) NOT NULL,
    doc_number character varying(100) NOT NULL,
    phone character varying(25),
    email character varying(255),
    driver_id integer NOT NULL,
    license_number character varying(50),
    phone_enterprise_number character varying(20)
);


ALTER TABLE public.driver OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 71692)
-- Name: driver_assignment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driver_assignment (
    driver_assignment_id integer NOT NULL,
    available boolean NOT NULL,
    start_datetime_assignment timestamp without time zone NOT NULL,
    end_datetime_assignment timestamp without time zone,
    driver_id integer,
    vehicle_unit_id integer
);


ALTER TABLE public.driver_assignment OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 71690)
-- Name: driver_assignment_driver_assignment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.driver_assignment_driver_assignment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.driver_assignment_driver_assignment_id_seq OWNER TO postgres;

--
-- TOC entry 3844 (class 0 OID 0)
-- Dependencies: 214
-- Name: driver_assignment_driver_assignment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.driver_assignment_driver_assignment_id_seq OWNED BY public.driver_assignment.driver_assignment_id;


--
-- TOC entry 208 (class 1259 OID 71660)
-- Name: driver_driver_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.driver_driver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.driver_driver_id_seq OWNER TO postgres;

--
-- TOC entry 3845 (class 0 OID 0)
-- Dependencies: 208
-- Name: driver_driver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.driver_driver_id_seq OWNED BY public.driver.driver_id;


--
-- TOC entry 223 (class 1259 OID 71766)
-- Name: history_driver_location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.history_driver_location (
    history_driver_location_id integer NOT NULL,
    coordenate public.geometry(Point,4326) NOT NULL,
    location_datetime timestamp without time zone,
    driver_assignment_id integer
);


ALTER TABLE public.history_driver_location OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 71764)
-- Name: history_driver_location_history_driver_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.history_driver_location_history_driver_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.history_driver_location_history_driver_location_id_seq OWNER TO postgres;

--
-- TOC entry 3846 (class 0 OID 0)
-- Dependencies: 222
-- Name: history_driver_location_history_driver_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.history_driver_location_history_driver_location_id_seq OWNED BY public.history_driver_location.history_driver_location_id;


--
-- TOC entry 219 (class 1259 OID 71708)
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    location_id integer NOT NULL,
    coordenate public.geometry(Point,4326) NOT NULL,
    country_name character varying(100) NOT NULL,
    city_name character varying(100) NOT NULL,
    part_trip character varying(100) NOT NULL,
    trip_id integer
);


ALTER TABLE public.location OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 71706)
-- Name: location_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.location_location_id_seq OWNER TO postgres;

--
-- TOC entry 3847 (class 0 OID 0)
-- Dependencies: 218
-- Name: location_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_location_id_seq OWNED BY public.location.location_id;


--
-- TOC entry 211 (class 1259 OID 71673)
-- Name: passenger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passenger (
    name character varying(255) NOT NULL,
    doc_number character varying(100) NOT NULL,
    phone character varying(25),
    email character varying(255),
    passenger_id integer NOT NULL
);


ALTER TABLE public.passenger OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 71671)
-- Name: passenger_passenger_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.passenger_passenger_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.passenger_passenger_id_seq OWNER TO postgres;

--
-- TOC entry 3848 (class 0 OID 0)
-- Dependencies: 210
-- Name: passenger_passenger_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.passenger_passenger_id_seq OWNED BY public.passenger.passenger_id;


--
-- TOC entry 221 (class 1259 OID 71719)
-- Name: pilot_trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pilot_trip (
    pilot_trip_id integer NOT NULL,
    distance numeric(10,2) NOT NULL,
    offer numeric(10,2) NOT NULL,
    cost numeric(10,2) NOT NULL,
    arrive_time timestamp without time zone NOT NULL,
    trip_id integer
);


ALTER TABLE public.pilot_trip OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 71717)
-- Name: pilot_trip_pilot_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pilot_trip_pilot_trip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pilot_trip_pilot_trip_id_seq OWNER TO postgres;

--
-- TOC entry 3849 (class 0 OID 0)
-- Dependencies: 220
-- Name: pilot_trip_pilot_trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pilot_trip_pilot_trip_id_seq OWNED BY public.pilot_trip.pilot_trip_id;


--
-- TOC entry 217 (class 1259 OID 71700)
-- Name: trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip (
    trip_id integer NOT NULL,
    state character varying(100) NOT NULL,
    start_datetime_trip timestamp without time zone,
    end_datetime_trip timestamp without time zone,
    driver_assignment_id integer,
    passenger_id integer
);


ALTER TABLE public.trip OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 71698)
-- Name: trip_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_trip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trip_trip_id_seq OWNER TO postgres;

--
-- TOC entry 3850 (class 0 OID 0)
-- Dependencies: 216
-- Name: trip_trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_trip_id_seq OWNED BY public.trip.trip_id;


--
-- TOC entry 213 (class 1259 OID 71684)
-- Name: vehicle_unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_unit (
    vehicle_unit_id integer NOT NULL,
    license_plate character varying(100) NOT NULL,
    color character varying(25),
    type character varying(100),
    car_brand character varying(100),
    model character varying(100)
);


ALTER TABLE public.vehicle_unit OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 71682)
-- Name: vehicle_unit_vehicle_unit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vehicle_unit_vehicle_unit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicle_unit_vehicle_unit_id_seq OWNER TO postgres;

--
-- TOC entry 3851 (class 0 OID 0)
-- Dependencies: 212
-- Name: vehicle_unit_vehicle_unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vehicle_unit_vehicle_unit_id_seq OWNED BY public.vehicle_unit.vehicle_unit_id;


--
-- TOC entry 3659 (class 2604 OID 71665)
-- Name: driver driver_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver ALTER COLUMN driver_id SET DEFAULT nextval('public.driver_driver_id_seq'::regclass);


--
-- TOC entry 3662 (class 2604 OID 71695)
-- Name: driver_assignment driver_assignment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_assignment ALTER COLUMN driver_assignment_id SET DEFAULT nextval('public.driver_assignment_driver_assignment_id_seq'::regclass);


--
-- TOC entry 3666 (class 2604 OID 71769)
-- Name: history_driver_location history_driver_location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_driver_location ALTER COLUMN history_driver_location_id SET DEFAULT nextval('public.history_driver_location_history_driver_location_id_seq'::regclass);


--
-- TOC entry 3664 (class 2604 OID 71711)
-- Name: location location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN location_id SET DEFAULT nextval('public.location_location_id_seq'::regclass);


--
-- TOC entry 3660 (class 2604 OID 71676)
-- Name: passenger passenger_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger ALTER COLUMN passenger_id SET DEFAULT nextval('public.passenger_passenger_id_seq'::regclass);


--
-- TOC entry 3665 (class 2604 OID 71722)
-- Name: pilot_trip pilot_trip_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pilot_trip ALTER COLUMN pilot_trip_id SET DEFAULT nextval('public.pilot_trip_pilot_trip_id_seq'::regclass);


--
-- TOC entry 3663 (class 2604 OID 71703)
-- Name: trip trip_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip ALTER COLUMN trip_id SET DEFAULT nextval('public.trip_trip_id_seq'::regclass);


--
-- TOC entry 3661 (class 2604 OID 71687)
-- Name: vehicle_unit vehicle_unit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_unit ALTER COLUMN vehicle_unit_id SET DEFAULT nextval('public.vehicle_unit_vehicle_unit_id_seq'::regclass);


--
-- TOC entry 3824 (class 0 OID 71662)
-- Dependencies: 209
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.driver VALUES ('Dennis', '70985297', '983233483', 'dannuzp@gmail.com', 2, '123123', '983233483');
INSERT INTO public.driver VALUES ('Ken', '70985297', '663233483', 'Ken@gmail.com', 3, '123123', '663233483');
INSERT INTO public.driver VALUES ('Jorge', '70585297', '983233483', 'Jorge@gmail.com', 4, '123123', '66633483');
INSERT INTO public.driver VALUES ('Han', '75985297', '973233483', 'Han@gmail.com', 5, '123123', '555533483');
INSERT INTO public.driver VALUES ('Samu', '70585297', '983233483', 'Samu@gmail.com', 6, '123123', '66633483');
INSERT INTO public.driver VALUES ('Nestor', '70585297', '983233483', 'Nestor@gmail.com', 7, '123123', '66633483');


--
-- TOC entry 3830 (class 0 OID 71692)
-- Dependencies: 215
-- Data for Name: driver_assignment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.driver_assignment VALUES (5, true, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 2, 2);
INSERT INTO public.driver_assignment VALUES (6, true, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 3, 3);
INSERT INTO public.driver_assignment VALUES (7, true, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 4, 2);
INSERT INTO public.driver_assignment VALUES (8, true, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 5, 2);
INSERT INTO public.driver_assignment VALUES (9, true, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 6, 4);
INSERT INTO public.driver_assignment VALUES (10, true, '2023-09-01 00:00:00', '2023-09-01 00:00:00', 7, 5);


--
-- TOC entry 3838 (class 0 OID 71766)
-- Dependencies: 223
-- Data for Name: history_driver_location; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.history_driver_location VALUES (1, '0101000020E6100000D26F5F07CE4153C0D95F764F1E1628C0', '2023-09-29 00:06:00', 5);
INSERT INTO public.history_driver_location VALUES (2, '0101000020E6100000FC1873D7121A5D4088855AD3BCF34340', '2023-09-29 00:06:00', 6);
INSERT INTO public.history_driver_location VALUES (3, '0101000020E6100000CC7F48BF7DA951C05396218E75B940C0', '2023-09-29 00:06:00', 7);
INSERT INTO public.history_driver_location VALUES (4, '0101000020E61000003BDF4F8D97BE5F408D976E1283C84240', '2023-09-29 00:06:00', 8);
INSERT INTO public.history_driver_location VALUES (6, '0101000020E6100000F60A0BEE07FB53C080B6D5AC335E01C0', '2023-09-29 00:06:00', 9);
INSERT INTO public.history_driver_location VALUES (7, '0101000020E6100000CAC342AD698A51C0CEAACFD556BC3240', '2023-09-29 00:06:00', 10);


--
-- TOC entry 3834 (class 0 OID 71708)
-- Dependencies: 219
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3826 (class 0 OID 71673)
-- Dependencies: 211
-- Data for Name: passenger; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.passenger VALUES ('Luis', '70985297', '990615915', 'cirilo@gmail.com', 2);


--
-- TOC entry 3836 (class 0 OID 71719)
-- Dependencies: 221
-- Data for Name: pilot_trip; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3657 (class 0 OID 70901)
-- Dependencies: 204
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3832 (class 0 OID 71700)
-- Dependencies: 217
-- Data for Name: trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.trip VALUES (7, 'COMPLETE', '2023-09-24 10:30:00', '2023-09-24 10:30:00', 5, 2);
INSERT INTO public.trip VALUES (8, 'PENDING', '2023-09-28 01:34:39.524', NULL, 5, 2);


--
-- TOC entry 3828 (class 0 OID 71684)
-- Dependencies: 213
-- Data for Name: vehicle_unit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vehicle_unit VALUES (2, 'BKF-528', 'azul', 'hatchback', 'Mazda', '3');
INSERT INTO public.vehicle_unit VALUES (3, '653-58', 'azul', 'sedan', 'Halion', '1');
INSERT INTO public.vehicle_unit VALUES (4, 'BKF-521', 'azul', 'hatchback', 'Mazda', '2');
INSERT INTO public.vehicle_unit VALUES (5, 'BKF-521', 'rod', 'hatchback', 'Mazda', '5');


--
-- TOC entry 3852 (class 0 OID 0)
-- Dependencies: 214
-- Name: driver_assignment_driver_assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.driver_assignment_driver_assignment_id_seq', 10, true);


--
-- TOC entry 3853 (class 0 OID 0)
-- Dependencies: 208
-- Name: driver_driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.driver_driver_id_seq', 7, true);


--
-- TOC entry 3854 (class 0 OID 0)
-- Dependencies: 222
-- Name: history_driver_location_history_driver_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_driver_location_history_driver_location_id_seq', 7, true);


--
-- TOC entry 3855 (class 0 OID 0)
-- Dependencies: 218
-- Name: location_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_location_id_seq', 1, false);


--
-- TOC entry 3856 (class 0 OID 0)
-- Dependencies: 210
-- Name: passenger_passenger_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.passenger_passenger_id_seq', 2, true);


--
-- TOC entry 3857 (class 0 OID 0)
-- Dependencies: 220
-- Name: pilot_trip_pilot_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pilot_trip_pilot_trip_id_seq', 1, false);


--
-- TOC entry 3858 (class 0 OID 0)
-- Dependencies: 216
-- Name: trip_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_trip_id_seq', 8, true);


--
-- TOC entry 3859 (class 0 OID 0)
-- Dependencies: 212
-- Name: vehicle_unit_vehicle_unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicle_unit_vehicle_unit_id_seq', 5, true);


--
-- TOC entry 3672 (class 2606 OID 71681)
-- Name: passenger PK_1b85a8b84e680318fa889d4338e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passenger
    ADD CONSTRAINT "PK_1b85a8b84e680318fa889d4338e" PRIMARY KEY (passenger_id);


--
-- TOC entry 3676 (class 2606 OID 71697)
-- Name: driver_assignment PK_2410293b7a2bd328346288cf5c3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_assignment
    ADD CONSTRAINT "PK_2410293b7a2bd328346288cf5c3" PRIMARY KEY (driver_assignment_id);


--
-- TOC entry 3682 (class 2606 OID 71724)
-- Name: pilot_trip PK_451e84726005d4d2aa90cf9aa39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pilot_trip
    ADD CONSTRAINT "PK_451e84726005d4d2aa90cf9aa39" PRIMARY KEY (pilot_trip_id);


--
-- TOC entry 3684 (class 2606 OID 71774)
-- Name: history_driver_location PK_7da825679347e42a56211f4a5d5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_driver_location
    ADD CONSTRAINT "PK_7da825679347e42a56211f4a5d5" PRIMARY KEY (history_driver_location_id);


--
-- TOC entry 3680 (class 2606 OID 71716)
-- Name: location PK_b6e6c23b493859e5875de66c18d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT "PK_b6e6c23b493859e5875de66c18d" PRIMARY KEY (location_id);


--
-- TOC entry 3678 (class 2606 OID 71705)
-- Name: trip PK_b8e163f56d1c292115e2fe9aa18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "PK_b8e163f56d1c292115e2fe9aa18" PRIMARY KEY (trip_id);


--
-- TOC entry 3670 (class 2606 OID 71670)
-- Name: driver PK_f27607c5716c6afcef0eb6aa1b0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT "PK_f27607c5716c6afcef0eb6aa1b0" PRIMARY KEY (driver_id);


--
-- TOC entry 3674 (class 2606 OID 71689)
-- Name: vehicle_unit PK_f8764d4db3e96e06ac9b6cbb391; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_unit
    ADD CONSTRAINT "PK_f8764d4db3e96e06ac9b6cbb391" PRIMARY KEY (vehicle_unit_id);


--
-- TOC entry 3688 (class 2606 OID 71740)
-- Name: trip FK_3d9a53e115529549f9e8d974b52; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "FK_3d9a53e115529549f9e8d974b52" FOREIGN KEY (passenger_id) REFERENCES public.passenger(passenger_id);


--
-- TOC entry 3689 (class 2606 OID 71745)
-- Name: location FK_9028d5297c25ec8b3efbfbba192; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT "FK_9028d5297c25ec8b3efbfbba192" FOREIGN KEY (trip_id) REFERENCES public.trip(trip_id);


--
-- TOC entry 3685 (class 2606 OID 71725)
-- Name: driver_assignment FK_a4b89a9571139408b699331e977; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_assignment
    ADD CONSTRAINT "FK_a4b89a9571139408b699331e977" FOREIGN KEY (driver_id) REFERENCES public.driver(driver_id);


--
-- TOC entry 3686 (class 2606 OID 71730)
-- Name: driver_assignment FK_cbca4c2010ed60bac6d0109ac61; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_assignment
    ADD CONSTRAINT "FK_cbca4c2010ed60bac6d0109ac61" FOREIGN KEY (vehicle_unit_id) REFERENCES public.vehicle_unit(vehicle_unit_id);


--
-- TOC entry 3690 (class 2606 OID 71750)
-- Name: pilot_trip FK_f298dddb9dd9692e03e57458f8a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pilot_trip
    ADD CONSTRAINT "FK_f298dddb9dd9692e03e57458f8a" FOREIGN KEY (trip_id) REFERENCES public.trip(trip_id);


--
-- TOC entry 3691 (class 2606 OID 71775)
-- Name: history_driver_location FK_f5267a7b289c07add9a112bc46f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history_driver_location
    ADD CONSTRAINT "FK_f5267a7b289c07add9a112bc46f" FOREIGN KEY (driver_assignment_id) REFERENCES public.driver_assignment(driver_assignment_id);


--
-- TOC entry 3687 (class 2606 OID 71735)
-- Name: trip FK_fc867bd3d3e7e45654c74f4465a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT "FK_fc867bd3d3e7e45654c74f4465a" FOREIGN KEY (driver_assignment_id) REFERENCES public.driver_assignment(driver_assignment_id);


-- Completed on 2023-09-29 10:11:39

--
-- PostgreSQL database dump complete
--

