/**
 * Team page related interfaces and types
 */

import { StrapiImage } from "./strapi_types";

export interface TeamMember {
  name: string;
  title: string;
  image: string | StrapiImage;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface TeamIntro {
  tag: string;
  title: string;
  description: string;
}

export interface TeamValue {
  icon: string;
  title: string;
  description: string;
}

export interface TeamJoinSection {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface TeamContent {
  teamIntro: TeamIntro;
  teamMembers: TeamMember[];
  teamJoinSection: TeamJoinSection;
  teamValues: TeamValue[];
}
