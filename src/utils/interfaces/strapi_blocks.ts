/**
 * Strapi v5 Blocks Editor Types
 * Type definitions for the new Blocks editor format
 */

// Base block interface
export interface StrapiBlock {
  type: string;
  children?: StrapiBlockChild[];
  level?: number;
  format?: "ordered" | "unordered";
  image?: {
    name: string;
    alternativeText?: string;
    url: string;
    caption?: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Block child (text nodes)
export interface StrapiBlockChild {
  type: "text" | "link";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiBlockChild[];
}

// Specific block types
export interface StrapiParagraphBlock extends StrapiBlock {
  type: "paragraph";
  children: StrapiBlockChild[];
}

export interface StrapiHeadingBlock extends StrapiBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiBlockChild[];
}

export interface StrapiListBlock extends StrapiBlock {
  type: "list";
  format: "ordered" | "unordered";
  children: StrapiBlockChild[];
}

export interface StrapiQuoteBlock extends StrapiBlock {
  type: "quote";
  children: StrapiBlockChild[];
}

export interface StrapiCodeBlock extends StrapiBlock {
  type: "code";
  children: StrapiBlockChild[];
}

export interface StrapiImageBlock extends StrapiBlock {
  type: "image";
  image: {
    name: string;
    alternativeText?: string;
    url: string;
    caption?: string;
    width: number;
    height: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl?: string;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Union type for all block types
export type StrapiBlockContent =
  | StrapiParagraphBlock
  | StrapiHeadingBlock
  | StrapiListBlock
  | StrapiQuoteBlock
  | StrapiCodeBlock
  | StrapiImageBlock
  | StrapiBlock;

// Rich text content is an array of blocks
export type StrapiRichTextBlocks = StrapiBlockContent[];

// For legacy Markdown/HTML rich text
export type StrapiRichTextString = string;

// Union type to support both formats
export type StrapiRichText = StrapiRichTextBlocks | StrapiRichTextString | null;
