import { faker } from "@faker-js/faker";
export class UserBuilder {

addName () {
    this.name = faker.person.fullName();
    return this
}

addEmail () {
    this.email = faker.internet.email();
    return this
}

addPassword () {
    this.password = faker.internet.password();
    return this
}

generate () {
    return {
        name: this.name,
        email: this.email,
        password: this.password,
    };
}
}