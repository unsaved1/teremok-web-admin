export class ImagePath {
  private domain: string;
  constructor(domain: string) {
    this.domain = domain;
  }

  createUrl(path: string) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    return `https://${this.domain}/storage/${path}`;
  }

  generateQr(path: string) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    return `https://${this.domain}/storage/${path}`;
  }
}
