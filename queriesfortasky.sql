DROP TABLE IF EXISTS households CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS goals CASCADE;

CREATE TABLE households (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    housekey text
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    admin BOOLEAN default NULL,
    email VARCHAR(50) NOT NULL,
    household_id INTEGER REFERENCES households(id) DEFAULT NULL    
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to INTEGER REFERENCES users(id),
    status VARCHAR(255) NOT NULL,
    points INTEGER,
    household_id INTEGER REFERENCES households(id),
    username VARCHAR(50) NOT NULL
); 

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    assigned_to INTEGER REFERENCES users(id),
    status VARCHAR(255) default 'open',
    points INTEGER,
    household_id INTEGER REFERENCES households(id)
); 




INSERT INTO households (name) VALUES ('Kråkereiret');
INSERT INTO households (name) VALUES ('Beverveien 10');

INSERT INTO users (username, password, household_id, admin, email) VALUES ('per73', '1234', 1, true, 'per@gmail.com');
INSERT INTO users (username, password, household_id, admin, email) VALUES ('ida', '2222', 1, false, 'ida@gmail.com');
INSERT INTO users (username, password, household_id, admin, email) VALUES ('geir12', '1111', NULL, false, 'geir@gmail.com');
INSERT INTO users (username, password, household_id, admin, email) VALUES ('pernille', '6767', 2, true, 'pernille@gmail.com');
INSERT INTO users (username, password, household_id, admin, email) VALUES ('nils', '0000', 2, false, 'nils@gmail.com');
INSERT INTO users (username, password, household_id, admin, email) VALUES ('lise', '4321', NULL, false, 'lise@gmail.com');

INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('vaske postkassen', '', 2, 100, 'open', 1);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('vaske hus', '', 2, 50, 'open', 1);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('vaske rygg', '', 2, 100, 'open', 1);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('tømme oppvaskmaskinen', '', 3, 20, 'open', 1);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('rydde rommet', '', 5, 50, 'open', 2);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('mate fiskene', '', 6, 10, 'open', 3);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('mate hestene', ':)', 6, 10, 'completed', 2);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('vaske toalettet', 'huske børste', 2, 100, 'completed', 1);
INSERT INTO tasks (title, description, assigned_to, points, status, household_id) VALUES ('vaske tennene', 'huske børste', 2, 100, 'completed', 1);










