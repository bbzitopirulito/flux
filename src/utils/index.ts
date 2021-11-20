export const drawScenario = (
  ctx: CanvasRenderingContext2D,
  background: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  character2: HTMLImageElement,
  character2Width: number,
  character2Height: number,
  character: HTMLImageElement,
  e: MouseEvent,
  characterWidth: number,
  characterHeight: number
) => {
  ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(
    character2,
    canvasWidth / 3.5,
    40,
    character2Width,
    character2Height
  );
  ctx.drawImage(character, e.x - 30, e.y - 20, characterWidth, characterHeight);
};

export const isNearCharacter2 = (e: MouseEvent, canvasWidth: number) => {
  const x = e.x - 30;
  const y = e.y - 20;
  const character2X = canvasWidth / 3.5;
  const character2Y = 40;
  const range = 40;

  const isNear =
    x > character2X - range &&
    x < character2X + range &&
    y > character2Y - range &&
    y < character2Y + range;

  return isNear;
};
