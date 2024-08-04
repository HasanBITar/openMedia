CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "user" (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_photo TEXT,
    is_admin BOOLEAN DEFAULT FALSE
);


CREATE TABLE "file" (
    file_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    location VARCHAR(1000) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('image', 'video', 'audio', 'document')),
    size INT NOT NULL,
    thumbnail VARCHAR(1000),
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE video (
    file_id UUID PRIMARY KEY REFERENCES file(file_id) ON DELETE CASCADE,
    length INT NOT NULL,
    width INT,
    height INT,
    bit_rate INT
);

CREATE TABLE image (
    file_id UUID PRIMARY KEY REFERENCES file(file_id) ON DELETE CASCADE,
    width INT,
    height INT,
    bit_depth INT
);


CREATE TABLE audio (
    file_id UUID PRIMARY KEY REFERENCES file(file_id) ON DELETE CASCADE,
    length INT NOT NULL,
    bit_rate INT,
    artist TEXT,
    album TEXT
);

CREATE TABLE document (
    file_id UUID PRIMARY KEY REFERENCES file(file_id) ON DELETE CASCADE,
    pages INT
);


CREATE TABLE collection (
    collection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_name VARCHAR(1000) NOT NULL,
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE collection_file (
    collection_id UUID REFERENCES collection(collection_id) ON DELETE CASCADE,
    file_id UUID REFERENCES file(file_id) ON DELETE CASCADE,
    position INT,
    PRIMARY KEY (collection_id, file_id)
);


CREATE TABLE "view" (
    view_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    file_id UUID REFERENCES file(file_id) ON DELETE CASCADE,
    access_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paused_at int
);

CREATE TABLE comment (
    comment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES file(file_id) ON DELETE CASCADE,
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE rate (
    rate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID REFERENCES file(file_id) ON DELETE CASCADE,
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    rate INT CHECK (rate >= 1 AND rate <= 5),
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE "group" (
    group_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_name VARCHAR(100) NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES "user"(user_id) ON DELETE CASCADE
);

CREATE TABLE user_group (
    user_group_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    group_id UUID REFERENCES "group"(group_id) ON DELETE CASCADE,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tag (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    name Text,
    color VARCHAR(6),
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE file_tag (
    file_id UUID REFERENCES file(file_id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tag(tag_id) ON DELETE CASCADE,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (file_id, tag_id)
);