export class CreateArticlePage {
    constructor(page) {
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.titleInput = page.getByRole('textbox', { 
            name: 'Article Title' });
        this.aboutInput = page.getByRole('textbox', { 
            name: "What's this article about?" });
        this.contentInput = page.getByRole('textbox', { 
            name: 'Write your article (in markdown)' });
        this.tagInput = page.getByRole('textbox', { 
            name: 'Enter tags' });
        this.publishButton = page.getByRole('button', { 
            name: 'Publish Article' });
        this.checkArticle = page.getByRole('main');
    }

    async createNew(article) {    
        const { title, about, content, tag } = article;
        
        await this.newArticleLink.click();
        await this.titleInput.click();
        await this.titleInput.fill(title);
        await this.aboutInput.click();
        await this.aboutInput.fill(about);
        await this.contentInput.click();
        await this.contentInput.fill(content);
        await this.tagInput.click();
        await this.tagInput.fill(tag);
        await this.publishButton.click();
    }

    /*async editCreated(articleEdit) {    
        const { title } = articleEdit;
        
        await this.editArticleButton.click();
        await this.titleInput.click();
        await this.titleInput.fill('');
        await this.titleInput.fill(title);
        await this.updateButton.click();
    }*/
}