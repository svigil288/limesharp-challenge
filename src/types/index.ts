export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  date: string;
}

export interface HeroLayerShowParams {
  imageUrl: string;
  top: number;
  left: number;
  width: number;
  height: number;
  sourceElement: HTMLElement;
}

export interface HeroLayerType {
  showHero: (params: HeroLayerShowParams) => void;
}