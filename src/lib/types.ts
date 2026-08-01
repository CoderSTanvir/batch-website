export type Student = {
  id: string;
  name: string;
  role: string;
  phone: string | null;
  email: string | null;
  achievements: string | null;
  photo_url: string | null;
  faculty: string | null;
  department: string | null;
  program: string | null;
  session: string | null;
  student_id: string | null;
  school: string | null;
  college: string | null;
  present_address: string | null;
  hometown: string | null;
  category: "cr" | "co_cr" | "student";
  display_order: number;
};

export type Alumnus = {
  id: string;
  name: string;
  role: string | null;
  phone: string | null;
  email: string | null;
  achievements: string | null;
  photo_url: string | null;
  display_order: number;
};

export type Achievement = {
  id: string;
  title: string;
  description: string | null;
  student_name: string | null;
  date: string | null;
};

export type Journal = {
  id: string;
  title: string;
  author_name: string | null;
  author_photo_url: string | null;
  date: string | null;
  excerpt: string | null;
  content: string | null;
};
