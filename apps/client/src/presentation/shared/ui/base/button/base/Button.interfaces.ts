import type { LinkProps } from "react-router";
import type { TBtnProps } from "@/presentation/shared/types";

export interface IButtonProps extends TBtnProps {
  variant?: "primary" | "outline";
}

export interface IButtonLinkProps extends LinkProps {
  variant?: "primary" | "outline";
}
