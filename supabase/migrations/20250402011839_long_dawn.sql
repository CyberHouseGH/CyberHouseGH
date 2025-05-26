/*
  # Create tables for articles and media

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `author_id` (uuid, references auth.users)
      - `category` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `media`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `url` (text)
      - `thumbnail_url` (text)
      - `type` (text) - 'image' or 'video'
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid REFERENCES auth.users NOT NULL,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text NOT NULL,
  thumbnail_url text,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  author_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Policies for articles
CREATE POLICY "Anyone can read published articles"
  ON articles
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Policies for media
CREATE POLICY "Anyone can view media"
  ON media
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload media"
  ON media
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own media"
  ON media
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);