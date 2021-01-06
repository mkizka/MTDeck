export class TouchManager {
  public onTap: () => void;
  public onSwipe: (startX: number, direction: "left" | "right") => void;
  private start = { x: 0, y: 0, time: 0 };
  private end = { x: 0, y: 0, time: 0 };
  private get isSwipedX() {
    const diffX = this.end.x - this.start.x;
    const diffY = this.end.y - this.start.y;
    const diffTime = this.end.time - this.start.time;
    const velocity = Math.sqrt(diffX ** 2 + diffY ** 2) / diffTime;
    console.log(Math.abs(diffY / diffX), diffX, velocity);
    return (
      Math.abs(diffY / diffX) <= 1 && // スワイプ角度の絶対値が45度以下
      Math.abs(diffX) >= 10 && // 最小距離(px)
      Math.abs(velocity) >= 0.3 // 最小速度(px/ミリ秒)
    );
  }
  constructor($element: HTMLElement) {
    $element.addEventListener("touchstart", (e) => {
      this.start = {
        x: e.touches[0].screenX,
        y: e.touches[0].screenY,
        time: new Date().getTime(),
      };
    });
    $element.addEventListener("touchmove", (e) => {
      this.end = {
        x: e.touches[0].screenX,
        y: e.touches[0].screenY,
        time: new Date().getTime(),
      };
    });
    $element.addEventListener("touchend", (_) => {
      if (this.isSwipedX) {
        const direction = this.start.x < this.end.x ? "right" : "left";
        this.onSwipe(this.start.x, direction);
      }
    });
  }
}
