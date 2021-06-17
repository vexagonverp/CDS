create table roles
(
    id   bigserial not null
        constraint roles_pkey
            primary key,
    name varchar(60)
        constraint uk_nb4h0p6txrmfc0xbrd1kglp9t
            unique
);
alter table roles
    owner to postgres;
create table users
(
    id         bigserial not null
        constraint users_pkey
            primary key,
    created_at timestamp not null,
    updated_at timestamp not null,
    email      varchar(40)
        constraint uk6dotkott2kjsp8vw4d0m25fb7
            unique,
    name       varchar(40),
    password   varchar(100)
);
alter table users
    owner to postgres;
create table users_roles
(
    user_id bigint not null
        constraint fk2o0jvgh89lemvvo17cbqvdxaa
            references users,
    role_id bigint not null
        constraint fkj6m8fwv7oqv74fcehir1a9ffy
            references roles,
    constraint users_roles_pkey
        primary key (user_id, role_id)
);
alter table users_roles
    owner to postgres;
create table employeesdetails
(
    id                bigserial not null
        constraint employeesdetails_pkey
            primary key,
    address           varchar(255),
    bank_account      bigint,
    bank_name         varchar(255),
    birth_day         timestamp,
    cell_phone        bigint,
    contracted_date   timestamp,
    degree            varchar(255),
    department        varchar(255),
    employeeid        integer   not null,
    full_name         varchar(40),
    gender            varchar(10),
    id_number         bigint,
    image_path        varchar(255),
    insurance_book_no bigint,
    issue_date        timestamp,
    job_title         varchar(255),
    major             varchar(255),
    manager           bigint,
    married_status    varchar(255),
    place_of_birth    varchar(255),
    race              varchar(20),
    religion          varchar(20),
    start_date        timestamp,
    taxid             bigint,
    image             varchar(255)
);
alter table employeesdetails
    owner to postgres;
create table image_table
(
    id       bigserial not null
        constraint image_table_pkey
            primary key,
    name     varchar(255),
    pic_byte bytea,
    type     varchar(255)
);
alter table image_table
    owner to postgres;
