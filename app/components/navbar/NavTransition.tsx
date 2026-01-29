"use client";
import Link, { LinkProps } from "next/link";
import React from "react";

interface NavTransitionProps extends LinkProps {
  children: React.ReactNode;
  className: string;
  href: string;
}

export const NavTransition: React.FC<NavTransitionProps> = ({
  children,
  href,
  className,
  ...props
}) => {
  return (
    <Link
      {...props}
      href={href}
      className={className}
    >
      {children}
    </Link>
  );
};
