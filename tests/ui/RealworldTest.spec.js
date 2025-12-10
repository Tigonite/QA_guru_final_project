import { test, expect } from '@playwright/test';
import { App } from '../../src/pages/index';
import { UserBuilder, ArticleBuilder } from '../../src/helpers/builders/index';

test.describe('Тесты для сайта realworld.qa', () => {
    
    test.beforeEach(async ({ page }, testinfo) => {
        await page.goto(testinfo.project.use.appURL);
    });

    test('Создание статьи', async ({ page }) => {
        const user = new UserBuilder()
        .addName()
        .addEmail()
        .addPassword()
        .generate();
        
        const article = new ArticleBuilder()
        .addTitle()
        .addAbout()
        .addContent()
        .addTag()
        .generate();

        const app = new App(page);

        await app.main.gotoRegister();
        await app.register.registerUser(user);
        await app.create.createNew(article);
        
        await expect(app.create.checkArticle).toContainText(article.title);
    });

    test('Редактирование статьи', async ({ page }) => {
        const user = new UserBuilder()
        .addName()
        .addEmail()
        .addPassword()
        .generate();

        const article = new ArticleBuilder()
        .addTitle()
        .addAbout()
        .addContent()
        .addTag()
        .generate();
        
        const articleEdit = new ArticleBuilder()
        .addTitle()
        .addAbout()
        .addContent()
        .addTag()
        .generate();
        
        const app = new App(page);

        await app.main.gotoRegister();
        await app.register.registerUser(user);
        await app.create.createNew(article);
        await app.edit.editCreated(articleEdit);
        
        await expect(app.edit.checkArticle).toContainText(articleEdit.title);
    });

    test('Лайк статьи', async ({ page }) => {
        const user = new UserBuilder()
        .addName()
        .addEmail()
        .addPassword()
        .generate();

        const article = new ArticleBuilder()
        .addTitle()
        .addAbout()
        .addContent()
        .addTag()
        .generate();
        
        const app = new App(page);
        
        await app.main.gotoRegister();
        await app.register.registerUser(user);
        await app.create.createNew(article);
        await app.main.goHome();
        await app.main.likeArticle();

        await expect(app.main.checkLike).toBeVisible();
    });

    test('Выход из аккаунта', async ({ page }) => {
        const user = new UserBuilder()
        .addName()
        .addEmail()
        .addPassword()
        .generate();
            
        const app = new App(page);
    
        await app.main.gotoRegister();
        await app.register.registerUser(user);
        await app.main.logout();
            
        await expect(app.main.loginLink).toBeVisible();
    });

    test('Поиск статьи по тегу', async ({ page }) => {
        const user = new UserBuilder()
        .addName()
        .addEmail()
        .addPassword()
        .generate();

        const article = new ArticleBuilder()
        .addTitle()
        .addAbout()
        .addContent()
        .addTag("реклама")
        .generate();
                
        const app = new App(page);
        
        await app.main.gotoRegister();
        await app.register.registerUser(user);
        await app.create.createNew(article);
        await app.main.goHome();
        await app.main.gotoSearch();
                
        await expect(app.main.tag).toBeVisible();
    });
});
