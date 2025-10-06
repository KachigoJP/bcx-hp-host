import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: number;
}

export const OptimizedImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  style = { width: "100%", height: "auto" },
  priority = false,
  quality = 75,
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      quality={quality}
    />
  );
};

// Preset configurations for common image types
export const ImagePresets = {
  logo: {
    width: 178,
    height: 55,
    style: { width: "auto", height: "auto" },
  },
  project: {
    width: 400,
    height: 300,
    style: { width: "100%", height: "auto" },
  },
  team: {
    width: 300,
    height: 300,
    style: { width: "100%", height: "auto" },
  },
  hero: {
    width: 600,
    height: 400,
    style: { width: "100%", height: "auto" },
  },
  error: {
    width: 400,
    height: 300,
    style: { width: "100%", height: "auto" },
  },
};
