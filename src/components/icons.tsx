import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function SoundCloudIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M17.7 8.3c-.3-2.4-2.4-4.2-4.8-4.2-1.6 0-3 .8-3.9 2-.4-.2-.8-.3-1.3-.3-1.7 0-3.1 1.4-3.1 3.1 0 .2 0 .4.1.6C3.3 9.9 2 11.4 2 13.2 2 15.3 3.7 17 5.8 17h11.5c2.6 0 4.7-2.1 4.7-4.7 0-2.4-1.8-4.4-4.3-4zM6.2 15.2c-.3 0-.5-.2-.5-.5v-3.1c0-.3.2-.5.5-.5s.5.2.5.5v3.1c0 .3-.2.5-.5.5zm2 0c-.3 0-.5-.2-.5-.5V9.4c0-.3.2-.5.5-.5s.5.2.5.5v5.3c0 .3-.2.5-.5.5zm2 0c-.3 0-.5-.2-.5-.5V8.7c0-.3.2-.5.5-.5s.5.2.5.5v6c0 .3-.2.5-.5.5zm2 0c-.3 0-.5-.2-.5-.5V8.3c0-.3.2-.5.5-.5s.5.2.5.5v6.4c0 .3-.2.5-.5.5zm2 0c-.3 0-.5-.2-.5-.5v-6c0-.3.2-.5.5-.5s.5.2.5.5v6c0 .3-.2.5-.5.5zm2 0c-.3 0-.5-.2-.5-.5v-5.2c0-.3.2-.5.5-.5s.5.2.5.5v5.2c0 .3-.2.5-.5.5z" />
    </svg>
  );
}
