
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for better data integrity
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'academic_staff', 'admin');
CREATE TYPE assignment_status AS ENUM ('pending', 'submitted', 'graded', 'late');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('online', 'bank_deposit');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    student_id TEXT UNIQUE,
    employee_id TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Departments table
CREATE TABLE departments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    head_of_department UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Courses table
CREATE TABLE courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 3,
    semester INTEGER NOT NULL,
    academic_year TEXT NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES profiles(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Student enrollments
CREATE TABLE enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(student_id, course_id)
);

-- Class schedules
CREATE TABLE schedules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room TEXT,
    building TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Assignments table
CREATE TABLE assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_points INTEGER NOT NULL DEFAULT 100,
    assignment_file_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Assignment submissions
CREATE TABLE assignment_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    submission_file_url TEXT,
    submission_text TEXT,
    status assignment_status DEFAULT 'pending',
    points_earned INTEGER,
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    graded_at TIMESTAMP WITH TIME ZONE,
    graded_by UUID REFERENCES profiles(id),
    UNIQUE(assignment_id, student_id)
);

-- Course materials
CREATE TABLE course_materials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    file_type TEXT,
    file_size INTEGER,
    is_public BOOLEAN DEFAULT true,
    uploaded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Attendance records
CREATE TABLE attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_date DATE NOT NULL,
    status attendance_status NOT NULL,
    notes TEXT,
    marked_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(course_id, student_id, class_date)
);

-- Exams table
CREATE TABLE exams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    exam_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    max_points INTEGER NOT NULL DEFAULT 100,
    room TEXT,
    instructions TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Exam results
CREATE TABLE exam_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    points_earned INTEGER NOT NULL,
    grade TEXT,
    feedback TEXT,
    graded_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(exam_id, student_id)
);

-- Announcements table
CREATE TABLE announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    target_audience user_role[],
    course_id UUID REFERENCES courses(id), -- NULL for general announcements
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Student payments
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    payment_method payment_method NOT NULL,
    status payment_status DEFAULT 'pending',
    transaction_id TEXT,
    receipt_url TEXT,
    due_date DATE,
    paid_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Messages/Communication
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    parent_message_id UUID REFERENCES messages(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Bulk email campaigns
CREATE TABLE email_campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    target_audience user_role[],
    course_id UUID REFERENCES courses(id),
    sent_by UUID REFERENCES profiles(id),
    sent_at TIMESTAMP WITH TIME ZONE,
    recipient_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- System settings
CREATE TABLE system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES profiles(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_student_id ON profiles(student_id);
CREATE INDEX idx_profiles_employee_id ON profiles(employee_id);
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_department ON courses(department_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_assignments_course ON assignments(course_id);
CREATE INDEX idx_assignments_due_date ON assignments(due_date);
CREATE INDEX idx_assignment_submissions_student ON assignment_submissions(student_id);
CREATE INDEX idx_assignment_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX idx_attendance_course_date ON attendance(course_id, class_date);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);
CREATE INDEX idx_announcements_target_audience ON announcements USING GIN(target_audience);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
