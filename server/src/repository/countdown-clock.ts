

class CountDownClock {

  constructor(from: number) {
    this.countDownFrom = Math.floor(from);
    this.remainingTime = Math.floor(from);
  }

  private countDownFrom: number;
  private remainingTime: number;
  private interval: NodeJS.Timeout;
  onTick = () => {};
  onTimeUp = () => {};

  setRemainingTime(time: number) {
    this.remainingTime = Math.floor(time);
  }

  setCountDownTime(from: number) {
    this.countDownFrom = Math.floor(from);
  }

  start() {
    this.interval = setInterval(() => {
      --this.remainingTime;
      this.onTick();
      if (this.remainingTime === 0) {
        this.stop();
        this.onTimeUp();
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
}

export default CountDownClock;