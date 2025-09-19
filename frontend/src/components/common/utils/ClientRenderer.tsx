"use client";
import type { ComponentType, ReactElement } from "react";

type ClientRendererProps<P extends object> = {
  Component: ComponentType<P>;
  props: P;
};

export default function ClientRenderer<P extends object>({
  Component,
  props,
}: ClientRendererProps<P>): ReactElement {
  return <Component {...props} />;
}
