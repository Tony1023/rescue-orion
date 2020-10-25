"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CountDownClock {
    constructor(from) {
        this.onTick = () => { };
        this.onTimeUp = () => { };
        this.countDownFrom = Math.floor(from);
        this.remainingTime = Math.floor(from);
    }
    setCountDownTime(from) {
        this.countDownFrom = Math.floor(from);
        this.remainingTime = Math.floor(from);
    }
    start() {
        clearInterval(this.interval);
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
exports.default = CountDownClock;
//# sourceMappingURL=countdown-clock.js.map