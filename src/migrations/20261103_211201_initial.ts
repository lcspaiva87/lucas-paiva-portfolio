import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_links_kind" AS ENUM('play-store', 'app-store', 'website', 'repository', 'other');
  CREATE TYPE "public"."enum_projects_blocks_feature_grid_items_icon" AS ENUM('heart', 'flame', 'layers', 'camera', 'sparkles', 'lock', 'crown', 'smartphone', 'globe', 'bot', 'calendar-clock', 'chart-line', 'shield-check', 'zap', 'users', 'wallet', 'paw-print', 'bell', 'code');
  CREATE TYPE "public"."enum_projects_blocks_gallery_layout" AS ENUM('phones', 'wide');
  CREATE TYPE "public"."enum_projects_category" AS ENUM('mobile', 'web', 'saas', 'desktop');
  CREATE TYPE "public"."enum_projects_stage" AS ENUM('production', 'development', 'discontinued');
  CREATE TYPE "public"."enum_projects_glyph" AS ENUM('heart', 'flame', 'layers', 'camera', 'sparkles', 'lock', 'crown', 'smartphone', 'globe', 'bot', 'calendar-clock', 'chart-line', 'shield-check', 'zap', 'users', 'wallet', 'paw-print', 'bell', 'code');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_links_kind" AS ENUM('play-store', 'app-store', 'website', 'repository', 'other');
  CREATE TYPE "public"."enum__projects_v_blocks_feature_grid_items_icon" AS ENUM('heart', 'flame', 'layers', 'camera', 'sparkles', 'lock', 'crown', 'smartphone', 'globe', 'bot', 'calendar-clock', 'chart-line', 'shield-check', 'zap', 'users', 'wallet', 'paw-print', 'bell', 'code');
  CREATE TYPE "public"."enum__projects_v_blocks_gallery_layout" AS ENUM('phones', 'wide');
  CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('mobile', 'web', 'saas', 'desktop');
  CREATE TYPE "public"."enum__projects_v_version_stage" AS ENUM('production', 'development', 'discontinued');
  CREATE TYPE "public"."enum__projects_v_version_glyph" AS ENUM('heart', 'flame', 'layers', 'camera', 'sparkles', 'lock', 'crown', 'smartphone', 'globe', 'bot', 'calendar-clock', 'chart-line', 'shield-check', 'zap', 'users', 'wallet', 'paw-print', 'bell', 'code');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_technologies_icon" AS ENUM('react', 'nextdotjs', 'typescript', 'javascript', 'tailwindcss', 'shadcnui', 'reactquery', 'tanstack', 'redux', 'reactrouter', 'vite', 'sass', 'framer', 'threedotjs', 'storybook', 'figma', 'zod', 'nodedotjs', 'nestjs', 'graphql', 'python', 'payloadcms', 'stripe', 'anthropic', 'claude', 'expo', 'googleplay', 'appstore', 'apple', 'android', 'ios', 'swift', 'kotlin', 'flutter', 'postgresql', 'mysql', 'mongodb', 'redis', 'prisma', 'supabase', 'firebase', 'electron', 'git', 'github', 'vercel', 'docker', 'nginx', 'linux', 'pnpm', 'npm', 'turborepo', 'jest', 'vitest', 'cypress', 'google', 'generic-ai', 'generic-api', 'generic-cloud', 'generic-database', 'generic-auth', 'generic-test', 'generic-state', 'generic-code');
  CREATE TYPE "public"."enum_technologies_group" AS ENUM('frontend', 'backend', 'mobile', 'data', 'tools', 'other');
  CREATE TYPE "public"."enum_technologies_appearance" AS ENUM('tint', 'solid', 'outline', 'neutral');
  CREATE TYPE "public"."enum_experiences_kind" AS ENUM('work', 'education');
  CREATE TYPE "public"."enum_profile_facts_icon" AS ENUM('map-pin', 'graduation-cap', 'laptop', 'globe');
  CREATE TYPE "public"."enum_profile_socials_platform" AS ENUM('github', 'linkedin', 'youtube', 'instagram', 'x');
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_projects_links_kind" DEFAULT 'website',
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "projects_blocks_text_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "projects_blocks_text_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_projects_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_challenges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"layout" "enum_projects_blocks_gallery_layout" DEFAULT 'phones',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "projects_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_projects_category" DEFAULT 'mobile',
  	"stage" "enum_projects_stage" DEFAULT 'production',
  	"featured" boolean DEFAULT false,
  	"tagline" varchar,
  	"glyph" "enum_projects_glyph",
  	"accent_color" varchar,
  	"cover_id" integer,
  	"summary" varchar,
  	"role" varchar,
  	"platform" varchar,
  	"period_start" timestamp(3) with time zone,
  	"period_end" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"technologies_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__projects_v_version_links_kind" DEFAULT 'website',
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text_columns_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__projects_v_blocks_feature_grid_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_challenges_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_challenges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"layout" "enum__projects_v_blocks_gallery_layout" DEFAULT 'phones',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_metrics_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__projects_v_version_category" DEFAULT 'mobile',
  	"version_stage" "enum__projects_v_version_stage" DEFAULT 'production',
  	"version_featured" boolean DEFAULT false,
  	"version_tagline" varchar,
  	"version_glyph" "enum__projects_v_version_glyph",
  	"version_accent_color" varchar,
  	"version_cover_id" integer,
  	"version_summary" varchar,
  	"version_role" varchar,
  	"version_platform" varchar,
  	"version_period_start" timestamp(3) with time zone,
  	"version_period_end" timestamp(3) with time zone,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"technologies_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "technologies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"icon" "enum_technologies_icon",
  	"abbr" varchar,
  	"group" "enum_technologies_group" DEFAULT 'frontend' NOT NULL,
  	"appearance" "enum_technologies_appearance" DEFAULT 'tint' NOT NULL,
  	"color" varchar,
  	"on_color" varchar,
  	"show_in_stack" boolean DEFAULT true,
  	"show_in_hero" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experiences_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_experiences_kind" DEFAULT 'work' NOT NULL,
  	"organization" varchar,
  	"title" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"summary" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"technologies_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_full_url" varchar,
  	"sizes_full_width" numeric,
  	"sizes_full_height" numeric,
  	"sizes_full_mime_type" varchar,
  	"sizes_full_filesize" numeric,
  	"sizes_full_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"technologies_id" integer,
  	"experiences_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "profile_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"accent" boolean DEFAULT false
  );
  
  CREATE TABLE "profile_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_profile_facts_icon" DEFAULT 'map-pin' NOT NULL,
  	"text" varchar NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "profile_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_profile_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"location" varchar,
  	"resume_id" integer,
  	"about_heading" varchar NOT NULL,
  	"about_body" varchar NOT NULL,
  	"photo_id" integer,
  	"projects_heading" varchar NOT NULL,
  	"experience_heading" varchar NOT NULL,
  	"stack_heading" varchar NOT NULL,
  	"stack_intro" varchar,
  	"contact_heading" varchar NOT NULL,
  	"email" varchar,
  	"available" boolean DEFAULT true,
  	"availability_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_columns_columns" ADD CONSTRAINT "projects_blocks_text_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_columns" ADD CONSTRAINT "projects_blocks_text_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD CONSTRAINT "projects_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid" ADD CONSTRAINT "projects_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_challenges_items" ADD CONSTRAINT "projects_blocks_challenges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_challenges" ADD CONSTRAINT "projects_blocks_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_metrics_items" ADD CONSTRAINT "projects_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_metrics" ADD CONSTRAINT "projects_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text" ADD CONSTRAINT "projects_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_columns_columns" ADD CONSTRAINT "_projects_v_blocks_text_columns_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_text_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_columns" ADD CONSTRAINT "_projects_v_blocks_text_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_items" ADD CONSTRAINT "_projects_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid" ADD CONSTRAINT "_projects_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_challenges_items" ADD CONSTRAINT "_projects_v_blocks_challenges_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_challenges" ADD CONSTRAINT "_projects_v_blocks_challenges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_metrics_items" ADD CONSTRAINT "_projects_v_blocks_metrics_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_metrics" ADD CONSTRAINT "_projects_v_blocks_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD CONSTRAINT "_projects_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_responsibilities" ADD CONSTRAINT "experiences_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_results" ADD CONSTRAINT "experiences_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_stats" ADD CONSTRAINT "profile_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_facts" ADD CONSTRAINT "profile_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_socials" ADD CONSTRAINT "profile_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_columns_columns_order_idx" ON "projects_blocks_text_columns_columns" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_columns_columns_parent_id_idx" ON "projects_blocks_text_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_columns_order_idx" ON "projects_blocks_text_columns" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_columns_parent_id_idx" ON "projects_blocks_text_columns" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_columns_path_idx" ON "projects_blocks_text_columns" USING btree ("_path");
  CREATE INDEX "projects_blocks_feature_grid_items_order_idx" ON "projects_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_items_parent_id_idx" ON "projects_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_order_idx" ON "projects_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "projects_blocks_feature_grid_parent_id_idx" ON "projects_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_path_idx" ON "projects_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "projects_blocks_challenges_items_order_idx" ON "projects_blocks_challenges_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_challenges_items_parent_id_idx" ON "projects_blocks_challenges_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_challenges_order_idx" ON "projects_blocks_challenges" USING btree ("_order");
  CREATE INDEX "projects_blocks_challenges_parent_id_idx" ON "projects_blocks_challenges" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_challenges_path_idx" ON "projects_blocks_challenges" USING btree ("_path");
  CREATE INDEX "projects_blocks_gallery_images_order_idx" ON "projects_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_images_parent_id_idx" ON "projects_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_image_idx" ON "projects_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_metrics_items_order_idx" ON "projects_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_metrics_items_parent_id_idx" ON "projects_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_metrics_order_idx" ON "projects_blocks_metrics" USING btree ("_order");
  CREATE INDEX "projects_blocks_metrics_parent_id_idx" ON "projects_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_metrics_path_idx" ON "projects_blocks_metrics" USING btree ("_path");
  CREATE INDEX "projects_blocks_rich_text_order_idx" ON "projects_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "projects_blocks_rich_text_parent_id_idx" ON "projects_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_rich_text_path_idx" ON "projects_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_technologies_id_idx" ON "projects_rels" USING btree ("technologies_id");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_columns_columns_order_idx" ON "_projects_v_blocks_text_columns_columns" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_columns_columns_parent_id_idx" ON "_projects_v_blocks_text_columns_columns" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_columns_order_idx" ON "_projects_v_blocks_text_columns" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_columns_parent_id_idx" ON "_projects_v_blocks_text_columns" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_columns_path_idx" ON "_projects_v_blocks_text_columns" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_order_idx" ON "_projects_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_parent_id_idx" ON "_projects_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_order_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_feature_grid_parent_id_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_path_idx" ON "_projects_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_challenges_items_order_idx" ON "_projects_v_blocks_challenges_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_challenges_items_parent_id_idx" ON "_projects_v_blocks_challenges_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_challenges_order_idx" ON "_projects_v_blocks_challenges" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_challenges_parent_id_idx" ON "_projects_v_blocks_challenges" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_challenges_path_idx" ON "_projects_v_blocks_challenges" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_gallery_images_order_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_images_parent_id_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_image_idx" ON "_projects_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_metrics_items_order_idx" ON "_projects_v_blocks_metrics_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_metrics_items_parent_id_idx" ON "_projects_v_blocks_metrics_items" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_metrics_order_idx" ON "_projects_v_blocks_metrics" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_metrics_parent_id_idx" ON "_projects_v_blocks_metrics" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_metrics_path_idx" ON "_projects_v_blocks_metrics" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_rich_text_order_idx" ON "_projects_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_rich_text_parent_id_idx" ON "_projects_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_path_idx" ON "_projects_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version__order_idx" ON "_projects_v" USING btree ("version__order");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_cover_idx" ON "_projects_v" USING btree ("version_cover_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_technologies_id_idx" ON "_projects_v_rels" USING btree ("technologies_id");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "technologies__order_idx" ON "technologies" USING btree ("_order");
  CREATE UNIQUE INDEX "technologies_name_idx" ON "technologies" USING btree ("name");
  CREATE INDEX "technologies_updated_at_idx" ON "technologies" USING btree ("updated_at");
  CREATE INDEX "technologies_created_at_idx" ON "technologies" USING btree ("created_at");
  CREATE INDEX "experiences_responsibilities_order_idx" ON "experiences_responsibilities" USING btree ("_order");
  CREATE INDEX "experiences_responsibilities_parent_id_idx" ON "experiences_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "experiences_results_order_idx" ON "experiences_results" USING btree ("_order");
  CREATE INDEX "experiences_results_parent_id_idx" ON "experiences_results" USING btree ("_parent_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
  CREATE INDEX "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
  CREATE INDEX "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
  CREATE INDEX "experiences_rels_technologies_id_idx" ON "experiences_rels" USING btree ("technologies_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_full_sizes_full_filename_idx" ON "media" USING btree ("sizes_full_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_technologies_id_idx" ON "payload_locked_documents_rels" USING btree ("technologies_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "profile_stats_order_idx" ON "profile_stats" USING btree ("_order");
  CREATE INDEX "profile_stats_parent_id_idx" ON "profile_stats" USING btree ("_parent_id");
  CREATE INDEX "profile_facts_order_idx" ON "profile_facts" USING btree ("_order");
  CREATE INDEX "profile_facts_parent_id_idx" ON "profile_facts" USING btree ("_parent_id");
  CREATE INDEX "profile_socials_order_idx" ON "profile_socials" USING btree ("_order");
  CREATE INDEX "profile_socials_parent_id_idx" ON "profile_socials" USING btree ("_parent_id");
  CREATE INDEX "profile_resume_idx" ON "profile" USING btree ("resume_id");
  CREATE INDEX "profile_photo_idx" ON "profile" USING btree ("photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects_blocks_text_columns_columns" CASCADE;
  DROP TABLE "projects_blocks_text_columns" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items" CASCADE;
  DROP TABLE "projects_blocks_feature_grid" CASCADE;
  DROP TABLE "projects_blocks_challenges_items" CASCADE;
  DROP TABLE "projects_blocks_challenges" CASCADE;
  DROP TABLE "projects_blocks_gallery_images" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_metrics_items" CASCADE;
  DROP TABLE "projects_blocks_metrics" CASCADE;
  DROP TABLE "projects_blocks_rich_text" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v_blocks_text_columns_columns" CASCADE;
  DROP TABLE "_projects_v_blocks_text_columns" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_projects_v_blocks_challenges_items" CASCADE;
  DROP TABLE "_projects_v_blocks_challenges" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_metrics_items" CASCADE;
  DROP TABLE "_projects_v_blocks_metrics" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "technologies" CASCADE;
  DROP TABLE "experiences_responsibilities" CASCADE;
  DROP TABLE "experiences_results" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "profile_stats" CASCADE;
  DROP TABLE "profile_facts" CASCADE;
  DROP TABLE "profile_socials" CASCADE;
  DROP TABLE "profile" CASCADE;
  DROP TYPE "public"."enum_projects_links_kind";
  DROP TYPE "public"."enum_projects_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum_projects_blocks_gallery_layout";
  DROP TYPE "public"."enum_projects_category";
  DROP TYPE "public"."enum_projects_stage";
  DROP TYPE "public"."enum_projects_glyph";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_links_kind";
  DROP TYPE "public"."enum__projects_v_blocks_feature_grid_items_icon";
  DROP TYPE "public"."enum__projects_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__projects_v_version_category";
  DROP TYPE "public"."enum__projects_v_version_stage";
  DROP TYPE "public"."enum__projects_v_version_glyph";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_technologies_icon";
  DROP TYPE "public"."enum_technologies_group";
  DROP TYPE "public"."enum_technologies_appearance";
  DROP TYPE "public"."enum_experiences_kind";
  DROP TYPE "public"."enum_profile_facts_icon";
  DROP TYPE "public"."enum_profile_socials_platform";`)
}
