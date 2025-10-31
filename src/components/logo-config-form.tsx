"use client";

import { useState, useEffect } from "react";
import { LogoConfig } from "@/types/logo";
import { BusLine, BusStop } from "@/types/idfm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoConfigFormProps {
  lines: BusLine[];
  onConfigChange: (config: LogoConfig) => void;
  onStopsNeeded: (lineId: string) => void;
  stops: BusStop[];
  isLoadingStops?: boolean;
}

export function LogoConfigForm({
  lines,
  onConfigChange,
  onStopsNeeded,
  stops,
  isLoadingStops = false,
}: LogoConfigFormProps) {
  const [mode, setMode] = useState<"preset" | "custom">("preset");
  const [selectedLineId, setSelectedLineId] = useState<string>("");
  const [selectedStop, setSelectedStop] = useState<string>("");
  const [customDirection, setCustomDirection] =
    useState<string>("Toutes directions");
  const [useRatpSvg, setUseRatpSvg] = useState(true);

  // Custom mode states
  const [customNumber, setCustomNumber] = useState("00");
  const [customLineColor, setCustomLineColor] = useState("#000000");
  const [customTextColor, setCustomTextColor] = useState("#FFFFFF");
  const [customDirectionBgColor, setCustomDirectionBgColor] =
    useState("#221F20");
  const [customDirectionTextColor, setCustomDirectionTextColor] =
    useState("#FFFFFF");

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get selected line details
  const selectedLine = lines.find((line) => line.id === selectedLineId);

  // Filter lines based on search query (minimum 1 character)
  const filteredLines =
    searchQuery.length >= 1
      ? lines.filter((line) => {
          const query = searchQuery.toLowerCase();
          const lineNumber = line.number?.toLowerCase() || "";
          const lineName = line.name?.toLowerCase() || "";
          return lineNumber.includes(query) || lineName.includes(query);
        })
      : [];

  // Update config when any field changes
  useEffect(() => {
    const config: LogoConfig = {
      mode,
      size: 1024,
      direction: customDirection,
      useRatpSvg,
    };

    if (mode === "preset" && selectedLine) {
      config.lineId = selectedLine.id;
      config.lineNumber = selectedLine.number;
      config.lineColor = selectedLine.color;
      config.textColor = selectedLine.textColor;
    } else if (mode === "custom") {
      config.customNumber = customNumber;
      config.customLineColor = customLineColor;
      config.customTextColor = customTextColor;
      config.customDirectionBgColor = customDirectionBgColor;
      config.customDirectionTextColor = customDirectionTextColor;
    }

    onConfigChange(config);
  }, [
    mode,
    selectedLine,
    customDirection,
    useRatpSvg,
    customNumber,
    customLineColor,
    customTextColor,
    customDirectionBgColor,
    customDirectionTextColor,
    onConfigChange,
  ]);

  // When line is selected, fetch stops
  useEffect(() => {
    if (selectedLineId && mode === "preset") {
      onStopsNeeded(selectedLineId);
    }
  }, [selectedLineId, mode, onStopsNeeded]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configuration du logo</CardTitle>
        <CardDescription>
          Choisissez une ligne existante ou créez un logo personnalisé
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode selection */}
        <div className="space-y-2">
          <Label>Mode</Label>
          <Select
            value={mode}
            onValueChange={(value: "preset" | "custom") => setMode(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="preset">Ligne RATP existante</SelectItem>
              <SelectItem value="custom">Logo personnalisé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {mode === "preset" ? (
          <>
            {/* Line selection - Combobox */}
            <div className="space-y-2">
              <Label>Ligne de bus</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {selectedLineId
                      ? lines.find((line) => line.id === selectedLineId)?.number
                      : "Sélectionner une ligne..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command shouldFilter={false}>
                    <CommandInput
                      placeholder="Tapez un numéro ou un nom..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      {searchQuery.length === 0 ? (
                        <CommandEmpty>
                          Tapez au moins 1 caractère pour rechercher...
                        </CommandEmpty>
                      ) : filteredLines.length === 0 ? (
                        <CommandEmpty>Aucune ligne trouvée.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {filteredLines.map((line) => (
                            <CommandItem
                              key={line.id}
                              value={line.id}
                              onSelect={() => {
                                setSelectedLineId(line.id);
                                setSelectedStop("");
                                setSearchQuery("");
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedLineId === line.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                                  style={{
                                    backgroundColor: line.color,
                                    color: line.textColor,
                                  }}
                                >
                                  {line.number}
                                </div>
                                <span className="text-sm">{line.name}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Terminus selection */}
            {selectedLineId && (
              <div className="space-y-2">
                <Label>Terminus</Label>
                <Select
                  value={selectedStop}
                  onValueChange={(value) => {
                    setSelectedStop(value);
                    const stop = stops.find((s) => s.id === value);
                    if (stop) {
                      setCustomDirection(stop.name);
                    }
                  }}
                  disabled={isLoadingStops}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingStops
                          ? "Chargement des arrêts..."
                          : "Sélectionner un terminus..."
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {stops.map((stop) => (
                      <SelectItem key={stop.id} value={stop.id}>
                        {stop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Custom direction override */}
            <div className="space-y-2">
              <Label>Direction personnalisée (optionnel)</Label>
              <Textarea
                value={customDirection}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCustomDirection(e.target.value)
                }
                placeholder="Entrez une direction..."
                rows={2}
                className="resize-none"
              />

              {/* Insert buttons */}
              <div className="flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomDirection(customDirection + " – ")}
                  className="h-7 px-2 text-xs"
                >
                  – (tiret long)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCustomDirection(customDirection + " Métro ")
                  }
                  className="h-7 px-2 text-xs"
                >
                  Métro
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomDirection(customDirection + " Tram ")}
                  className="h-7 px-2 text-xs"
                >
                  Tram
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCustomDirection(customDirection + " RER ")}
                  className="h-7 px-2 text-xs"
                >
                  RER
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Métro, Tram et RER seront remplacés par leurs logos respectifs
              </p>
            </div>

            {/* Use RATP SVG option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useRatpSvg"
                checked={useRatpSvg}
                onChange={(e) => setUseRatpSvg(e.target.checked)}
                className="h-4 w-4"
              />
              <Label
                htmlFor="useRatpSvg"
                className="text-sm font-normal cursor-pointer"
              >
                Utiliser le logo RATP officiel (si disponible)
              </Label>
            </div>
          </>
        ) : (
          <>
            {/* Custom mode fields */}
            <div className="space-y-2">
              <Label>Numéro de ligne</Label>
              <Input
                value={customNumber}
                onChange={(e) => setCustomNumber(e.target.value)}
                placeholder="Ex: 42"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Couleur de fond</Label>
                <Input
                  type="color"
                  value={customLineColor}
                  onChange={(e) => setCustomLineColor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Couleur du texte</Label>
                <Input
                  type="color"
                  value={customTextColor}
                  onChange={(e) => setCustomTextColor(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Direction</Label>
              <Input
                value={customDirection}
                onChange={(e) => setCustomDirection(e.target.value)}
                placeholder="Ex: Toutes directions"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Couleur fond direction</Label>
                <Input
                  type="color"
                  value={customDirectionBgColor}
                  onChange={(e) => setCustomDirectionBgColor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Couleur texte direction</Label>
                <Input
                  type="color"
                  value={customDirectionTextColor}
                  onChange={(e) => setCustomDirectionTextColor(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
