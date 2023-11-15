import { Console } from '@woowacourse/mission-utils';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import OrderManager from '../models/OrderManager.js';
import EventManager from '../models/EventManager.js';
import { UNIT } from '../constants/options.js';

class Controller {
  #orderManager;
  #eventManager;
  #date;

  constructor() {
    this.#orderManager;
    this.#eventManager;
    this.#date;
  }

  async startWootecoPlanner() {
    await this.#receiveDateInput();
    await this.#receiveOrderInput();
    this.#applyEvent();
    this.#showOrderDetailsWithBenefit();
  }

  async #receiveDateInput() {
    await this.#tryCatchHandler(async () => {
      this.#date = await InputView.readDate();
      this.#eventManager = new EventManager(this.#date);
    });
  }

  async #receiveOrderInput() {
    await this.#tryCatchHandler(async () => {
      const order = await InputView.readOrder(this.#date);
      this.#orderManager = new OrderManager(order);
    });
  }

  #applyEvent() {
    if (this.#orderManager.getTotalPrice() >= UNIT.eventThreshold) {
      this.#eventManager.calculateDiscountAndBenefit(this.#orderManager);
    }
  }

  #showOrderDetailsWithBenefit() {
    OutputView.printResult(this.#orderManager, this.#eventManager);
  }

  async #tryCatchHandler(asyncFn) {
    try {
      await asyncFn();
    } catch (err) {
      Console.print(err.message);
      await this.#tryCatchHandler(asyncFn);
    }
  }
}

export default Controller;
