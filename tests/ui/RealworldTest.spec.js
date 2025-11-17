import { test, expect } from '@playwright/test';
import {
    MainPage,
    RegisterPage,
    CreateArticlePage,
    EditArticlePage
} from '../../src/pages/index';
import { UserBuilder, ArticleBuilder } from '../../src/helpers/builders/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Тесты для сайта realworld.qa', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
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

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const articlePage = new CreateArticlePage(page);

        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await articlePage.createNew(article);
        
        await expect(articlePage.checkArticle).toContainText(article.title);
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
        
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const createArticlePage = new CreateArticlePage(page);
        const editArticlePage = new EditArticlePage(page);


        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await createArticlePage.createNew(article);
        await editArticlePage.editCreated(articleEdit);
        
        await expect(editArticlePage.checkArticle).toContainText(articleEdit.title);
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
        
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const createArticlePage = new CreateArticlePage(page);

        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await createArticlePage.createNew(article);
        await mainPage.goHome();
        await mainPage.likeArticle();

        await expect(mainPage.checkLike).toBeVisible();
    });

    test('Выход из аккаунта', async ({ page }) => {
        const user = new UserBuilder()
        .addName()
        .addEmail()
        .addPassword()
        .generate();
            
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
    
        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await mainPage.logout();
            
        await expect(mainPage.loginLink).toBeVisible();
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
                
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const createArticlePage = new CreateArticlePage(page);
        
        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await createArticlePage.createNew(article);
        await mainPage.goHome();
        await mainPage.gotoSearch();
                
        await expect(mainPage.tag).toBeVisible();
    });
});