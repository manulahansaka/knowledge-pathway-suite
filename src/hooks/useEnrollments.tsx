
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Enrollment = Database['public']['Tables']['enrollments']['Row'];

export function useStudentEnrollments(studentId: string) {
  return useQuery({
    queryKey: ['enrollments', studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(
            id,
            name,
            code,
            credits,
            semester,
            academic_year,
            instructor:profiles!courses_instructor_id_fkey(full_name)
          )
        `)
        .eq('student_id', studentId)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
    enabled: !!studentId,
  });
}

export function useCourseEnrollments(courseId: string) {
  return useQuery({
    queryKey: ['course-enrollments', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          student:profiles!enrollments_student_id_fkey(
            id,
            full_name,
            email,
            student_id
          )
        `)
        .eq('course_id', courseId)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });
}

export function useEnrollStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ studentId, courseId }: { studentId: string; courseId: string }) => {
      const { data, error } = await supabase
        .from('enrollments')
        .insert({
          student_id: studentId,
          course_id: courseId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['enrollments', data.student_id] });
      queryClient.invalidateQueries({ queryKey: ['course-enrollments', data.course_id] });
    },
  });
}
