export interface ISetting {
  id: string;
  key: string;
  value: string;
  type: string;
  image: any | null;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  provider: string;
}

export interface IService {
  id: string;
  key: string;
  title: string;
  sub_title: string;
  image: any | null;
  content: string;
  tag: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  provider: string;
}

export interface ITestimonial {
  id: string;
  person_name: string;
  person_title: string;
  person_photo: any | null;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  provider: string;
}
