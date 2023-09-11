export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          social_links: Json[] | null
          theme: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          social_links?: Json[] | null
          theme?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          social_links?: Json[] | null
          theme?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      socials: {
        Row: {
          icon: string | null
          id: string
          link: string | null
          name: string | null
        }
        Insert: {
          icon?: string | null
          id: string
          link?: string | null
          name?: string | null
        }
        Update: {
          icon?: string | null
          id?: string
          link?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'socials_id_fkey'
            columns: ['id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
