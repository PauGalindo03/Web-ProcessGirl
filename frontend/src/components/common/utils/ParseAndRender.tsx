import React from "react";

import type { ReactElement } from "react";

export default function parseAndRenderContent(text: string | undefined | null): ReactElement[] {
  if (!text) return [];

  let processedText = text;

  // Markdown-like transformaciones
  processedText = processedText.replace(/__(?![\*_~])([^_*~]+?)__(?![\*_~])/g, "**$1**");
  processedText = processedText.replace(/\*\*(?![\*_~])([^_*~]+?)\*\*(?![\*_~])/g, "**$1**");
  processedText = processedText.replace(/\*(?![\*_~])([^_*~]+?)\*(?![\*_~])/g, "*$1*");
  processedText = processedText.replace(/~~(?![\*_~])([^_*~]+?)~~(?![\*_~])/g, "_$1_");

  // Saltos de párrafo
  const paragraphs = processedText.split("\n\n");

  return paragraphs.map((p, i) => (
    <p key={i}>
      {p.split("\n").map((line, j) => (
        <React.Fragment key={j}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  ));
}
