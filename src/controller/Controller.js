import { Console } from '@woowacourse/mission-utils';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import MenuManager from '../models/MenuManager.js';
import OrderManager from '../models/OrderManager.js';
import EventManager from '../models/EventManager.js';
import BillManager from '../models/BillManager.js';
import { UNIT } from '../constants/options.js';

class Controller {
  #menuManager;
  #orderManager;
  #eventManager;
  #billManager;
  #date;

  constructor() {
    this.#menuManager = new MenuManager();
    this.#orderManager;
    this.#eventManager;
    this.#billManager;
    this.#date;
  }

  async startWootecoPlanner() {
    await this.#receiveDateInput();
    await this.#receiveOrderInput();
    this.#applyEventDiscount();
    this.#printOrderDetails();
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
      this.#orderManager = new OrderManager(order, this.#menuManager);
    });
  }

  #applyEventDiscount() {
    this.#billManager = new BillManager(this.#orderManager, this.#eventManager, this.#menuManager);
    if (this.#billManager.getTotalPrice(this.#orderManager.getOrderList()) >= UNIT.eventThreshold) {
      this.#eventManager.calculateDiscount(this.#orderManager, this.#menuManager);
      this.#eventManager.canGetChampagne(this.#billManager);
      this.#eventManager.canGetBadge(this.#billManager);
    }
  }

  #printOrderDetails() {
    OutputView.printResult(this.#orderManager, this.#eventManager, this.#billManager);
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
