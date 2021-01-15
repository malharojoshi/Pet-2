class Food {
  constructor(x, y) {
    this.milkImg = loadImage("images/Milk.png");
    this.sprite = createSprite(x, y, 1, 1);
    this.hidden = false;
  }
  display() {
    this.sprite.addImage(this.milkImg);
    this.sprite.scale = 0.04;
  }
  show() {
    this.hidden = false;
    this.sprite.visible = true;
  }
  hide() {
    this.hidden = true;
    this.sprite.visible = false;
  }
}
