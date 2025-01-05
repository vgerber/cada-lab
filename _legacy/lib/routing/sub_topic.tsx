export class SubTopic {
  readonly name: string;
  readonly subTopics: SubTopic[];
  private hrefBase: string;
  private href: string;

  constructor(
    name: string,
    href: string,
    subTopics: SubTopic[],
    hrefBase: string = "",
  ) {
    this.name = name;
    this.href = href;
    this.subTopics = subTopics;
    this.hrefBase = hrefBase;
    this.updateHrefBase();
  }

  updateHrefBase() {
    this.subTopics.forEach((subTopic) => {
      subTopic.hrefBase = this.hrefBase + this.href;
      subTopic.updateHrefBase();
    });
  }

  getHref() {
    return this.hrefBase + this.href;
  }
}
