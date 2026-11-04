import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('pt', 'en');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('pt', 'en');
  CREATE TABLE "projects_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_text_columns_columns_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_feature_grid_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_feature_grid_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_challenges_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_challenges_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_metrics_items_locales" (
  	"value" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_metrics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_rich_text_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"tagline" varchar,
  	"summary" varchar,
  	"role" varchar,
  	"platform" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_text_columns_columns_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_feature_grid_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_feature_grid_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_challenges_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_challenges_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_metrics_items_locales" (
  	"value" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_metrics_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_rich_text_locales" (
  	"label" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_tagline" varchar,
  	"version_summary" varchar,
  	"version_role" varchar,
  	"version_platform" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "technologies_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences_responsibilities_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_results_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "experiences_locales" (
  	"title" varchar NOT NULL,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "profile_stats_locales" (
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "profile_facts_locales" (
  	"text" varchar NOT NULL,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "profile_locales" (
  	"role" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"location" varchar,
  	"resume_id" integer,
  	"about_heading" varchar NOT NULL,
  	"about_body" varchar NOT NULL,
  	"projects_heading" varchar NOT NULL,
  	"experience_heading" varchar NOT NULL,
  	"stack_heading" varchar NOT NULL,
  	"stack_intro" varchar,
  	"contact_heading" varchar NOT NULL,
  	"availability_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "profile" DROP CONSTRAINT "profile_resume_id_media_id_fk";
  
  DROP INDEX "technologies_name_idx";
  DROP INDEX "profile_resume_idx";
  ALTER TABLE "_projects_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_projects_v" ADD COLUMN "published_locale" "enum__projects_v_published_locale";
  ALTER TABLE "projects_links_locales" ADD CONSTRAINT "projects_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_columns_columns_locales" ADD CONSTRAINT "projects_blocks_text_columns_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_columns_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_items_locales" ADD CONSTRAINT "projects_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_feature_grid_locales" ADD CONSTRAINT "projects_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_challenges_items_locales" ADD CONSTRAINT "projects_blocks_challenges_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_challenges_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_challenges_locales" ADD CONSTRAINT "projects_blocks_challenges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images_locales" ADD CONSTRAINT "projects_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_locales" ADD CONSTRAINT "projects_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_metrics_items_locales" ADD CONSTRAINT "projects_blocks_metrics_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_metrics_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_metrics_locales" ADD CONSTRAINT "projects_blocks_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_rich_text_locales" ADD CONSTRAINT "projects_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links_locales" ADD CONSTRAINT "_projects_v_version_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_columns_columns_locales" ADD CONSTRAINT "_projects_v_blocks_text_columns_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_text_columns_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_items_locales" ADD CONSTRAINT "_projects_v_blocks_feature_grid_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" ADD CONSTRAINT "_projects_v_blocks_feature_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_challenges_items_locales" ADD CONSTRAINT "_projects_v_blocks_challenges_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_challenges_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_challenges_locales" ADD CONSTRAINT "_projects_v_blocks_challenges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_challenges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_metrics_items_locales" ADD CONSTRAINT "_projects_v_blocks_metrics_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_metrics_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_metrics_locales" ADD CONSTRAINT "_projects_v_blocks_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" ADD CONSTRAINT "_projects_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "technologies_locales" ADD CONSTRAINT "technologies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_responsibilities_locales" ADD CONSTRAINT "experiences_responsibilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_responsibilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_results_locales" ADD CONSTRAINT "experiences_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_stats_locales" ADD CONSTRAINT "profile_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_facts_locales" ADD CONSTRAINT "profile_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_locales" ADD CONSTRAINT "profile_locales_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profile_locales" ADD CONSTRAINT "profile_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "projects_links_locales_locale_parent_id_unique" ON "projects_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_links_locales_parent_id_idx" ON "projects_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_text_columns_columns_locales_locale_parent_i" ON "projects_blocks_text_columns_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_text_columns_columns_locales_parent_id_idx" ON "projects_blocks_text_columns_columns_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_items_locales_locale_parent_id_" ON "projects_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_items_locales_parent_id_idx" ON "projects_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_feature_grid_locales_locale_parent_id_unique" ON "projects_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_feature_grid_locales_parent_id_idx" ON "projects_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_challenges_items_locales_locale_parent_id_un" ON "projects_blocks_challenges_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_challenges_items_locales_parent_id_idx" ON "projects_blocks_challenges_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_challenges_locales_locale_parent_id_unique" ON "projects_blocks_challenges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_challenges_locales_parent_id_idx" ON "projects_blocks_challenges_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_gallery_images_locales_locale_parent_id_uniq" ON "projects_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_locales_parent_id_idx" ON "projects_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_gallery_locales_locale_parent_id_unique" ON "projects_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_locales_parent_id_idx" ON "projects_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_metrics_items_locales_locale_parent_id_uniqu" ON "projects_blocks_metrics_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_metrics_items_locales_parent_id_idx" ON "projects_blocks_metrics_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_metrics_locales_locale_parent_id_unique" ON "projects_blocks_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_metrics_locales_parent_id_idx" ON "projects_blocks_metrics_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_rich_text_locales_locale_parent_id_unique" ON "projects_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_rich_text_locales_parent_id_idx" ON "projects_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_links_locales_locale_parent_id_unique" ON "_projects_v_version_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_links_locales_parent_id_idx" ON "_projects_v_version_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_text_columns_columns_locales_locale_paren" ON "_projects_v_blocks_text_columns_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_text_columns_columns_locales_parent_i_idx" ON "_projects_v_blocks_text_columns_columns_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_feature_grid_items_locales_locale_parent_" ON "_projects_v_blocks_feature_grid_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_items_locales_parent_id_idx" ON "_projects_v_blocks_feature_grid_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_feature_grid_locales_locale_parent_id_uni" ON "_projects_v_blocks_feature_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_feature_grid_locales_parent_id_idx" ON "_projects_v_blocks_feature_grid_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_challenges_items_locales_locale_parent_id" ON "_projects_v_blocks_challenges_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_challenges_items_locales_parent_id_idx" ON "_projects_v_blocks_challenges_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_challenges_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_challenges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_challenges_locales_parent_id_idx" ON "_projects_v_blocks_challenges_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_images_locales_locale_parent_id_u" ON "_projects_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_locales_parent_id_idx" ON "_projects_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_locales_locale_parent_id_unique" ON "_projects_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_locales_parent_id_idx" ON "_projects_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_metrics_items_locales_locale_parent_id_un" ON "_projects_v_blocks_metrics_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_metrics_items_locales_parent_id_idx" ON "_projects_v_blocks_metrics_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_metrics_locales_locale_parent_id_unique" ON "_projects_v_blocks_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_metrics_locales_parent_id_idx" ON "_projects_v_blocks_metrics_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_projects_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_rich_text_locales_parent_id_idx" ON "_projects_v_blocks_rich_text_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "technologies_name_idx" ON "technologies_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "technologies_locales_locale_parent_id_unique" ON "technologies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "technologies_locales_parent_id_idx" ON "technologies_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_responsibilities_locales_locale_parent_id_unique" ON "experiences_responsibilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_responsibilities_locales_parent_id_idx" ON "experiences_responsibilities_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_results_locales_locale_parent_id_unique" ON "experiences_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_results_locales_parent_id_idx" ON "experiences_results_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_locales_parent_id_idx" ON "experiences_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "profile_stats_locales_locale_parent_id_unique" ON "profile_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "profile_stats_locales_parent_id_idx" ON "profile_stats_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "profile_facts_locales_locale_parent_id_unique" ON "profile_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "profile_facts_locales_parent_id_idx" ON "profile_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "profile_resume_idx" ON "profile_locales" USING btree ("resume_id","_locale");
  CREATE UNIQUE INDEX "profile_locales_locale_parent_id_unique" ON "profile_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "profile_locales_parent_id_idx" ON "profile_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  ALTER TABLE "projects_links" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_text_columns_columns" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_text_columns_columns" DROP COLUMN "heading";
  ALTER TABLE "projects_blocks_text_columns_columns" DROP COLUMN "body";
  ALTER TABLE "projects_blocks_feature_grid_items" DROP COLUMN "title";
  ALTER TABLE "projects_blocks_feature_grid_items" DROP COLUMN "description";
  ALTER TABLE "projects_blocks_feature_grid" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_challenges_items" DROP COLUMN "title";
  ALTER TABLE "projects_blocks_challenges_items" DROP COLUMN "description";
  ALTER TABLE "projects_blocks_challenges" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_challenges" DROP COLUMN "heading";
  ALTER TABLE "projects_blocks_gallery_images" DROP COLUMN "caption";
  ALTER TABLE "projects_blocks_gallery" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_metrics_items" DROP COLUMN "value";
  ALTER TABLE "projects_blocks_metrics_items" DROP COLUMN "description";
  ALTER TABLE "projects_blocks_metrics" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_rich_text" DROP COLUMN "label";
  ALTER TABLE "projects_blocks_rich_text" DROP COLUMN "heading";
  ALTER TABLE "projects_blocks_rich_text" DROP COLUMN "content";
  ALTER TABLE "projects" DROP COLUMN "tagline";
  ALTER TABLE "projects" DROP COLUMN "summary";
  ALTER TABLE "projects" DROP COLUMN "role";
  ALTER TABLE "projects" DROP COLUMN "platform";
  ALTER TABLE "projects" DROP COLUMN "seo_title";
  ALTER TABLE "projects" DROP COLUMN "seo_description";
  ALTER TABLE "_projects_v_version_links" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_text_columns_columns" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_text_columns_columns" DROP COLUMN "heading";
  ALTER TABLE "_projects_v_blocks_text_columns_columns" DROP COLUMN "body";
  ALTER TABLE "_projects_v_blocks_feature_grid_items" DROP COLUMN "title";
  ALTER TABLE "_projects_v_blocks_feature_grid_items" DROP COLUMN "description";
  ALTER TABLE "_projects_v_blocks_feature_grid" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_challenges_items" DROP COLUMN "title";
  ALTER TABLE "_projects_v_blocks_challenges_items" DROP COLUMN "description";
  ALTER TABLE "_projects_v_blocks_challenges" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_challenges" DROP COLUMN "heading";
  ALTER TABLE "_projects_v_blocks_gallery_images" DROP COLUMN "caption";
  ALTER TABLE "_projects_v_blocks_gallery" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_metrics_items" DROP COLUMN "value";
  ALTER TABLE "_projects_v_blocks_metrics_items" DROP COLUMN "description";
  ALTER TABLE "_projects_v_blocks_metrics" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_rich_text" DROP COLUMN "label";
  ALTER TABLE "_projects_v_blocks_rich_text" DROP COLUMN "heading";
  ALTER TABLE "_projects_v_blocks_rich_text" DROP COLUMN "content";
  ALTER TABLE "_projects_v" DROP COLUMN "version_tagline";
  ALTER TABLE "_projects_v" DROP COLUMN "version_summary";
  ALTER TABLE "_projects_v" DROP COLUMN "version_role";
  ALTER TABLE "_projects_v" DROP COLUMN "version_platform";
  ALTER TABLE "_projects_v" DROP COLUMN "version_seo_title";
  ALTER TABLE "_projects_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "technologies" DROP COLUMN "name";
  ALTER TABLE "experiences_responsibilities" DROP COLUMN "text";
  ALTER TABLE "experiences_results" DROP COLUMN "text";
  ALTER TABLE "experiences" DROP COLUMN "title";
  ALTER TABLE "experiences" DROP COLUMN "summary";
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "profile_stats" DROP COLUMN "value";
  ALTER TABLE "profile_stats" DROP COLUMN "label";
  ALTER TABLE "profile_facts" DROP COLUMN "text";
  ALTER TABLE "profile_facts" DROP COLUMN "detail";
  ALTER TABLE "profile" DROP COLUMN "role";
  ALTER TABLE "profile" DROP COLUMN "headline";
  ALTER TABLE "profile" DROP COLUMN "intro";
  ALTER TABLE "profile" DROP COLUMN "location";
  ALTER TABLE "profile" DROP COLUMN "resume_id";
  ALTER TABLE "profile" DROP COLUMN "about_heading";
  ALTER TABLE "profile" DROP COLUMN "about_body";
  ALTER TABLE "profile" DROP COLUMN "projects_heading";
  ALTER TABLE "profile" DROP COLUMN "experience_heading";
  ALTER TABLE "profile" DROP COLUMN "stack_heading";
  ALTER TABLE "profile" DROP COLUMN "stack_intro";
  ALTER TABLE "profile" DROP COLUMN "contact_heading";
  ALTER TABLE "profile" DROP COLUMN "availability_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_text_columns_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_challenges_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_challenges_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_metrics_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_metrics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_text_columns_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_feature_grid_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_feature_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_challenges_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_challenges_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_images_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_gallery_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_metrics_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_metrics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "technologies_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experiences_responsibilities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experiences_results_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experiences_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profile_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profile_facts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profile_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_links_locales" CASCADE;
  DROP TABLE "projects_blocks_text_columns_columns_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "projects_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "projects_blocks_challenges_items_locales" CASCADE;
  DROP TABLE "projects_blocks_challenges_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_locales" CASCADE;
  DROP TABLE "projects_blocks_metrics_items_locales" CASCADE;
  DROP TABLE "projects_blocks_metrics_locales" CASCADE;
  DROP TABLE "projects_blocks_rich_text_locales" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v_version_links_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_text_columns_columns_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_feature_grid_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_challenges_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_challenges_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_metrics_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_metrics_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "technologies_locales" CASCADE;
  DROP TABLE "experiences_responsibilities_locales" CASCADE;
  DROP TABLE "experiences_results_locales" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "profile_stats_locales" CASCADE;
  DROP TABLE "profile_facts_locales" CASCADE;
  DROP TABLE "profile_locales" CASCADE;
  DROP INDEX "_projects_v_snapshot_idx";
  DROP INDEX "_projects_v_published_locale_idx";
  ALTER TABLE "projects_links" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_text_columns_columns" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_text_columns_columns" ADD COLUMN "heading" varchar;
  ALTER TABLE "projects_blocks_text_columns_columns" ADD COLUMN "body" jsonb;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD COLUMN "title" varchar;
  ALTER TABLE "projects_blocks_feature_grid_items" ADD COLUMN "description" varchar;
  ALTER TABLE "projects_blocks_feature_grid" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_challenges_items" ADD COLUMN "title" varchar;
  ALTER TABLE "projects_blocks_challenges_items" ADD COLUMN "description" varchar;
  ALTER TABLE "projects_blocks_challenges" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_challenges" ADD COLUMN "heading" varchar;
  ALTER TABLE "projects_blocks_gallery_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "projects_blocks_gallery" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_metrics_items" ADD COLUMN "value" varchar;
  ALTER TABLE "projects_blocks_metrics_items" ADD COLUMN "description" varchar;
  ALTER TABLE "projects_blocks_metrics" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_rich_text" ADD COLUMN "label" varchar;
  ALTER TABLE "projects_blocks_rich_text" ADD COLUMN "heading" varchar;
  ALTER TABLE "projects_blocks_rich_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "projects" ADD COLUMN "tagline" varchar;
  ALTER TABLE "projects" ADD COLUMN "summary" varchar;
  ALTER TABLE "projects" ADD COLUMN "role" varchar;
  ALTER TABLE "projects" ADD COLUMN "platform" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "projects" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_projects_v_version_links" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_text_columns_columns" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_text_columns_columns" ADD COLUMN "heading" varchar;
  ALTER TABLE "_projects_v_blocks_text_columns_columns" ADD COLUMN "body" jsonb;
  ALTER TABLE "_projects_v_blocks_feature_grid_items" ADD COLUMN "title" varchar;
  ALTER TABLE "_projects_v_blocks_feature_grid_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_projects_v_blocks_feature_grid" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_challenges_items" ADD COLUMN "title" varchar;
  ALTER TABLE "_projects_v_blocks_challenges_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_projects_v_blocks_challenges" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_challenges" ADD COLUMN "heading" varchar;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "_projects_v_blocks_gallery" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_metrics_items" ADD COLUMN "value" varchar;
  ALTER TABLE "_projects_v_blocks_metrics_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_projects_v_blocks_metrics" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD COLUMN "label" varchar;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD COLUMN "heading" varchar;
  ALTER TABLE "_projects_v_blocks_rich_text" ADD COLUMN "content" jsonb;
  ALTER TABLE "_projects_v" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_role" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_platform" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "technologies" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "experiences_responsibilities" ADD COLUMN "text" varchar;
  ALTER TABLE "experiences_results" ADD COLUMN "text" varchar;
  ALTER TABLE "experiences" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "experiences" ADD COLUMN "summary" varchar;
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "profile_stats" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "profile_stats" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "profile_facts" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "profile_facts" ADD COLUMN "detail" varchar;
  ALTER TABLE "profile" ADD COLUMN "role" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "headline" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "intro" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "location" varchar;
  ALTER TABLE "profile" ADD COLUMN "resume_id" integer;
  ALTER TABLE "profile" ADD COLUMN "about_heading" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "about_body" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "projects_heading" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "experience_heading" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "stack_heading" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "stack_intro" varchar;
  ALTER TABLE "profile" ADD COLUMN "contact_heading" varchar NOT NULL;
  ALTER TABLE "profile" ADD COLUMN "availability_text" varchar;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "technologies_name_idx" ON "technologies" USING btree ("name");
  CREATE INDEX "profile_resume_idx" ON "profile" USING btree ("resume_id");
  ALTER TABLE "_projects_v" DROP COLUMN "snapshot";
  ALTER TABLE "_projects_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__projects_v_published_locale";`)
}
