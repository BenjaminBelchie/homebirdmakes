export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: number
          image: string
          category: string
          etsy_link: string
          created_at: string | null
        }
        Insert: {
          id?: number
          image: string
          category: string
          etsy_link: string
          created_at?: string | null
        }
        Update: {
          id?: number
          image?: string
          category?: string
          etsy_link?: string
          created_at?: string | null
        }
      }
      links: {
        Row: {
          id: number
          display_text: string
          link: string
          created_at: string | null
        }
        Insert: {
          id?: number
          display_text: string
          link: string
          created_at?: string | null
        }
        Update: {
          id?: number
          display_text?: string
          link?: string
          created_at?: string | null
        }
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
  }
}

