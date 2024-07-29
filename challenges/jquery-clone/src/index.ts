import fetch from "node-fetch";

class SelectorResult {
  #elements;
  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }
  html(contents: string) {
    this.#elements.forEach((el) => (el.innerHTML = contents));
  }
  on<K extends keyof HTMLElementEventMap>(
    eventName: K,
    callback: (event: HTMLElementEventMap[K]) => void
  ) {
    this.#elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.addEventListener(eventName, callback);
      }
    });
  }
  hide() {
    this.#elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.visibility = "hidden";
      }
    });
  }
  show() {
    this.#elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.visibility = "visible";
      }
    });
  }
}

function $(selector: string): SelectorResult {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax({
    url,
    successCB,
  }: {
    url: string;
    successCB: (data: any) => void;
  }): any {
    return fetch(url)
      .then((resp) => resp.json())
      .then(successCB);
  }
}

export default $;
