"use strict";

class Animation {
   constructor(spriteSheet, frameWidth, frameHeight) {
      this.spriteSheet = this.setSpriteSheet(spriteSheet);
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;

      this.scale = 0.5;
      this.frameIndex = 0;
      this.count = 0;

      this.angleInDegrees = 0;
   }

   setSpriteSheet(spriteSheet) {
      const img = new Image();
      img.src = spriteSheet;
      return img;
   }

   draw(context, x, y) {
      this.rotateImage(context, x, y);

      context.drawImage(
         this.spriteSheet,
         this.frameIndex * this.frameWidth, 0,
         this.frameWidth, this.frameHeight,
         x, y,
         this.frameWidth * this.scale, this.frameHeight * this.scale
      );

      this.count++;
      if (this.count > 18) {
         this.frameIndex++;
         this.count = 0;
      }

      if (this.frameIndex > 3) {
         this.frameIndex = 0;
      }
   }

   rotateImage(context, x, y) {
      // é necessário modificar a matriz de transformação antes e depois de aplicar a rotação,
      // para que o objeto fique no mesmo sítio
      context.translate(
         x + (this.frameWidth * this.scale) / 2,
         y + (this.frameHeight * this.scale) / 2
      );

      // converter para radianos por ser o que a função rotate() aceita
      context.rotate(this.angleInDegrees * (Math.PI / 180));

      context.translate(
         - x - (this.frameWidth * this.scale) / 2,
         - y - (this.frameHeight * this.scale) / 2
      );
   }
}