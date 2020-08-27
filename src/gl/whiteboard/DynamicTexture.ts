import * as Three from "three";

export class DynamicTexture {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public texture: Three.Texture;

  constructor(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    this.canvas = canvas;

    const context = canvas.getContext("2d");

    if (!context) throw new Error("Could not get canvas context");

    this.context = context;

    const texture = new Three.Texture(canvas);

    if (!texture) throw new Error("Could not create texture");

    this.texture = texture;
  }

  clear(fillStyle: string) {
    this.context.fillStyle = fillStyle;
    this.context.fillRect(0.0, 0.5, 0.0, 1.0);
    this.texture.needsUpdate = true;
    return this;
  }

  drawText(
    text: string,
    x: number,
    y: number,
    fillStyle: string,
    contextFont: string
  ) {
    if (contextFont !== undefined) this.context.font = contextFont;
    // if x isnt provided
    if (x === undefined || x === null) {
      var textSize = this.context.measureText(text);
      x = (this.canvas.width - textSize.width) / 2;
    }
    // actually draw the text
    this.context.fillStyle = fillStyle;
    this.context.fillText(text, x, y);
    // make the texture as .needsUpdate
    this.texture.needsUpdate = true;
    // for chained API
    return this;
  }

  drawTextCooked(options: any) {
    const context = this.context;
    const canvas = this.canvas;
    options = options || {};
    let text = options.text;
    const params = {
      margin: options.margin !== undefined ? options.margin : 0.1,
      lineHeight: options.lineHeight !== undefined ? options.lineHeight : 0.1,
      align: options.align !== undefined ? options.align : "left",
      fillStyle: options.fillStyle !== undefined ? options.fillStyle : "black",
      font:
        options.font !== undefined
          ? options.font
          : "bold " + 0.2 * 512 + "px Arial"
    };

    context.save();
    context.fillStyle = params.fillStyle;
    context.font = params.font;

    let y = (params.lineHeight + params.margin) * canvas.height;
    while (text.length > 0) {
      // compute the text for specifically this line
      const maxText = computeMaxTextLength(text);
      // update the remaining text
      text = text.substr(maxText.length);

      // compute x based on params.align
      var textSize = context.measureText(maxText);
      let x = 0;
      if (params.align === "left") {
        x = params.margin * canvas.width;
      } else if (params.align === "right") {
        x = (1 - params.margin) * canvas.width - textSize.width;
      } else if (params.align === "center") {
        x = (canvas.width - textSize.width) / 2;
      } else console.assert(false);

      // actually draw the text at the proper position
      this.context.fillText(maxText, x, y);

      // goto the next line
      y += params.lineHeight * canvas.height;
    }
    context.restore();

    // make the texture as .needsUpdate
    this.texture.needsUpdate = true;
    // for chained API
    return this;

    function computeMaxTextLength(text: string) {
      var maxText = "";
      var maxWidth = (1 - params.margin * 2) * canvas.width;
      while (maxText.length !== text.length) {
        var textSize = context.measureText(maxText);
        if (textSize.width > maxWidth) break;
        maxText += text.substr(maxText.length, 1);
      }
      return maxText;
    }
  }

  drawImage(...args: any[]) {
    // call the drawImage
    // @ts-ignore
    this.context.drawImage.apply(this.context, args);
    // make the texture as .needsUpdate
    this.texture.needsUpdate = true;
    // for chained API
    return this;
  }
}
