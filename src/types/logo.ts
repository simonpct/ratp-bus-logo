// Types pour la configuration du générateur de logo
export interface LogoConfig {
  // Mode de génération
  mode: "preset" | "custom";

  // Configuration de la ligne (mode preset)
  lineId?: string;
  lineNumber?: string;
  lineColor?: string;
  textColor?: string;

  // Configuration du terminus/direction
  direction: string;

  // Configuration personnalisée (mode custom)
  customNumber?: string;
  customLineColor?: string;
  customTextColor?: string;
  customDirectionBgColor?: string;
  customDirectionTextColor?: string;

  // Options d'export
  size: number;

  // Options de rendu
  useRatpSvg: boolean;
}

export interface ExportOptions {
  format: "png" | "jpg" | "svg";
  quality?: number; // Pour JPG (0-1)
  filename?: string;
}
