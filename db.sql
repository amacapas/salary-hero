-- Table: public.companies
-- DROP TABLE IF EXISTS public.companies;

CREATE TABLE IF NOT EXISTS public.companies
(
    id integer NOT NULL DEFAULT nextval('companies_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    about character varying(255) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    created timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT companies_pkey PRIMARY KEY (id)
)


-- Table: public.employees
-- DROP TABLE IF EXISTS public.employees;

CREATE TABLE IF NOT EXISTS public.employees
(
    id integer NOT NULL DEFAULT nextval('employees_id_seq'::regclass),
    companyid integer NOT NULL,
    firstname character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    jobtitle character varying(255) COLLATE pg_catalog."default",
    salary double precision NOT NULL,
    addedby integer NOT NULL,
    created timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
)


-- Table: public.admins
-- DROP TABLE IF EXISTS public.admins;

CREATE TABLE IF NOT EXISTS public.admins
(
    id integer NOT NULL DEFAULT nextval('admins_id_seq'::regclass),
    companyid integer NOT NULL,
    firstname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    emailadd character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT admins_pkey PRIMARY KEY (id),
    CONSTRAINT fk_company FOREIGN KEY (companyid)
        REFERENCES public.companies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


-- Table: public.transactions
-- DROP TABLE IF EXISTS public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions
(
    id integer NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    employeeid integer NOT NULL,
    amount double precision NOT NULL,
    account integer NOT NULL,
    bankname character varying(255) COLLATE pg_catalog."default" NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_pkey PRIMARY KEY (id)
)