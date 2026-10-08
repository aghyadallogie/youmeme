export type LayerId = string;

export type TextStyle = {
  fontFamily: string;
  fontSize: number;
  color: string;
  strokeColor: string;
  strokeWidth: number;
};

export type BaseLayer = {
  id: LayerId;
  x: number;
  y: number;
};

export type ImageLayer = BaseLayer & {
  kind: 'image';
  src: string;
  width: number;
  height: number;
};

export type TextLayer = BaseLayer & {
  kind: 'text';
  text: string;
};

export type Layer = ImageLayer | TextLayer;

export type EditorState = {
  layers: Layer[];
  selectedId: LayerId | null;
  canvasWidth: number;
  canvasHeight: number;
  textStyle: TextStyle;
  imageScale: number;
};