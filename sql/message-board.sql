DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first != ''),
    last VARCHAR NOT NULL CHECK (last != ''),
    email VARCHAR NOT NULL UNIQUE CHECK (last != ''),
    password VARCHAR NOT NULL CHECK (last != ''),
    url VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR,
    email VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    message VARCHAR,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forums (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL
);

CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    forum_id INT NOT NULL REFERENCES forums(id),
    title VARCHAR NOT NULL,
    creator_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    thread_id INT NOT NULL REFERENCES threads(id),
    poster_id INT NOT NULL REFERENCES users(id),
    content VARCHAR NOT NULL,
    quoted_posts JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_reactions (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id),
    user_id INT NOT NULL REFERENCES users(id),
    reaction VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
