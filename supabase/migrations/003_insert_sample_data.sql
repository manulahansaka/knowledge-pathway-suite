
-- Insert some initial data for testing

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('institution_name', 'University of Excellence', 'Name of the educational institution'),
('academic_year', '2024-2025', 'Current academic year'),
('semester', '1', 'Current semester'),
('currency', 'USD', 'Currency for payments'),
('timezone', 'UTC', 'System timezone');

-- Insert a sample department
INSERT INTO departments (id, name, code, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Computer Science', 'CS', 'Department of Computer Science and Engineering');

-- Note: User profiles will be created automatically when users sign up
-- The actual user data will come from authentication and profile completion

-- Insert sample course categories
INSERT INTO courses (id, name, code, description, credits, semester, academic_year, department_id, is_active) VALUES
('22222222-2222-2222-2222-222222222222', 'Introduction to Programming', 'CS101', 'Basic programming concepts and fundamentals', 3, 1, '2024-2025', '11111111-1111-1111-1111-111111111111', true),
('33333333-3333-3333-3333-333333333333', 'Database Systems', 'CS301', 'Database design and management', 4, 3, '2024-2025', '11111111-1111-1111-1111-111111111111', true),
('44444444-4444-4444-4444-444444444444', 'Web Development', 'CS250', 'Modern web development technologies', 3, 2, '2024-2025', '11111111-1111-1111-1111-111111111111', true);
