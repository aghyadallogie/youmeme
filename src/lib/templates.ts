// import oneDoesNotSimply from '../assets/one-does-not-simply.png';
import distractedBoyfriend from '../assets/distracted-boyfriend.png';
import womanCatFaceoff from '../assets/woman-cat-faceoff.png';
import brandCap from '../assets/brand-cap.png';
import girlDestruction from '../assets/girl-destruction.png';
import pepeSmoking from '../assets/pepe-smoking.png';
import schmart from '../assets/schmart.png';

export type Template = {
  name: string;
  src: string;
};

export const TEMPLATES: Template[] = [
  { name: 'woman cat faceoff', src: womanCatFaceoff },
  { name: 'distracted boyfriend', src: distractedBoyfriend },
  { name: 'brand cap', src: brandCap},
  { name: 'girl-destruction', src: girlDestruction},
  { name: 'pepe-smoking', src: pepeSmoking},
  { name: 'schmart', src: schmart},
];