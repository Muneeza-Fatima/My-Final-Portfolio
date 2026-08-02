"use client";

import Image, {
  ImageProps,
} from "next/image";

import { cn } from "@/lib/utils";


interface OptimizedImageProps
  extends ImageProps {
  wrapperClassName?: string;
}


export function OptimizedImage({
  className,
  wrapperClassName,
  alt,
  ...props
}: OptimizedImageProps) {

  return (

    <div
      className={cn(
        "relative overflow-hidden",
        wrapperClassName
      )}
    >

      <Image

        {...props}

        alt={alt}

        className={cn(
          "object-cover",
          className
        )}

        sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        33vw
        "

        quality={85}

        loading={
          props.priority
            ? "eager"
            : "lazy"
        }

      />

    </div>

  );
}