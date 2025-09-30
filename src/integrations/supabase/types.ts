export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      advertisers: {
        Row: {
          company_name: string
          contact_number: string
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          position: string
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          company_name: string
          contact_number: string
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          position: string
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          company_name?: string
          contact_number?: string
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          position?: string
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      awin_category_mappings: {
        Row: {
          awin_category_id: string
          awin_category_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          our_category_id: string | null
          updated_at: string | null
        }
        Insert: {
          awin_category_id: string
          awin_category_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          our_category_id?: string | null
          updated_at?: string | null
        }
        Update: {
          awin_category_id?: string
          awin_category_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          our_category_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "awin_category_mappings_our_category_id_fkey"
            columns: ["our_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      awin_import_logs: {
        Row: {
          advertiser_filter: string | null
          category_filter: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          error_message: string | null
          id: string
          products_failed: number | null
          products_imported: number | null
          products_updated: number | null
          started_at: string | null
          status: string
        }
        Insert: {
          advertiser_filter?: string | null
          category_filter?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          products_failed?: number | null
          products_imported?: number | null
          products_updated?: number | null
          started_at?: string | null
          status?: string
        }
        Update: {
          advertiser_filter?: string | null
          category_filter?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          id?: string
          products_failed?: number | null
          products_imported?: number | null
          products_updated?: number | null
          started_at?: string | null
          status?: string
        }
        Relationships: []
      }
      bio_link_analytics: {
        Row: {
          bio_link_id: string
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          bio_link_id: string
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          bio_link_id?: string
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bio_link_analytics_bio_link_id_fkey"
            columns: ["bio_link_id"]
            isOneToOne: false
            referencedRelation: "bio_links"
            referencedColumns: ["id"]
          },
        ]
      }
      bio_link_product_categories: {
        Row: {
          bio_link_id: string
          category_id: string
          created_at: string | null
          display_order: number | null
          id: string
          is_visible: boolean | null
        }
        Insert: {
          bio_link_id: string
          category_id: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
        }
        Update: {
          bio_link_id?: string
          category_id?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "bio_link_product_categories_bio_link_id_fkey"
            columns: ["bio_link_id"]
            isOneToOne: false
            referencedRelation: "bio_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bio_link_product_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      bio_link_social_links: {
        Row: {
          bio_link_id: string
          created_at: string | null
          display_order: number | null
          id: string
          is_visible: boolean | null
          platform: string
          url: string
        }
        Insert: {
          bio_link_id: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          platform: string
          url: string
        }
        Update: {
          bio_link_id?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_visible?: boolean | null
          platform?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "bio_link_social_links_bio_link_id_fkey"
            columns: ["bio_link_id"]
            isOneToOne: false
            referencedRelation: "bio_links"
            referencedColumns: ["id"]
          },
        ]
      }
      bio_links: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: Json | null
          id: string
          is_active: boolean | null
          is_premium_theme: boolean | null
          theme_color: string | null
          theme_settings: Json | null
          theme_template: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          display_order?: Json | null
          id?: string
          is_active?: boolean | null
          is_premium_theme?: boolean | null
          theme_color?: string | null
          theme_settings?: Json | null
          theme_template?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          display_order?: Json | null
          id?: string
          is_active?: boolean | null
          is_premium_theme?: boolean | null
          theme_color?: string | null
          theme_settings?: Json | null
          theme_template?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bio_links_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          level: number
          referral_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          level: number
          referral_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          level?: number
          referral_id?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      email_events: {
        Row: {
          available_variables: Json | null
          created_at: string | null
          event_description: string | null
          event_name: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          available_variables?: Json | null
          created_at?: string | null
          event_description?: string | null
          event_name: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          available_variables?: Json | null
          created_at?: string | null
          event_description?: string | null
          event_name?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          clicked_at: string | null
          error_message: string | null
          event_id: string | null
          id: string
          metadata: Json | null
          opened_at: string | null
          recipient_email: string
          recipient_user_id: string | null
          sent_at: string | null
          status: string
          subject: string
          template_id: string | null
        }
        Insert: {
          clicked_at?: string | null
          error_message?: string | null
          event_id?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          recipient_email: string
          recipient_user_id?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          template_id?: string | null
        }
        Update: {
          clicked_at?: string | null
          error_message?: string | null
          event_id?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          recipient_email?: string
          recipient_user_id?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "email_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_template_content: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          is_current: boolean | null
          template_id: string
          text_content: string | null
          version: number
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          is_current?: boolean | null
          template_id: string
          text_content?: string | null
          version?: number
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          is_current?: boolean | null
          template_id?: string
          text_content?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "email_template_content_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_template_events: {
        Row: {
          conditions: Json | null
          created_at: string | null
          event_id: string
          id: string
          is_enabled: boolean | null
          send_delay_minutes: number | null
          template_id: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string | null
          event_id: string
          id?: string
          is_enabled?: boolean | null
          send_delay_minutes?: number | null
          template_id: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string | null
          event_id?: string
          id?: string
          is_enabled?: boolean | null
          send_delay_minutes?: number | null
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_template_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "email_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_template_events_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_template_variables: {
        Row: {
          created_at: string | null
          id: string
          is_required: boolean | null
          template_id: string
          variable_description: string | null
          variable_name: string
          variable_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          template_id: string
          variable_description?: string | null
          variable_name: string
          variable_type?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          template_id?: string
          variable_description?: string | null
          variable_name?: string
          variable_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_template_variables_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          status: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_link: string | null
          aw_deep_link: string | null
          aw_image_url: string | null
          awin_advertiser_id: string | null
          awin_advertiser_name: string | null
          awin_product_id: string | null
          category_id: string | null
          commission_rate: number | null
          created_at: string | null
          currency: string | null
          data_feed_id: string | null
          description: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          is_active: boolean | null
          last_synced_at: string | null
          merchant_id: string | null
          merchant_name: string | null
          merchant_product_id: string | null
          name: string
          price: number
          search_price: number | null
          stock_quantity: number | null
        }
        Insert: {
          affiliate_link?: string | null
          aw_deep_link?: string | null
          aw_image_url?: string | null
          awin_advertiser_id?: string | null
          awin_advertiser_name?: string | null
          awin_product_id?: string | null
          category_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          currency?: string | null
          data_feed_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          is_active?: boolean | null
          last_synced_at?: string | null
          merchant_id?: string | null
          merchant_name?: string | null
          merchant_product_id?: string | null
          name: string
          price: number
          search_price?: number | null
          stock_quantity?: number | null
        }
        Update: {
          affiliate_link?: string | null
          aw_deep_link?: string | null
          aw_image_url?: string | null
          awin_advertiser_id?: string | null
          awin_advertiser_name?: string | null
          awin_product_id?: string | null
          category_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          currency?: string | null
          data_feed_id?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          is_active?: boolean | null
          last_synced_at?: string | null
          merchant_id?: string | null
          merchant_name?: string | null
          merchant_product_id?: string | null
          name?: string
          price?: number
          search_price?: number | null
          stock_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string | null
          id: string
          referrer_id: string | null
          short_link: string | null
          subscription_expires_at: string | null
          subscription_id: string | null
          subscription_product_id: string | null
          subscription_status: string | null
          total_earnings: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name?: string | null
          id: string
          referrer_id?: string | null
          short_link?: string | null
          subscription_expires_at?: string | null
          subscription_id?: string | null
          subscription_product_id?: string | null
          subscription_status?: string | null
          total_earnings?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string | null
          id?: string
          referrer_id?: string | null
          short_link?: string | null
          subscription_expires_at?: string | null
          subscription_id?: string | null
          subscription_product_id?: string | null
          subscription_status?: string | null
          total_earnings?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          level: number
          referred_id: string
          referrer_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          level: number
          referred_id: string
          referrer_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: number
          referred_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "advertiser"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "advertiser"],
    },
  },
} as const
