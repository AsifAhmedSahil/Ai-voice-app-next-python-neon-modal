'use client'
import { usePathname } from "next/navigation";
import React from "react";
import { BreadcrumbPage } from "../ui/breadcrumb";

const BreadcrumbPageClient = () => {
  const path = usePathname();
  const getPageTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/create":
        return "Create";
      case "/dashboard/projects":
        return "Projects";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };
  return (
    <BreadcrumbPage className="text-foreground text-sm font-medium">
      {getPageTitle(path)}
    </BreadcrumbPage>
  );
};

export default BreadcrumbPageClient;
