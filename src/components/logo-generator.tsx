"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { BusLine, BusStop, IDFMLineRecord } from "@/types/idfm";
import { LogoConfig } from "@/types/logo";
import { LogoConfigForm } from "@/components/logo-config-form";
import { LogoPreview } from "@/components/logo-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import {
  generateLogoSVG,
  downloadSVG,
  downloadPNG,
  downloadJPG,
  downloadWithHtml2Canvas,
} from "@/lib/export";

const LINES_URL =
  "https://data.iledefrance-mobilites.fr/api/explore/v2.1/catalog/datasets/referentiel-des-lignes/exports/json?lang=fr&timezone=Europe%2FBerlin";

export function LogoGenerator() {
  const previewRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<LogoConfig>({
    mode: "preset",
    direction: "Toutes directions",
    size: 1024,
    useRatpSvg: true,
  });

  const [lines, setLines] = useState<BusLine[]>([]);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [ratpSvgContent, setRatpSvgContent] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoadingLines, setIsLoadingLines] = useState(true);
  const [isLoadingStops, setIsLoadingStops] = useState(false);

  // Fetch bus lines on mount
  useEffect(() => {
    const fetchLines = async () => {
      try {
        setIsLoadingLines(true);
        const response = await fetch(LINES_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch lines");
        }
        const data = await response.json();
        const records: IDFMLineRecord[] = Array.isArray(data)
          ? data
          : data.records || [];
        console.log(records);
        // Filter only bus lines
        const busLines: BusLine[] = records
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((record) => {
            const mode = record?.transportmode?.toLowerCase();
            return mode === "bus";
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((record) => ({
            id: record.id_line,
            number: record.shortname_line || record.name_line,
            name: record.shortname_groupoflines,
            color: record.colourweb_hexa
              ? `#${record.colourweb_hexa}`
              : "#000000",
            textColor: record.textcolourweb_hexa
              ? `#${record.textcolourweb_hexa}`
              : "#FFFFFF",
            operator: record.operatorname,
          }))
          .sort((a: BusLine, b: BusLine) => {
            const numA = parseInt(a.number, 10);
            const numB = parseInt(b.number, 10);
            if (!isNaN(numA) && !isNaN(numB)) {
              return numA - numB;
            }
            return a.number.localeCompare(b.number);
          });

        console.log("Fetched bus lines:", busLines.length);
        setLines(busLines);
      } catch (error) {
        console.error("Error fetching bus lines:", error);
      } finally {
        setIsLoadingLines(false);
      }
    };

    fetchLines();
  }, []);

  const handleConfigChange = useCallback((newConfig: LogoConfig) => {
    setConfig(newConfig);

    // Fetch RATP SVG if needed
    if (
      newConfig.useRatpSvg &&
      newConfig.lineId &&
      newConfig.mode === "preset"
    ) {
      fetch(
        `https://corsproxy.io/?url=https://cachesync.prod.bonjour-ratp.fr/pictograms/svg/LIG:IDFM:${newConfig.lineId}.svg`
      )
        .then((res) => (res.ok ? res.text() : null))
        .then((svg) => setRatpSvgContent(svg))
        .catch(() => setRatpSvgContent(null));
    } else {
      setRatpSvgContent(null);
    }
  }, []);

  const handleStopsNeeded = useCallback(async (lineId: string) => {
    try {
      setIsLoadingStops(true);

      // Use WFS API to get stops for the specific line
      const wfsUrl = `https://api-iv.iledefrance-mobilites.fr/map/server/services/wms?service=WFS&request=GetFeature&version=2.0.0&srsName=EPSG:4326&outputFormat=application/json&typeNames=vianavigo:bus_stations&cql_filter=lineId = 'line:IDFM:${lineId}'`;

      const response = await fetch(wfsUrl, {
        headers: {
          apiKey: 'vNcCf2jKkRtDywAcrARI2Mspn8OAXuFx'
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stops from WFS API");
      }

      const data = await response.json();

      // Debug: log the API response structure
      console.log("WFS API Response:", data);

      // Parse GeoJSON response
      const features = data.features || [];

      if (features.length === 0) {
        console.log("No features found for line:", lineId);
        setStops([]);
        return;
      }

      // The stops are in the properties, we need to parse them
      // Assuming stops are in a specific format - adjust based on actual API response

      const parsedStops: BusStop[] = features
        .map((stop: unknown) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { properties } = stop as any;
          return {
            id: (properties.id || properties.stop_id) as string,
            name: (properties.name || properties.stop_name) as string,
            lineId: lineId,
          };
        })
        .filter(
          (stop: BusStop, index: number, self: BusStop[]) =>
            index === self.findIndex((s) => s.name === stop.name)
        )
        .sort((a: BusStop, b: BusStop) => a.name.localeCompare(b.name));

      console.log("Parsed stops:", parsedStops);
      setStops(parsedStops);
    } catch (error) {
      console.error("Error fetching stops:", error);
      setStops([]);
    } finally {
      setIsLoadingStops(false);
    }
  }, []);

  const handleExport = async (format: "svg" | "png" | "jpg") => {
    setIsExporting(true);
    try {
      const svg = generateLogoSVG(config, ratpSvgContent);
      const lineNumber =
        config.mode === "custom" ? config.customNumber : config.lineNumber;
      const filename = `logo-bus-${lineNumber || "ratp"}`;

      switch (format) {
        case "svg":
          downloadSVG(svg, `${filename}.svg`);
          break;
        case "png":
          await downloadPNG(svg, config.size, `${filename}.png`);
          break;
        case "jpg":
          await downloadJPG(svg, config.size, 0.95, `${filename}.jpg`);
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Erreur lors de l'export. Veuillez réessayer.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleHtml2CanvasExport = async (format: "png" | "jpg") => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const lineNumber =
        config.mode === "custom" ? config.customNumber : config.lineNumber;
      const filename = `logo-bus-${lineNumber || "ratp"}-preview.${format}`;

      await downloadWithHtml2Canvas(previewRef.current, format, filename);
    } catch (error) {
      console.error("html2canvas export failed:", error);
      alert("Erreur lors de l'export. Veuillez réessayer.");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoadingLines) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Chargement des lignes de bus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left column: Configuration (40%) */}
      <div className="lg:col-span-2 space-y-4">
        <LogoConfigForm
          lines={lines}
          onConfigChange={handleConfigChange}
          onStopsNeeded={handleStopsNeeded}
          stops={stops}
          isLoadingStops={isLoadingStops}
        />

        {/* Export buttons */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-3">
                  Exporter l&apos;aperçu (avec logos)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleHtml2CanvasExport("png")}
                    disabled={isExporting}
                    variant="default"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PNG
                  </Button>
                  <Button
                    onClick={() => handleHtml2CanvasExport("jpg")}
                    disabled={isExporting}
                    variant="default"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    JPG
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Capture l&apos;aperçu avec les logos Métro/Tram/RER
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right column: Preview (60%) */}
      <div className="lg:col-span-3">
        <Card className="sticky top-8">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4">Aperçu</h3>
            <div className="aspect-square">
              <LogoPreview
                config={config}
                ratpSvgContent={ratpSvgContent}
                ref={previewRef}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
