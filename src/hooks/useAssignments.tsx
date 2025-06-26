
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Assignment = Database['public']['Tables']['assignments']['Row'];
type AssignmentInsert = Database['public']['Tables']['assignments']['Insert'];

export function useCourseAssignments(courseId: string) {
  return useQuery({
    queryKey: ['assignments', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('course_id', courseId)
        .eq('is_active', true)
        .order('due_date');

      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });
}

export function useStudentAssignments(studentId: string) {
  return useQuery({
    queryKey: ['student-assignments', studentId],
    queryFn: async () => {
      // First get the courses the student is enrolled in
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('student_id', studentId)
        .eq('is_active', true);

      if (enrollmentError) throw enrollmentError;

      if (!enrollments || enrollments.length === 0) {
        return [];
      }

      const courseIds = enrollments.map(e => e.course_id);

      // Then get assignments for those courses
      const { data, error } = await supabase
        .from('assignments')
        .select(`
          *,
          courses!inner(name, code),
          assignment_submissions!left(
            id,
            status,
            points_earned,
            submitted_at
          )
        `)
        .in('course_id', courseIds)
        .eq('is_active', true)
        .order('due_date');

      if (error) throw error;
      return data;
    },
    enabled: !!studentId,
  });
}

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assignment: AssignmentInsert) => {
      const { data, error } = await supabase
        .from('assignments')
        .insert(assignment)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['assignments', data.course_id] });
    },
  });
}
