import { nanoid } from "nanoid";
export class ArticleBuilder {

    addTitle () {
        this.title = nanoid(10);
        return this
    }

    addAbout () {
        this.about = nanoid(15);
        return this
    }

    addContent () {
        this.content = nanoid(30);
        return this
    }

    addTag () {
        this.tag = nanoid(3);
        return this
    }

    generate () {
        return {
            title: this.title,
            about: this.about,
            content: this.content,
            tag: this.tag,
        };
    }
}