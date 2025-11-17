export class RegisterPage {
    constructor(page) {
        this.userName = page.getByRole('textbox', { name: 'Your Name' });
        this.userEmail = page.getByRole('textbox', { name: 'Email' });
        this.userPassword = page.getByRole('textbox', { name: 'Password' });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    }

    async registerUser(user) {    
        const { name, email, password } = user;
        
        await this.userName.click();
        await this.userName.fill(name);
        await this.userEmail.click();
        await this.userEmail.fill(email);
        await this.userPassword.click();
        await this.userPassword.fill(password);
        await this.signUpButton.click();
    }
}