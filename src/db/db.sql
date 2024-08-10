-- creating owner table
create table Owners(
    id serial primary key,
    fullName varchar(255)not null,
    username varchar(255) not null unique,
    email varchar(255) not null unique check (email ~* '^[A-Za-z0-9_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone_no char(10) check (phone_no ~ '^[0-9]{10}$') not null unique,
    password text not null,
    createdAt timestamp default current_timestamp,
    refreshToken text
);


-- creating user table
create table Users(
    id serial primary key,
    fullName varchar(255)not null,
    username varchar(255) not null unique,
    email varchar(255) not null unique check (email ~* '^[A-Za-z0-9_%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone_no char(10) check (phone_no ~ '^[0-9]{10}$') not null unique,
    password text not null,
    createdAt timestamp default current_timestamp,
    refreshToken text
);

-- creating Turf table
create table Turfs(
    id serial primary key,
	name text not null,
    location text not null,
    price decimal(6,2) not null,
    owner_id int,
    foreign key (owner_id) references Owners(id) on delete cascade,
	isAvailable boolean default true,
    images_urls text[],
    createdAt timestamp default current_timestamp
);

-- creating table reviews
create table Reviews (
    id serial primary key,
    user_id int,
    turf_id int,
    rating int check (rating >= 1 and rating <= 5) not null,
    comment text,
    createdAt timestamp default current_timestamp,
    foreign key (user_id) references Users(id),
    foreign key (turf_id) references Turfs(id)
);
-- creating bookings table
CREATE TABLE IF NOT EXISTS Bookings
(
    id serial primary key,
    turf_id integer,
    user_id integer,
    booking_date date NOT NULL,
    timeslot varchar(5) check (timeslot::text ~ '^(1-2|2-3|3-4|4-5|5-6|6-7|7-8|8-9|9-10|10-11|11-12|12-13|13-14|14-15|15-16|16-17|17-18|18-19|19-20|20-21|21-22|22-23|23-24)$'),
    foreign key (turf_id) references Turfs(id) on delete cascade,
    foreign key (user_id) references Users(id) on delete cascade
)