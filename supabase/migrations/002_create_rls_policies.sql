
-- RLS Policies for secure access control

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins and academic staff can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'academic_staff')
        )
    );

CREATE POLICY "Admins and academic staff can insert profiles" ON profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'academic_staff')
        )
    );

-- Teachers can view student profiles in their courses
CREATE POLICY "Teachers can view enrolled students" ON profiles
    FOR SELECT USING (
        role = 'student' AND
        EXISTS (
            SELECT 1 FROM profiles teacher
            JOIN courses ON teacher.id = courses.instructor_id
            JOIN enrollments ON courses.id = enrollments.course_id
            WHERE teacher.id = auth.uid() 
            AND teacher.role = 'teacher'
            AND enrollments.student_id = profiles.id
        )
    );

-- Courses policies
CREATE POLICY "Users can view active courses" ON courses
    FOR SELECT USING (is_active = true);

CREATE POLICY "Teachers can view their courses" ON courses
    FOR SELECT USING (instructor_id = auth.uid());

CREATE POLICY "Admins and academic staff can manage courses" ON courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'academic_staff')
        )
    );

-- Enrollments policies
CREATE POLICY "Students can view their enrollments" ON enrollments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can view enrollments in their courses" ON enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE id = course_id 
            AND instructor_id = auth.uid()
        )
    );

CREATE POLICY "Academic staff and admins can manage enrollments" ON enrollments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'academic_staff')
        )
    );

-- Assignments policies
CREATE POLICY "Students can view assignments in enrolled courses" ON assignments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM enrollments 
            WHERE course_id = assignments.course_id 
            AND student_id = auth.uid()
        )
    );

CREATE POLICY "Teachers can manage assignments in their courses" ON assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE id = course_id 
            AND instructor_id = auth.uid()
        )
    );

-- Assignment submissions policies
CREATE POLICY "Students can manage their own submissions" ON assignment_submissions
    FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers can view submissions for their assignments" ON assignment_submissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM assignments a
            JOIN courses c ON a.course_id = c.id
            WHERE a.id = assignment_id 
            AND c.instructor_id = auth.uid()
        )
    );

CREATE POLICY "Teachers can grade submissions in their courses" ON assignment_submissions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM assignments a
            JOIN courses c ON a.course_id = c.id
            WHERE a.id = assignment_id 
            AND c.instructor_id = auth.uid()
        )
    );

-- Course materials policies
CREATE POLICY "Students can view public materials in enrolled courses" ON course_materials
    FOR SELECT USING (
        is_public = true AND
        EXISTS (
            SELECT 1 FROM enrollments 
            WHERE course_id = course_materials.course_id 
            AND student_id = auth.uid()
        )
    );

CREATE POLICY "Teachers can manage materials in their courses" ON course_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE id = course_id 
            AND instructor_id = auth.uid()
        )
    );

-- Attendance policies
CREATE POLICY "Students can view their own attendance" ON attendance
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can manage attendance in their courses" ON attendance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE id = course_id 
            AND instructor_id = auth.uid()
        )
    );

-- Payments policies
CREATE POLICY "Students can view their own payments" ON payments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can insert their own payments" ON payments
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Academic staff and admins can manage payments" ON payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('admin', 'academic_staff')
        )
    );

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" ON messages
    FOR SELECT USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update messages they sent" ON messages
    FOR UPDATE USING (sender_id = auth.uid());

-- Announcements policies
CREATE POLICY "Users can view announcements for their role" ON announcements
    FOR SELECT USING (
        target_audience IS NULL OR 
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = ANY(target_audience)
        )
    );

CREATE POLICY "Teachers, academic staff, and admins can create announcements" ON announcements
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('teacher', 'academic_staff', 'admin')
        )
    );

-- System settings policies (admin only)
CREATE POLICY "Only admins can manage system settings" ON system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Functions to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignment_submissions_updated_at BEFORE UPDATE ON assignment_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_materials_updated_at BEFORE UPDATE ON course_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_results_updated_at BEFORE UPDATE ON exam_results FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
