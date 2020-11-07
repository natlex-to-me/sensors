// Order of resource types is important for button order on pages
export enum ResourceTypes {
  humidity = 'humidity',
  pressure = 'pressure',
  temperature = 'temperature',
}

type ResourceTypesMap = {
  [key in ResourceTypes]: boolean | string;
};

export const ResourceTypeColors: ResourceTypesMap = {
  [ResourceTypes.humidity]: '#b4e063',
  [ResourceTypes.pressure]: '#054ca3',
  [ResourceTypes.temperature]: '#e0654c',
};

export const ResourceTypeNames: ResourceTypesMap = {
  [ResourceTypes.humidity]: 'Hum',
  [ResourceTypes.pressure]: 'Pres',
  [ResourceTypes.temperature]: 'Temp',
};

export const ResourceTypeToggles: ResourceTypesMap = {
  [ResourceTypes.humidity]: true,
  [ResourceTypes.pressure]: false,
  [ResourceTypes.temperature]: true,
};
