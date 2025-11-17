import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import {
    MainPage,
    RegisterPage,
    CreateArticlePage,
    EditArticlePage
} from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Тесты для сайта realworld.qa', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test('Создание статьи', async ({ page }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        
        const article = {
            title: nanoid(10),
            about: nanoid(15),
            content: nanoid(30),
            tag: nanoid(3),
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const articlePage = new CreateArticlePage(page);

        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await articlePage.createNew(article);
        
        await expect(articlePage.checkArticle).toContainText(article.title);
    });

    test('Редактирование статьи', async ({ page }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const article = {
            title: nanoid(10),
            about: nanoid(15),
            content: nanoid(30),
            tag: nanoid(3),
        };
        
        const articleEdit = {
            title: faker.book.title(),
            about: faker.commerce.productName(),
            content: faker.commerce.productDescription(),
            tag: faker.word.noun(),
        };
        
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
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const article = {
            title: nanoid(10),
            about: nanoid(15),
            content: nanoid(30),
            tag: nanoid(3),
        };
        
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
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
            
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
    
        await mainPage.gotoRegister();
        await registerPage.registerUser(user);
        await mainPage.logout();
            
        await expect(mainPage.loginLink).toBeVisible();
    });

    test('Поиск статьи по тегу', async ({ page }) => {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            };

        const article = {
            title: nanoid(10),
            about: nanoid(15),
            content: nanoid(30),
            tag: 'реклама',
        };
                
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