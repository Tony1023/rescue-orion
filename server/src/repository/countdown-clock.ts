import { GameDuration } from "../metadata/types";

class CountDownClock {

  constructor(from: number) {
    this.countDownFrom = Math.floor(from);
    this.remainingTime = Math.floor(from);
  }

  private countDownFrom: number;
  private remainingTime: number;
  private interval: NodeJS.Timeout;
  private onTickSubscribers: (() => void)[] = [];
  private onTimeUpSubscribers: (() => void)[] = [];

  subscribeTick(callback: () => void) {
    this.onTickSubscribers.push(callback);
  }

  subscribeTimeUp(callback: () => void) {
    this.onTimeUpSubscribers.push(callback);
  }

  setCountDownTime(from: number) {
    this.countDownFrom = Math.floor(from);
    this.remainingTime = Math.floor(from);
    this.onTickSubscribers.forEach((callback) => callback());
  }

  start() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      --this.remainingTime;
      this.onTickSubscribers.forEach((callback) => callback());
      if (this.remainingTime === 0) {
        this.stop();
        this.onTimeUpSubscribers.forEach((callback) => callback());
      }
    }, 1000);
  }

  stop() {
    clearTimeout(this.interval);
  }

  getSecondsRemaining() {
    return this.remainingTime;
  }

  // Difference between set count down and time remaining
  getSecondsElapsed() {
    return this.countDownFrom - this.remainingTime;
  }

  getGameDuration(): GameDuration {
    return {
      duration: this.getSecondsElapsed(),
      countDown: this.getSecondsRemaining(),
    }
  }
}

export default CountDownClock;