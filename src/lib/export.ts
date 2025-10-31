import { LogoConfig } from "@/types/logo";

// SVG logos content (embedded directly)
const METRO_SVG = `<g clip-path="url(#clip-metro)"><path d="M80.0001 154.93C121.383 154.93 154.93 121.382 154.93 80C154.93 38.6175 121.383 5.07043 80.0001 5.07043C38.6177 5.07043 5.07056 38.6175 5.07056 80C5.07056 121.382 38.6177 154.93 80.0001 154.93Z" stroke="white" stroke-width="10.1408"/><path d="M119.578 115.577V45.9155C119.578 41.9211 117.38 37.7296 110.789 37.7296C105.803 37.7296 103.803 39.9267 101.611 44.3155L80.0508 89.2338H79.8536L58.0902 44.3155C55.893 39.9267 53.8987 37.7465 48.9071 37.7465C42.3212 37.7465 40.124 41.9211 40.124 45.9155V115.577C40.124 119.375 43.1212 121.572 46.7156 121.572C49.9043 121.572 53.4761 119.375 53.4761 115.577V63.6619H53.679L73.4649 104C74.8564 106.817 76.6592 108.394 79.8536 108.394C83.048 108.394 84.8395 106.794 86.2367 104L106 63.6619H106.203V115.561C106.203 119.358 109.792 121.555 112.992 121.555C116.58 121.555 119.578 119.358 119.578 115.561" fill="white"/></g><defs><clipPath id="clip-metro"><rect width="160" height="160" fill="white"/></clipPath></defs>`;

const TRAMWAY_SVG = `<g clip-path="url(#clip-tram)"><path d="M117.4 48.4C117.4 51.2 115.4 54.6 111.8 54.6H87.4001V120.2C87.4001 123.8 83.8 125.8 80 125.8C76.6 125.8 72.8001 123.8 72.8001 120.2V54.6H48.4001C44.8001 54.6 42.8 51.2 42.8 48.4C42.8 45.2 44.8001 42.2 48.4001 42.2H111.8C115.4 42.2 117.4 45.2 117.4 48.4Z" fill="white"/><path d="M79.8 0C35.6 0 0 35.8 0 80.2C0 124.4 35.6 160 79.8 160C124.2 160 160 124.4 160 80.2C160 35.8 124.2 0 79.8 0ZM79.8 148.2C42.2 148.2 11.8 117.8 11.8 80.2C11.8 42.4 42.2 11.8 79.8 11.8C117.6 11.8 148.2 42.4 148.2 80.2C148.2 117.8 117.6 148.2 79.8 148.2Z" fill="white"/></g><defs><clipPath id="clip-tram"><rect width="160" height="160" fill="white"/></clipPath></defs>`;

const RER_SVG = `<g clip-path="url(#clip-rer)"><path d="M80.2 0C36 0 0 36 0 80.4C0 124.2 36 160 80.2 160C124.4 160 160 124.6 160 80.4C160 36 122.8 0 80.2 0ZM80.2 149C42.2 149 11 118.2 11 80.4C11 42.2 42.2 10.8 80.2 10.8C118 10.8 149 42.4 149 80.4C149 118 118 149 80.2 149Z" fill="white"/><path d="M127.8 83C133 80.4 137.4 75.8 137.4 67.6C137.4 56.8 129.4 51.8 121.6 51.8H106.6C103.8 51.8 102.2 54 102.2 56.4V103.4C102.2 106.2 105 107.6 107.6 107.6C110.6 107.6 113 106.2 113 103.4V85.2H117.6L126.6 105.4C127.4 107 128.8 107.6 130.4 107.6C133.6 107.6 138.2 104.6 136.4 101L127.8 83ZM116.2 77.2H113V61H116.8C121.8 61 126.2 63.2 126.2 68.8C126.2 75.6 120 77.2 116.2 77.2Z" fill="white"/><path d="M96.7999 102.4C96.7999 104.6 95.1999 107.4 92.3999 107.4H71.7999C69.1999 107.4 66.3999 106 66.3999 103.2V56.4C66.3999 54 67.9999 51.8 70.7999 51.8H91.1999C93.9999 51.8 95.5999 54.4 95.5999 56.8C95.5999 59 93.9999 61.8 91.1999 61.8H77.1999V74.4H89.7999C92.5999 74.4 94.1999 76.6 94.1999 79C94.1999 81.2 92.5999 83.6 89.7999 83.6H77.1999V97.4H92.3999C95.1999 97.4 96.7999 100 96.7999 102.4Z" fill="white"/><path d="M50.4001 83C55.6001 80.4 60 75.8 60 67.6C60 56.8 52.0001 51.8 44.2001 51.8H29.2001C26.4001 51.8 24.8 54 24.8 56.4V103.4C24.8 106.2 27.6001 107.6 30.2001 107.6C33.2001 107.6 35.6 106.2 35.6 103.4V85.2H40.2001L49.2001 105.4C50.0001 107 51.4 107.6 53 107.6C56.2 107.6 60.8 104.6 59 101L50.4001 83ZM38.8 77.2H35.6V61H39.4001C44.4001 61 48.8 63.2 48.8 68.8C48.8 75.6 42.6 77.2 38.8 77.2Z" fill="white"/></g><defs><clipPath id="clip-rer"><rect width="160" height="160" fill="white"/></clipPath></defs>`;

/**
 * Process direction text to replace Métro, Tram, RER with SVG logos
 */
function processDirectionTextForSVG(
  text: string,
  fontSize: number,
  yPosition: number,
  currentX: number
): { svg: string; width: number } {
  const parts: Array<{ type: "text" | "logo"; content: string }> = [];

  // Parse the text and identify logos
  const regex = /\b(Métro|Metro|Tram|Tramway|RER)\b/gi;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    // Add the logo
    const word = match[0].toLowerCase();
    if (word === "métro" || word === "metro") {
      parts.push({ type: "logo", content: "metro" });
    } else if (word === "tram" || word === "tramway") {
      parts.push({ type: "logo", content: "tramway" });
    } else if (word === "rer") {
      parts.push({ type: "logo", content: "rer" });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.substring(lastIndex) });
  }

  // If no logos found, return simple text
  if (parts.every((p) => p.type === "text")) {
    return { svg: "", width: 0 };
  }

  // Generate SVG with mixed text and logos
  let svgParts = "";
  let x = currentX;
  const logoSize = fontSize * 6; // Increased to 6 for much better visibility

  parts.forEach((part) => {
    if (part.type === "text" && part.content.trim()) {
      svgParts += `<text x="${x}" y="${yPosition}" text-anchor="start" dominant-baseline="middle" fill="white" font-family="Parisine, Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${part.content}</text>`;
      // Rough estimate of text width
      x += part.content.length * fontSize * 0.6;
    } else if (part.type === "logo") {
      const logoSvg =
        part.content === "metro"
          ? METRO_SVG
          : part.content === "tramway"
          ? TRAMWAY_SVG
          : RER_SVG;
      svgParts += `<svg x="${x}" y="${
        yPosition - logoSize / 2
      }" width="${logoSize}" height="${logoSize}" viewBox="0 0 160 160">${logoSvg}</svg>`;
      x += logoSize + 4;
    }
  });

  return { svg: svgParts, width: x - currentX };
}

/**
 * Generate SVG string from logo configuration
 */
export function generateLogoSVG(
  config: LogoConfig,
  ratpSvgContent?: string | null
): string {
  const size = config.size;
  const topHeight = size * 0.6;
  const bottomHeight = size * 0.4;

  const lineColor =
    config.mode === "custom"
      ? config.customLineColor || "#000000"
      : config.lineColor || "#000000";

  const textColor =
    config.mode === "custom"
      ? config.customTextColor || "#FFFFFF"
      : config.textColor || "#FFFFFF";

  const directionBgColor =
    config.mode === "custom"
      ? config.customDirectionBgColor || "#221F20"
      : "#221F20";

  const directionTextColor =
    config.mode === "custom"
      ? config.customDirectionTextColor || "#FFFFFF"
      : "#FFFFFF";

  const lineNumber =
    config.mode === "custom"
      ? config.customNumber || "00"
      : config.lineNumber || "00";

  const directionTextOriginal = config.direction || "Toutes directions";
  const fontSize = size * 0.04;

  // Process direction text with logos (for RATP SVG case)
  const directionWithLogosRatp = processDirectionTextForSVG(
    directionTextOriginal,
    fontSize,
    topHeight + bottomHeight / 2,
    size / 2 - 200 // Start position for left-aligned text
  );

  // Process direction text with logos (for fallback case)
  const directionWithLogosFallback = processDirectionTextForSVG(
    directionTextOriginal,
    fontSize,
    topHeight + bottomHeight / 2,
    size / 2 - 200
  );

  // If using RATP SVG
  if (config.useRatpSvg && ratpSvgContent) {
    // Extract inner content of SVG (remove svg tags)
    const svgMatch = ratpSvgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
    const innerSvg = svgMatch ? svgMatch[1] : ratpSvgContent;

    return `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <!-- Top section: RATP SVG -->
        <svg x="0" y="0" width="${size}" height="${topHeight}" viewBox="0 0 ${size} ${topHeight}">
          ${innerSvg}
        </svg>
        
        <!-- Bottom section: Direction -->
        <rect x="0" y="${topHeight}" width="${size}" height="${bottomHeight}" fill="${directionBgColor}" />
        ${
          directionWithLogosRatp.svg ||
          `<text x="${size / 2}" y="${
            topHeight + bottomHeight / 2
          }" text-anchor="middle" dominant-baseline="middle" fill="${directionTextColor}" font-family="Parisine, Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${directionTextOriginal}</text>`
        }
      </svg>
    `.trim();
  }

  // Fallback: generated logo
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Top section: Line number -->
      <rect x="0" y="0" width="${size}" height="${topHeight}" fill="${lineColor}" />
      <text
        x="${size / 2}"
        y="${topHeight / 2}"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="${textColor}"
        font-family="Parisine, Arial, sans-serif"
        font-size="${size * 0.25}"
        font-weight="bold"
      >${lineNumber}</text>
      
      <!-- Bottom section: Direction -->
      <rect x="0" y="${topHeight}" width="${size}" height="${bottomHeight}" fill="${directionBgColor}" />
      ${
        directionWithLogosFallback.svg ||
        `<text x="${size / 2}" y="${
          topHeight + bottomHeight / 2
        }" text-anchor="middle" dominant-baseline="middle" fill="${directionTextColor}" font-family="Parisine, Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${directionTextOriginal}</text>`
      }
    </svg>
  `.trim();
}

/**
 * Download SVG as file
 */
export function downloadSVG(
  svgString: string,
  filename: string = "logo-bus-ratp.svg"
) {
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Convert SVG to PNG and download
 */
export async function downloadPNG(
  svgString: string,
  size: number,
  filename: string = "logo-bus-ratp.png"
) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
          resolve();
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, "image/png");
    };

    img.onerror = () => reject(new Error("Failed to load image"));

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.src = url;
  });
}

/**
 * Convert SVG to JPG and download
 */
export async function downloadJPG(
  svgString: string,
  size: number,
  quality: number = 0.95,
  filename: string = "logo-bus-ratp.jpg"
) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    img.onload = () => {
      // Fill white background for JPG
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
            resolve();
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.src = url;
  });
}

/**
 * Export using html2canvas to capture the rendered preview
 */
export async function downloadWithHtml2Canvas(
  element: HTMLElement,
  format: "png" | "jpg" = "png",
  filename?: string
) {
  const html2canvas = (await import("html2canvas-pro")).default;

  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;

  console.log(clone);

  // Apply computed styles inline to avoid CSS variable issues
  const applyInlineStyles = (original: Element, cloned: Element) => {
    const computedStyle = window.getComputedStyle(original);
    const clonedElement = cloned as HTMLElement;

    // Copy all computed styles
    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      const value = computedStyle.getPropertyValue(prop);

      // Skip properties with lab/oklch functions
      if (value && !value.includes("lab(") && !value.includes("oklch(")) {
        clonedElement.style.setProperty(prop, value);
      }
    }

    // Recursively apply to children
    const originalChildren = original.children;
    const clonedChildren = cloned.children;
    for (let i = 0; i < originalChildren.length; i++) {
      applyInlineStyles(originalChildren[i], clonedChildren[i]);
    }
  };

  applyInlineStyles(element, clone);

  // Temporarily add clone to document for rendering
  clone.style.position = "absolute";
  clone.style.left = "-9999px";
  clone.style.top = "-9999px";
  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, {
      backgroundColor: "#f3f4f6",
      scale: 5,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    return new Promise<void>((resolve, reject) => {
      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const defaultFilename = filename || `logo-bus-ratp-preview.${format}`;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = defaultFilename;
            link.click();
            URL.revokeObjectURL(url);
            resolve();
          } else {
            reject(new Error("Failed to create blob from canvas"));
          }
        },
        mimeType,
        format === "jpg" ? 0.95 : undefined
      );
    });
  } finally {
    // Clean up: remove clone from document
    document.body.removeChild(clone);
  }
}
