
export class MainPage {
	constructor(page) {
		this.signupLink = page.getByRole('link', { name: 'Sign up' });
		this.loginLink = page.getByRole('link', { name: 'Login' });
		this.homeLink = page.getByRole('link', { name: 'Home' });
        this.userDropdown = page.locator('div.nav-link.dropdown-toggle.cursor-pointer');
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
		this.globalFeed = page.getByRole('button', { name: 'Global Feed' });
        this.like = page.getByRole('button', { name: '( 0 )' }).first();
        this.checkLike = page.locator('button:has-text("( 1 )")').first();
        this.advLink = page.getByRole('button', { name: 'реклама' });
        this.tag = page.locator(
            "li.tag-default.tag-pill.tag-outline:has-text('реклама')").first();
	}
	
	async gotoRegister() {
		await this.signupLink.click();
	}

	async logout() {
        await this.userDropdown.click();
        await this.logoutLink.click();
    }

    async goHome() {
        await this.homeLink.click();
    }

	async likeArticle() {   
        await this.globalFeed.click();
        await this.like.click();
    }

	async gotoSearch() {   
        await this.globalFeed.click();
        await this.advLink.click();
    }
}