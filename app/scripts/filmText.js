'use strict';

/**
 * This module is only exposed to have this static text returned for use in the grid app,
 * or anywhere else that might be necessary. NOTE: Another option is to just use JSON!
 */
const filmText = () => {
  const ektar = `Kodak Ektar is often considered one of the world's finest grain
  color negative films. Photographs shot with Ektar often have little noise due
  to its low ISO speed (100). The colors are ultra-vivid, shots are exceptionally
  sharp, and the film is ideal for modern-day scanning. Its use-cases are
  typically with nature and travel photography.`;

  const portra = `Kodak's Portra series is a daylight-balanced professional color
  negative film. As its name suggests, it is intended for portrait use. Available
  in 3 different film speeds, the Portra line is expensive, but takes its cues from
  Kodak's motion picture film.`;

  const trix = `A living classic, the Kodak Tri-X film has been in production since 1940.
  It's a true black-and-white film, and remains the world's best seller. It has
  a tremendously versatile exposure latitude and a classic grain structure - in fact,
  Tri-X is what contributes to most people's notion of "film-like grain". It pushed an era
  of photojournalism forward!`;

  const superia = `Fujifilm's Superia is a popular line available in a variety of speeds,
  ranging from 100 - 1600 ISO. Originally intended for typical point and shoot cameras,
  the film has proven successful with enthusiasts. The saturated colors and lower price point
  make it a popular go-to choice for the average film photographer who needs color.`;

  const velvia = `Fujifilm Velvia is unique - it's slide film - meaning that
  the photographs you take, if you were to look at the processed film, results in
  a positive image. Velvia is iconic for it's extreme color pop - strong, bold, and
  saturated colors. The look is very distinct, but the slower speed of the film makes
  it better for bright sunny days.`;

  const pro400h = `The Fujifilm Pro 400H is often used at weddings, but is also
  popular with street photography. The amazing exposure latitude means the photographer
  can shoot with a heavy mix of lights and darks. Color rendition is quite neutral,
  and it works well in indoor lighting. Due to it's 4th emulsion layer, it's a bit
  more expensive to produce - hence more cost prohibitive.`;

  /** expose methods - revealing module pattern **/
  return {
    ektar,
    portra,
    'tri-x': trix,
    superia,
    velvia,
    'pro 400h': pro400h
  };
};
