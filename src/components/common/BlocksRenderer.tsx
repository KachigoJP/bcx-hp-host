import React from "react";
import {
  StrapiRichText,
  StrapiBlockContent,
  StrapiBlockChild,
} from "@/utils/interfaces/strapi_blocks";
import { getStrapiImageUrl } from "@/utils/apps";

interface BlocksRendererProps {
  content: StrapiRichText;
  className?: string;
}

/**
 * Renders a text child node with formatting (bold, italic, etc.)
 */
const TextNode: React.FC<{ node: StrapiBlockChild }> = ({ node }) => {
  if (node.type === "link") {
    return (
      <a href={node.url} target="_blank" rel="noopener noreferrer">
        {node.children?.map((child, idx) => (
          <TextNode key={idx} node={child} />
        ))}
      </a>
    );
  }

  if (node.type === "list-item") {
    return node.children?.map((child, idx) => (
      <TextNode key={idx} node={child} />
    ));
  }

  if (!node.text) return null;

  let text: React.ReactNode = node.text;

  if (node.bold) text = <strong>{text}</strong>;
  if (node.italic) text = <em>{text}</em>;
  if (node.underline) text = <u>{text}</u>;
  if (node.strikethrough) text = <s>{text}</s>;
  if (node.code) text = <code>{text}</code>;

  return <>{text}</>;
};

/**
 * Renders a single block (paragraph, heading, list, etc.)
 */
const BlockNode: React.FC<{ block: StrapiBlockContent; index: number }> = ({
  block,
  index,
}) => {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index}>
          {block.children?.map((child, idx) => (
            <TextNode key={idx} node={child} />
          ))}
        </p>
      );

    case "heading":
      const HeadingTag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
      return (
        <HeadingTag key={index}>
          {block.children?.map((child, idx) => (
            <TextNode key={idx} node={child} />
          ))}
        </HeadingTag>
      );

    case "list":
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag key={index}>
          {block.children?.map((child, idx) => (
            <li key={idx}>
              <TextNode node={child} />
            </li>
          ))}
        </ListTag>
      );

    case "quote":
      return (
        <blockquote key={index}>
          {block.children?.map((child, idx) => (
            <TextNode key={idx} node={child} />
          ))}
        </blockquote>
      );

    case "code":
      return (
        <pre key={index}>
          <code>
            {block.children?.map((child, idx) => (
              <TextNode key={idx} node={child} />
            ))}
          </code>
        </pre>
      );

    case "image":
      if (!block.image) return null;
      return (
        <figure key={index}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getStrapiImageUrl(block.image.url)}
            alt={block.image.alternativeText || ""}
            width={block.image.width}
            height={block.image.height}
          />
          {block.image.caption && (
            <figcaption>{block.image.caption}</figcaption>
          )}
        </figure>
      );

    default:
      console.warn("Unknown block type:", block.type);
      return null;
  }
};

/**
 * Main component to render Strapi Blocks editor content
 * Supports both new Blocks format (array) and legacy string format
 */
export const BlocksRenderer: React.FC<BlocksRendererProps> = ({
  content,
  className = "rich-text-content",
}) => {
  if (!content) {
    return null;
  }

  // Handle legacy string format (HTML or Markdown)
  if (typeof content === "string") {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Handle new Blocks format (array of block objects)
  if (Array.isArray(content)) {
    return (
      <div className={className}>
        {content.map((block, index) => (
          <BlockNode key={index} block={block} index={index} />
        ))}
      </div>
    );
  }

  return null;
};
