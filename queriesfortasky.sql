



CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    admin BOOLEAN NOT NULL,
    email VARCHAR(50) NOT NULL,
    /* household_id INTEGER REFERENCES household(id), */
);

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


INSERT INTO household (user_id, name) VALUES (1, 'Household for Berit');
INSERT INTO household (user_id, name) VALUES (4, 'Household for Johanne');



INSERT INTO users (username, password, admin, email) VALUES ('Berit', '12345', true, 'berit@admin.com');
INSERT INTO users (username, password, admin, email) VALUES ('Johannes', '1234', false, 'johannes@child.com');
INSERT INTO users (username, password, admin, email) VALUES ('Andreas', '123', false, 'andreas@child.com');
INSERT INTO users (username, password, admin, email) VALUES ('Johanne', '4321', true, 'johanne@admin.com');
INSERT INTO users (username, password, admin, email) VALUES ('Rihanna', '2222', false, 'rihanna@child.com');


DROP TABLE users;
DROP TABLE household;
DROP TABLE tasks;

