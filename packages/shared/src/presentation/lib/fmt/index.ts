export class Fmt {
  private currencyDevisor: number;

  constructor(currencyDevisor: number) {
    this.currencyDevisor = currencyDevisor;
  }

  private priceIntl = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
  });
  private dateIntl = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  private dateTimeIntl = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  price(value: number) {
    const calculated = value / this.currencyDevisor;
    if (isNaN(calculated)) {
      return "";
    }
    const res = this.priceIntl.format(calculated);
    return res;
  }

  parsePrice(value: string, skipNan = true) {
    const res = parseInt(value.replace(/\s/g, ""));
    if (skipNan) {
      return isNaN(res) ? 0 : res;
    }
    return res;
  }

  date(value: Date) {
    return this.dateIntl.format(value);
  }

  dateTime(value: Date) {
    return this.dateTimeIntl.format(value);
  }

  byQt(qt: number, variants: [string, string, string]): string {
    const [fisrt, second, last] = variants;
    const fmtQt = qt.toString();
    if (
      fmtQt.endsWith("11") ||
      fmtQt.endsWith("12") ||
      fmtQt.endsWith("13") ||
      fmtQt.endsWith("14")
    ) {
      return last;
    }
    if (fmtQt.endsWith("1")) {
      return fisrt;
    }
    if (fmtQt.endsWith("2") || fmtQt.endsWith("3") || fmtQt.endsWith("4")) {
      return second;
    }
    return last;
  }
}
