-- =============================================================
-- DezignCamp LMS — PostgreSQL Full Database Schema
-- =============================================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- full-text search

-- =============================================================
-- USERS & ROLES
-- =============================================================

CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending', 'deleted');

CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    TEXT NOT NULL, -- bcrypt hashed
    role        user_role NOT NULL DEFAULT 'student',
    status      user_status NOT NULL DEFAULT 'active',
    avatar_url  TEXT,
    bio         TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    last_login  TIMESTAMPTZ,
    email_verified_at TIMESTAMPTZ
);

CREATE TABLE student_profiles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id      VARCHAR(50) UNIQUE,
    department      VARCHAR(255),
    semester        SMALLINT,
    enrollment_date DATE,
    cgpa            DECIMAL(4,2),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE instructor_profiles (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(100), -- Dr., Prof., etc.
    specialization  TEXT[],
    rating          DECIMAL(3,2) DEFAULT 0,
    total_students  INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE personal_access_tokens (
    id          BIGSERIAL PRIMARY KEY,
    tokenable_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    token       VARCHAR(64) UNIQUE NOT NULL,
    abilities   TEXT,
    expires_at  TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- COURSES & CURRICULUM
-- =============================================================

CREATE TYPE course_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE lecture_type AS ENUM ('youtube', 'upload', 'live');

CREATE TABLE categories (
    id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name    VARCHAR(100) NOT NULL,
    slug    VARCHAR(100) UNIQUE NOT NULL,
    icon    VARCHAR(50)
);

CREATE TABLE courses (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    description     TEXT,
    thumbnail_url   TEXT,
    instructor_id   UUID NOT NULL REFERENCES users(id),
    category_id     UUID REFERENCES categories(id),
    status          course_status DEFAULT 'draft',
    tags            TEXT[],
    language        VARCHAR(50) DEFAULT 'English',
    total_duration  INTEGER DEFAULT 0, -- seconds
    is_free         BOOLEAN DEFAULT false,
    price           DECIMAL(10,2),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    published_at    TIMESTAMPTZ,
    CONSTRAINT fts_course_search UNIQUE (slug)
);

CREATE TABLE modules (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    order_num   SMALLINT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lectures (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id       UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    type            lecture_type DEFAULT 'youtube',
    youtube_url     TEXT,
    youtube_id      VARCHAR(50),
    upload_url      TEXT,
    duration        INTEGER DEFAULT 0, -- seconds
    order_num       SMALLINT NOT NULL,
    is_preview      BOOLEAN DEFAULT false,
    resources       JSONB, -- [{name, url, type}]
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- ENROLLMENTS & PROGRESS
-- =============================================================

CREATE TABLE enrollments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at     TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    progress        DECIMAL(5,2) DEFAULT 0, -- percentage 0-100
    last_accessed_at TIMESTAMPTZ,
    UNIQUE(student_id, course_id)
);

CREATE TABLE lecture_progress (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lecture_id      UUID NOT NULL REFERENCES lectures(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    watched_seconds INTEGER DEFAULT 0,
    is_completed    BOOLEAN DEFAULT false,
    last_position   INTEGER DEFAULT 0, -- resume timestamp
    completed_at    TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, lecture_id)
);

-- =============================================================
-- NOTES
-- =============================================================

CREATE TABLE notes (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lecture_id  UUID NOT NULL REFERENCES lectures(id) ON DELETE CASCADE,
    course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    timestamp   INTEGER DEFAULT 0, -- video timestamp in seconds
    tags        TEXT[],
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- ASSESSMENTS
-- =============================================================

CREATE TYPE assessment_type AS ENUM ('assignment', 'quiz', 'gdb', 'exam');
CREATE TYPE submission_status AS ENUM ('pending', 'submitted', 'graded', 'overdue');

CREATE TABLE assessments (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    type            assessment_type NOT NULL,
    total_marks     INTEGER NOT NULL DEFAULT 100,
    passing_marks   INTEGER DEFAULT 50,
    due_date        TIMESTAMPTZ,
    start_date      TIMESTAMPTZ,
    duration        INTEGER, -- minutes (for timed exams)
    is_timed        BOOLEAN DEFAULT false,
    randomize_questions BOOLEAN DEFAULT false,
    allow_late_submit   BOOLEAN DEFAULT false,
    anti_cheat      BOOLEAN DEFAULT false,
    instructions    TEXT,
    created_by      UUID NOT NULL REFERENCES users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE questions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id   UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_text   TEXT NOT NULL,
    question_type   VARCHAR(50) NOT NULL, -- mcq, short, long, file
    options         JSONB, -- for MCQ: [{text, is_correct}]
    correct_answer  TEXT,
    marks           INTEGER DEFAULT 1,
    order_num       SMALLINT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE submissions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id   UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status          submission_status DEFAULT 'pending',
    file_url        TEXT,
    content         TEXT, -- for text submissions
    answers         JSONB, -- for quiz answers [{question_id, answer}]
    score           DECIMAL(5,2),
    feedback        TEXT,
    submitted_at    TIMESTAMPTZ,
    graded_at       TIMESTAMPTZ,
    graded_by       UUID REFERENCES users(id),
    anti_cheat_log  JSONB, -- activity logs during exam
    UNIQUE(assessment_id, student_id)
);

-- =============================================================
-- GRADES
-- =============================================================

CREATE TABLE grade_records (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester        VARCHAR(50),
    assignments_avg DECIMAL(5,2) DEFAULT 0,
    quizzes_avg     DECIMAL(5,2) DEFAULT 0,
    exams_avg       DECIMAL(5,2) DEFAULT 0,
    gdb_avg         DECIMAL(5,2) DEFAULT 0,
    total           DECIMAL(5,2) DEFAULT 0,
    letter_grade    VARCHAR(3),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester)
);

-- =============================================================
-- CERTIFICATES
-- =============================================================

CREATE TABLE certificates (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id           UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    issued_at           TIMESTAMPTZ DEFAULT NOW(),
    file_url            TEXT,
    verification_code   VARCHAR(50) UNIQUE NOT NULL,
    UNIQUE(student_id, course_id)
);

-- =============================================================
-- CALENDAR & TODO
-- =============================================================

CREATE TYPE event_type AS ENUM ('lecture', 'assignment', 'exam', 'reminder', 'event');

CREATE TABLE calendar_events (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    start_date  TIMESTAMPTZ NOT NULL,
    end_date    TIMESTAMPTZ NOT NULL,
    type        event_type NOT NULL,
    course_id   UUID REFERENCES courses(id),
    color       VARCHAR(7),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE todo_priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE todos (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    due_date    TIMESTAMPTZ,
    priority    todo_priority DEFAULT 'medium',
    completed   BOOLEAN DEFAULT false,
    course_id   UUID REFERENCES courses(id),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- NOTIFICATIONS
-- =============================================================

CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error');

CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    type        notification_type DEFAULT 'info',
    is_read     BOOLEAN DEFAULT false,
    link        TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- AI STUDY PLANS
-- =============================================================

CREATE TABLE study_plans (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    weekly_goal_hours INTEGER DEFAULT 20,
    schedule        JSONB NOT NULL, -- daily sessions
    recommendations JSONB, -- AI tips
    generated_at    TIMESTAMPTZ DEFAULT NOW(),
    is_active       BOOLEAN DEFAULT true
);

CREATE TABLE activity_logs (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action      VARCHAR(100) NOT NULL,
    resource    VARCHAR(100),
    resource_id UUID,
    metadata    JSONB,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- INDEXES
-- =============================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Courses
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_tags ON courses USING GIN(tags);

-- Lectures
CREATE INDEX idx_lectures_course ON lectures(course_id);
CREATE INDEX idx_lectures_module ON lectures(module_id);

-- Progress
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_lecture_progress_student ON lecture_progress(student_id);
CREATE INDEX idx_lecture_progress_lecture ON lecture_progress(lecture_id);

-- Notes
CREATE INDEX idx_notes_student ON notes(student_id);
CREATE INDEX idx_notes_lecture ON notes(lecture_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- Activity
CREATE INDEX idx_activity_user ON activity_logs(user_id, created_at DESC);

-- =============================================================
-- TRIGGERS — auto-update updated_at
-- =============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_courses_updated BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_lectures_updated BEFORE UPDATE ON lectures FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_notes_updated BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_todos_updated BEFORE UPDATE ON todos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
