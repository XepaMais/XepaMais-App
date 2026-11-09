/*
 * Vídeos de Missão, Visão e Valores.
 * Fonte: Mixkit (https://mixkit.co), licença gratuita para uso pessoal e comercial
 * (https://mixkit.co/license/#videoFree), sem necessidade de atribuição.
 *
 * Para usar os vídeos a partir do próprio projeto (sem depender da internet):
 * baixe os arquivos .mp4 abaixo, salve em src/assets/videos/sobre-nos/ e troque a URL
 * por um import, por exemplo:
 *   import missao from '@/assets/videos/sobre-nos/missao.mp4';
 */
const BASE = 'https://assets.mixkit.co/videos';

export const VIDEOS = {
  // "Slow motion video of a fruit and veggie stand"
  missao: {
    video: `${BASE}/991/991-720.mp4`,
    poster: `${BASE}/991/991-thumb-720-0.jpg`,
  },
  // "Fruit store in a market"
  visao: {
    video: `${BASE}/32465/32465-720.mp4`,
    poster: `${BASE}/32465/32465-thumb-720-0.jpg`,
  },
  // "People selecting fruit and vegetables at an outdoor market"
  valores: {
    video: `${BASE}/983/983-720.mp4`,
    poster: `${BASE}/983/983-thumb-720-0.jpg`,
  },
};
