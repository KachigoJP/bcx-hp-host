/**
 * Login page related interfaces and types
 */

import { ButtonDetail, SectionIntro } from "@/utils/interfaces";

export interface LoginContent {
  pageIntro?: SectionIntro;
  forgotPassword?: ButtonDetail;
  register?: ButtonDetail;
  rememberMeText?: string;
  notAcountText?: string;
  registeringText?: string;
}
