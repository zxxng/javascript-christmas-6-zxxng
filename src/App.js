import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import MenuManager from './domain/MenuManager.js';
import OrderManager from './domain/OrderManager.js';
import EventManager from './domain/EventManager.js';
import BillManager from './domain/BillManager.js';
import OutputView from './view/OutputView.js';

class App {
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

  async run() {
    await this.#receiveDateInput();
    await this.#receiveOrderInput();
    this.#applyEventDiscount();
    OutputView.printMenu(this.#orderManager, this.#eventManager, this.#billManager);
  }

  async #receiveDateInput() {
    try {
      this.#date = await InputView.readDate();
      this.#eventManager = new EventManager(this.#date);
    } catch (err) {
      Console.print(err.message);
      await this.#receiveDateInput();
    }
  }

  async #receiveOrderInput() {
    try {
      const order = await InputView.readOrder(this.#date);
      this.#orderManager = new OrderManager(order, this.#menuManager);
    } catch (err) {
      Console.print(err.message);
      await this.#receiveOrderInput();
    }
  }

  #applyEventDiscount() {
    this.#eventManager.calculateDiscount(this.#orderManager, this.#menuManager);
    this.#billManager = new BillManager(this.#orderManager, this.#eventManager, this.#menuManager);
    this.#eventManager.canGetChampagne(this.#billManager.getTotalPrice());
    this.#eventManager.canGetBadge(this.#billManager.getTotalBenefit());
  }
}

export default App;
