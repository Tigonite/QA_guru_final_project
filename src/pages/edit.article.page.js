export class EditArticlePage {
    constructor(page) {
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.titleInput = page.getByRole('textbox', { 
            name: 'Article Title' });
        this.updateButton = page.getByRole('button', { 
            name: 'Update Article' });
        this.editArticleButton = page.getByRole('button', { 
            name: 'Edit Article' }).nth(1);
        this.checkArticle = page.getByRole('main');
    }

    async editCreated(articleEdit) {    
        const { title } = articleEdit;
        
        await this.editArticleButton.click();
        await this.titleInput.click();
        await this.titleInput.fill('');
        await this.titleInput.fill(title);
        await this.updateButton.click();
    }
}