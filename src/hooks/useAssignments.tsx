
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
      const { data, error } = await supabase
        .from('assignments')
        .select(`
          *,
          course:courses(name, code),
          submission:assignment_submissions!left(
            id,
            status,
            points_earned,
            submitted_at
          )
        `)
        .eq('course_id', 'IN', `(SELECT course_id FROM enrollments WHERE student_id = '${studentId}' AND is_active = true)`)
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
