DROP DATABASE IF EXISTS festival;
CREATE DATABASE IF NOT EXISTS festival;

USE festival;

CREATE TABLE IF NOT EXISTS participants(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    admin BOOLEAN DEFAULT(FALSE)
);

CREATE TABLE IF NOT EXISTS activities(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    description TEXT,
    image TEXT,
    position VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,

    CHECK(capacity > 0)
);

CREATE TABLE IF NOT EXISTS inscriptions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_activity INT NOT NULL,
    id_participant INT NOT NULL,

    UNIQUE(id_activity, id_participant),

    FOREIGN KEY (id_activity) REFERENCES activities(id) ON DELETE CASCADE,
    FOREIGN KEY (id_participant) REFERENCES participants(id) ON DELETE CASCADE
);

INSERT INTO participants(
    name,
    email,
    password,
    admin
) VALUES
(
    "Karine Alves Moreira",
    "kaka@gmail.com",
    "123",
    0
),
(
    "Lívia Lage Ferreira",
    "livinha@gmail.com",
    "123",
    0
),
(
    "Maria Laura Rodrigues",
    "malaura@gmail.com",
    "123",
    0
),
(
    "Jonathan William Bonifácio",
    "jonathan@gmail.com",
    "123",
    0
),
(
    "Jhennyfer Kamilli Moura",
    "jhenny@gmail.com",
    "123",
    1
);

INSERT INTO activities(
    name,
    description,
    image,
    position,
    capacity,
    date,
    time
) VALUES
(
    "Oficina de Cerâmica Artesanal",
    "",
    "http://localhost:5500/frontend/img/activities/ceramica.webp",
    "Estande 2",
    24,
    "2026-11-12",
    "12:30:00"
),
(
    "Empreendedorismo Para Mulheres",
    "",
    "http://localhost:5500/frontend/img/activities/conversa.webp",
    "Estande 4",
    2,
    "2026-11-12",
    "15:00:00"
),
(
    "Confecção de Bonecas de Pano",
    "",
    "http://localhost:5500/frontend/img/activities/boneca-pano.webp",
    "Estande 1",
    12,
    "2026-11-12",
    "17:30:00"
);


INSERT INTO inscriptions(
    id_activity,
    id_participant
) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(3,1),
(3,2),
(3,3),
(3,4);