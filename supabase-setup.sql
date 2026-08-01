-- ============================================================
-- Batch website — full database setup
-- Run this ONCE in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run
-- ============================================================

-- 1) TABLES

create table public.students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default 'Student',
  phone text,
  email text,
  achievements text,
  photo_url text,
  faculty text,
  department text,
  program text,
  session text,
  student_id text,
  school text,
  college text,
  present_address text,
  hometown text,
  category text not null default 'student', -- 'cr' | 'co_cr' | 'student'
  display_order integer default 0,
  created_at timestamptz default now()
);

create table public.alumni (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  phone text,
  email text,
  achievements text,
  photo_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  student_name text,
  date text,
  created_at timestamptz default now()
);

create table public.journals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author_name text,
  author_photo_url text,
  date text,
  excerpt text,
  content text,
  created_at timestamptz default now()
);

-- 2) ROW LEVEL SECURITY
-- Anyone can read (the site is public). Only logged-in admins can write.

alter table public.students enable row level security;
alter table public.alumni enable row level security;
alter table public.achievements enable row level security;
alter table public.journals enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.students, public.alumni, public.achievements, public.journals to anon, authenticated;
grant insert, update, delete on public.students, public.alumni, public.achievements, public.journals to authenticated;

create policy "Public can read students" on public.students for select using (true);
create policy "Admins can write students" on public.students for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read alumni" on public.alumni for select using (true);
create policy "Admins can write alumni" on public.alumni for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read achievements" on public.achievements for select using (true);
create policy "Admins can write achievements" on public.achievements for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public can read journals" on public.journals for select using (true);
create policy "Admins can write journals" on public.journals for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 3) PHOTO STORAGE
-- A public bucket so photos display on the site; only admins can upload/replace/delete.

insert into storage.buckets (id, name, public) values ('photos', 'photos', true);

create policy "Public can view photos" on storage.objects for select
  using (bucket_id = 'photos');

create policy "Admins can upload photos" on storage.objects for insert
  with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Admins can update photos" on storage.objects for update
  using (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Admins can delete photos" on storage.objects for delete
  using (bucket_id = 'photos' and auth.role() = 'authenticated');

-- 4) SEED DATA — your real CR, Co-CR, and 39 students

insert into public.students (name, role, phone, email, achievements, photo_url, faculty, department, program, session, student_id, school, college, present_address, hometown, category, display_order) values
('Rakib Khan', 'Class Representative (CR)', '01672-929769', 'lawkib29@gmail.com', 'Represents Maritime Law 8th Batch to faculty and administration.', '/cr-rakib.jpeg', 'Faculty of Maritime Governance and Policy', 'Department of Maritime Law and Policy', 'LL.B. (Hons) in Maritime Law — Maritime Law 8th Batch', '2025-2026', '26111024', 'Dhaka Public School and College', 'Mohammadpur Preparatory School and College', 'Mohammadpur, Dhaka', 'Dhaka', 'cr', -2),
('Tahira Tasnim', 'Co Class Representative', '01791-641984', 'tahiratasnim79@gmail.com', 'Assists the CR and manages club coordination.', '/cocr-tahira.png', 'Faculty of Maritime Governance and Policy', 'Department of Maritime Law and Policy', 'LL.B. (Hons) in Maritime Law — Maritime Law 8th Batch', '2025-2026', '26111039', 'Barishal Govt Girls High School', 'BM College', NULL, NULL, 'co_cr', -1);

-- Seed: 39 real students (excludes CR/Co-CR, they go in separately below)
insert into public.students (name, role, phone, email, achievements, display_order) values
  ('Mahdin', 'Student', '01637-027782', 'business.mahdinhabib@gmail.com', 'Achievements go here — awards, projects, or activities.', 0),
  ('Wasim', 'Student', '01400-774349', 'sim405swim@gmail.com', 'Achievements go here — awards, projects, or activities.', 1),
  ('Naiem', 'Student', '01521-739935', 'naiemullah1973@gmail.com', 'Achievements go here — awards, projects, or activities.', 2),
  ('Mahjabeen Himi', 'Student', '01319-334555', 'mahjabeenhimi@gmail.com', 'Achievements go here — awards, projects, or activities.', 3),
  ('Md:Mahedi Hasan Naim', 'Student', '01775-387199', 'mahedinaim21@gmail.com', 'Achievements go here — awards, projects, or activities.', 4),
  ('RAGAB ABRAR LABIB', 'Student', '01558-690211', 'ragababrarlabib@gmail.com', 'Achievements go here — awards, projects, or activities.', 5),
  ('Sojib', 'Student', '01315-855103', 'sojibreza31@gmail.com', 'Achievements go here — awards, projects, or activities.', 6),
  ('Tousif Rishat', 'Student', '01763-648041', 'tousifrishat135@gmail.com', 'Achievements go here — awards, projects, or activities.', 7),
  ('Labib', 'Student', '01962-124779', 'shahriarlabib000@gmail.com', 'Achievements go here — awards, projects, or activities.', 8),
  ('Namira', 'Student', '01534-825573', 'nuzhatnamira2006@gmail.com', 'Achievements go here — awards, projects, or activities.', 9),
  ('Sifad', 'Student', '01723-383076', 'itzmhsifad@gmail.com', 'Achievements go here — awards, projects, or activities.', 10),
  ('Ashtha', 'Student', '01511-008639', 'ashtha1612@gmail.com', 'Achievements go here — awards, projects, or activities.', 11),
  ('Tisha', 'Student', '01862-430264', 'humairatish@gmail.com', 'Achievements go here — awards, projects, or activities.', 12),
  ('A.T.M Amirullah Alif', 'Student', '01634-758336', 'atmamirullah_mym@yahoo.com', 'Achievements go here — awards, projects, or activities.', 13),
  ('Robin', 'Student', '01776-166653', 'robinislambd07@gmail.com', 'Achievements go here — awards, projects, or activities.', 14),
  ('Sumayia Soniya', 'Student', '01950-344986', 'sumayiasoniya01@gmail.com', 'Achievements go here — awards, projects, or activities.', 15),
  ('Aniqa Binte Ahsan', 'Student', '01522-105523', 'aniqamanha14@gmail.com', 'Achievements go here — awards, projects, or activities.', 16),
  ('Kusum', 'Student', '01920-700897', 'kusum40964@gmail.com', 'Achievements go here — awards, projects, or activities.', 17),
  ('Laboni', 'Student', '01619-639669', 'laboniislamlima@gmail.com', 'Achievements go here — awards, projects, or activities.', 18),
  ('Redwan', 'Student', '01645-592777', 'khandakerredwan10@gmail.com', 'Achievements go here — awards, projects, or activities.', 19),
  ('Mahathir', 'Student', '01946-721881', 'mahi.mahathirmd@gmail.com', 'Achievements go here — awards, projects, or activities.', 20),
  ('Abhijeet Poddar', 'Student', '01785-881099', 'abhijeetpoddar0323@gmail.com', 'Achievements go here — awards, projects, or activities.', 21),
  ('Juba', 'Student', '01970-693245', 'ummijejubailyislam@gmail.com', 'Achievements go here — awards, projects, or activities.', 22),
  ('Nafeesa Sulatna Naisha', 'Student', '01633-265976', 'nafeesanaisha@gmail.com', 'Achievements go here — awards, projects, or activities.', 23),
  ('Hridita', 'Student', '01349-031230', 'kjahanhridita13@gmail.com', 'Achievements go here — awards, projects, or activities.', 24),
  ('Ahmad', 'Student', '01931-477650', 'ahmadibnedeen@gmail.com', 'Achievements go here — awards, projects, or activities.', 25),
  ('Afia Aysha', 'Student', '01954-160910', 'afiaaaysha111@gmail.com', 'Achievements go here — awards, projects, or activities.', 26),
  ('Saba', 'Student', '01772-559466', 'salma2006saba@gmail.com', 'Achievements go here — awards, projects, or activities.', 27),
  ('Fatima Farzana', 'Student', '01834-394920', 'fatimafarzana274@gmail.com', 'Achievements go here — awards, projects, or activities.', 28),
  ('Sidratul Muntaha', 'Student', '01613-451260', 'sidratul2856@gmail.com', 'Achievements go here — awards, projects, or activities.', 29),
  ('Tushar Roy Pranta', 'Student', '01345-430896', '295trptushar@gmail.com', 'Achievements go here — awards, projects, or activities.', 30),
  ('Fahim', 'Student', '01835-014710', 'fahimsadif@gmail.com', 'Achievements go here — awards, projects, or activities.', 31),
  ('Bithi', 'Student', '01766-782219', 'sraboniakter2224@gmail.com', 'Achievements go here — awards, projects, or activities.', 32),
  ('Orin', 'Student', '01772-073165', 'tasnimorin12@gmail.com', 'Achievements go here — awards, projects, or activities.', 33),
  ('JUMMA', 'Student', '01715-467818', 'mobaratajumma@gmail.com', 'Achievements go here — awards, projects, or activities.', 34),
  ('Niamul', 'Student', '01673-522200', 'niamulnai@gmail.com', 'Achievements go here — awards, projects, or activities.', 35),
  ('Mushfique Alam', 'Student', '01540-327433', 'nazninsultanababy600@gmail.com', 'Achievements go here — awards, projects, or activities.', 36),
  ('Fahin', 'Student', '01821-341364', 'fahinchy2006@gmail.com', 'Achievements go here — awards, projects, or activities.', 37),
  ('Jarif Hassan', 'Student', '01779-960892', 'zarifevan3@gmail.com', 'Achievements go here — awards, projects, or activities.', 38);

-- 5) SEED — sample achievements and journals (edit/delete these from the admin panel later)

insert into public.achievements (title, description, student_name, date) values
('Inter-University Debate — Runners-up', 'Represented the batch in the national maritime affairs debate competition.', 'Rakib Khan', 'March 2026'),
('Maritime Law Moot Court — 2nd Place', 'A team from the batch reached the finals of the regional moot court competition.', 'Batch Team', 'January 2026'),
('Best Research Poster', 'Awarded for a research poster on port governance policy at the university symposium.', 'Nabila Islam', 'December 2025');

insert into public.journals (title, author_name, date, excerpt, content) values
('Reflections on Maritime Governance Policy', 'Rakib Khan', 'April 2026', 'A short reflection on how maritime governance frameworks shape regional trade and security policy.', 'A short reflection on how maritime governance frameworks shape regional trade and security policy.'),
('First Semester Notes: Maritime Law Fundamentals', 'Nabila Islam', 'February 2026', 'Personal notes and takeaways from the introductory maritime law coursework this semester.', 'Personal notes and takeaways from the introductory maritime law coursework this semester.');

-- Done. You should now see 4 new tables and a "photos" bucket in your Supabase dashboard.
