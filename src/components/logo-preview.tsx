import { LogoConfig } from "@/types/logo";
import { forwardRef } from "react";

interface LogoPreviewProps {
  config: LogoConfig;
  ratpSvgContent?: string | null;
}

export const LogoPreview = forwardRef<HTMLDivElement, LogoPreviewProps>(
  function LogoPreview({ config, ratpSvgContent }, ref) {
    const size = 300; // Fixed preview size at 300x300px
    const topHeight = size * 0.6; // 60% for top section
    const bottomHeight = size * 0.4; // 40% for bottom section

    // Determine colors based on mode
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

    // Process direction text to replace Métro, Tram, RER with logos
    // Also preserve newlines from textarea by converting to <br/>
    const processDirectionText = (text: string) => {
      let processedText = text || "";

      // Calculate logo size based on preview size
      const logoSize = Math.round(size * 0.1); // slightly larger for preview

      // Replace mode words with <img> tags referencing /public/logos
      processedText = processedText.replace(
        /\b(Métro|Metro)\b/gi,
        `<img src="/logos/metro.svg" alt="Métro" style="display:inline-block;height:${logoSize}px;width:${logoSize}px;vertical-align:middle;margin:0 0px;"/>`
      );
      processedText = processedText.replace(
        /\b(Tram|Tramway)\b/gi,
        `<img src="/logos/tramway.svg" alt="Tram" style="display:inline-block;height:${logoSize}px;width:${logoSize}px;vertical-align:middle;margin:0 0px;"/>`
      );
      processedText = processedText.replace(
        /\bRER\b/gi,
        `<img src="/logos/rer.svg" alt="RER" style="display:inline-block;height:${logoSize}px;width:${logoSize}px;vertical-align:middle;margin:0 0px;"/>`
      );

      // Convert newline characters to <br/> so multi-line textarea displays correctly
      processedText = processedText.replace(/\r?\n/g, "<br/>");

      return processedText;
    };

    const directionText = config.direction || "Toutes directions";
    const processedDirectionText = processDirectionText(directionText);

    // If using RATP SVG and it's available
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100">
        <div
          className="relative bg-white shadow-lg"
          style={{ width: size, height: size }}
          ref={ref}
        >
          {config.useRatpSvg && ratpSvgContent ? (
            <>
              {/* Top section: RATP SVG */}
              <div
                className="relative overflow-hidden flex items-center justify-center"
                style={{ height: "auto" }}
              >
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: ratpSvgContent }}
                />
              </div>

              {/* Bottom section: Direction */}
              <div
                className="flex justify-start p-5"
                style={{
                  height: bottomHeight,
                  backgroundColor: directionBgColor,
                  color: directionTextColor,
                }}
              >
                <div className="w-full">
                  <p
                    className="text-left font-bold leading-9 w-full"
                    style={{
                      fontSize: `${size * 0.09}px`,
                      fontFamily: "Parisine, Arial, sans-serif",
                    }}
                    dangerouslySetInnerHTML={{ __html: processedDirectionText }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex items-center justify-center"
                style={{
                  height: topHeight,
                  backgroundColor: lineColor,
                  color: textColor,
                }}
              >
                <span
                  className="font-bold"
                  style={{
                    fontSize: `${size * 0.25}px`,
                    fontFamily: "Parisine, Arial, sans-serif",
                  }}
                >
                  {lineNumber}
                </span>
              </div>

              {/* Bottom section: Direction */}
              <div
                className="flex justify-start p-5"
                style={{
                  height: bottomHeight,
                  backgroundColor: directionBgColor,
                  color: directionTextColor,
                }}
              >
                <div className="w-full">
                  <p
                    className="text-left font-bold leading-9 w-full"
                    style={{
                      fontSize: `${size * 0.09}px`,
                      fontFamily: "Parisine, Arial, sans-serif",
                    }}
                    dangerouslySetInnerHTML={{ __html: processedDirectionText }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);
