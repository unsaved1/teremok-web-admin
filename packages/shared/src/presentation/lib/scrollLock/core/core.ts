import styles from "./ScrollLockLib.module.scss";

export class ScrollLockLib {
  async lock() {
    const body = document.body;

    // get scrollTopOffset and save in body data attr
    const scrollTop = Math.ceil(window.scrollY);
    body.setAttribute("data-scroll-top", scrollTop.toString());

    await (async () => {
      document.documentElement.style.setProperty(
        "--trmk-scroll-lock-app-top",
        `${-scrollTop}px`,
      );
    })();
    //set app

    await (async () => {
      document.documentElement.style.setProperty(
        "--trmk-scroll-lock-app-scroll-padding",
        `${this._getScrollbarSize()}px`,
      );
    })();

    body.classList.add(styles.noScroll);
    body.classList.add(styles["noScroll--ios"]);
  }

  unlock() {
    const body = document.body;
    body.classList.remove(styles.noScroll);
    body.classList.remove(styles["noScroll--ios"]);
    const scrollTop = body.getAttribute("data-scroll-top") || "";
    document.documentElement.style.setProperty(
      "--trmk-scroll-lock-app-scroll-padding",
      "0px",
    );
    document.documentElement.style.setProperty(
      "--trmk-scroll-lock-app-top",
      "unset",
    );
    window.scroll(0, parseInt(scrollTop));
  }

  private _getScrollbarSize() {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);
    const scrollWidth = outer.offsetWidth - outer.clientWidth;
    outer.remove();
    return scrollWidth;
  }
}
