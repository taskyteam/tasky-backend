CREATE TABLE household (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(15) NOT NULL,
    description TEXT,
    assigned_to INTEGER REFERENCES users(id),
    status VARCHAR(255) NOT NULL,
    points INTEGER,
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    admin BOOLEAN NOT NULL,
    email VARCHAR(50) NOT NULL,
    /* household_id INTEGER REFERENCES household(id), */
);




