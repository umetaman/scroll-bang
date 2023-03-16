export class Scroller {
    private elapsedTime = 0;
    private isCanceled = false;
    private startTime = 0;
    private duration = 0;
    private onComplete = () => {
      /** */
    };
    private scrollElement: HTMLElement | null;
    private left = 0;
    private top = 0;
    private previousLeft = 0;
    private previousTop = 0;
  
    constructor() {
      this.scrollElement = null;
    }
  
    private clamp(value: number, min: number, max: number) {
      return Math.min(Math.max(value, min), max);
    }
  
    public static ease(v: number) {
      return 1 - Math.pow(1 - v, 4);
    }
  
    public static scrollTo(
      scrollElement: HTMLElement,
      left: number,
      top: number,
      duration = 0,
      onComplete = () => {
        /** */
      }
    ) {
      const scroller = new Scroller();
      scroller.scrollTo(scrollElement, left, top, duration, onComplete);
      return scroller;
    }
  
    public scrollTo(
      scrollElement: HTMLElement,
      left: number,
      top: number,
      duration = 0,
      onComplete = () => {
        /** */
      }
    ) {
      this.duration = Math.max(0, duration);
      this.onComplete = onComplete;
      this.scrollElement = scrollElement;
      this.previousLeft = scrollElement.scrollLeft;
      this.previousTop = scrollElement.scrollTop;
      this.left = left - this.previousLeft;
      this.top = top - this.previousTop;
  
      if (duration < 1) {
        scrollElement.scrollTo({ left, top });
        return;
      }
  
      this.startTime = Date.now();
  
      const animateScroll = () => {
        this.elapsedTime = Date.now() - this.startTime;
        const value = this.clamp(this.elapsedTime / this.duration, 0.0, 1.0);
  
        if (this.isCanceled) {
          return;
        }
  
        if (this.elapsedTime < this.duration) {
          const easeValue = Scroller.ease(value);
          this.scrollElement?.scrollTo({
            left: this.previousLeft + this.left * easeValue,
            top: this.previousTop + this.top * easeValue,
          });
          window.requestAnimationFrame(animateScroll);
        } else {
          this.onComplete();
        }
      };
      animateScroll();
    }
  
    public cancel() {
      this.isCanceled = true;
    }
  }
  