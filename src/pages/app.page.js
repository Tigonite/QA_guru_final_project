import { MainPage, RegisterPage, CreateArticlePage, EditArticlePage } from '../../src/pages/index';

export class App {
    constructor (page) {
        this.page = page;
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.create = new CreateArticlePage(page);
        this.edit = new EditArticlePage(page);
    }
}