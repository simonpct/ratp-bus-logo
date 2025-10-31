// Types pour l'API IDFM - Référentiel des lignes
export interface IDFMLineRecord {
  id_line: string;
  name_line: string;
  shortname_line: string;
  transportmode: string;
  transportsubmode: string;
  type: string;
  operatorref: string;
  operatorname: string;
  additionaloperators?: string;
  networkname: string;
  colourweb_hexa: string;
  textcolourweb_hexa: string;
  colourprint_cmjn?: string;
  textcolourprint_hexa?: string;
  accessibility?: string;
  audiblesigns_available?: string;
  visualsigns_available?: string;
  id_groupoflines?: string;
  shortname_groupoflines?: string;
  notice_title?: string;
  notice_text?: string;
  picto?: string;
  valid_fromdate?: string;
  valid_todate?: string;
  status?: string;
  privatecode?: string;
  air_conditioning?: string;
}

export interface IDFMLineResponse {
  records: IDFMLineRecord[];
}

// Types pour l'API IDFM - Référentiel des arrêts
export interface IDFMStopRecord {
  fields: {
    id: string;
    route_long_name: string;
    stop_id: string;
    stop_name: string;
    stop_lon: string;
    stop_lat: string;
    operatorname: string;
    shortname: string;
    mode: string;
    pointgeo?: [number, number];
    nom_commune?: string;
    code_insee?: string;
  };
}

export interface IDFMStopResponse {
  records: IDFMStopRecord[];
}

// Types simplifiés pour l'application
export interface BusLine {
  id: string;
  number: string;
  name: string;
  color: string;
  textColor: string;
  operator: string;
}

export interface BusStop {
  id: string;
  name: string;
  lineId: string;
}
