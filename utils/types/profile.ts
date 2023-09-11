import { Database } from '~/utils/types/supabase'
export type Profile = Database['public']['Tables']['profiles']['Row']
