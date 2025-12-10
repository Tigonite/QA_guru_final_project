import { nanoid } from 'nanoid'
export class BuilderTodo {
  constructor() {
    this.data = {}
    this.validTodoId = Math.floor(Math.random() * 10) + 1
    this.invalidTodoId = Math.floor(Math.random() * 10) + 11
  }

  addValidTodoId(id = Math.floor(Math.random() * 10) + 1) {
    this.data.id = id
    return this
  }

  addInvalidTodoId(id = Math.floor(Math.random() * 10) + 11) {
    this.data.id = id
    return this
  }

  addDoneStatus(doneStatus = false) {
    this.data.doneStatus = doneStatus
    return this
  }

  addTitle(title = nanoid(10)) {
    this.data.title = title
    return this
  }

  addMaxTitle(title = nanoid(50)) {
    this.data.title = title
    return this
  }

  addLongTitle(title = nanoid(53)) {
    this.data.title = title
    return this
  }

  addDescription(description = nanoid(20)) {
    this.data.description = description
    return this
  }

  addMaxDescription(description = nanoid(200)) {
    this.data.description = description
    return this
  }

  addLongDescription(description = nanoid(210)) {
    this.data.description = description
    return this
  }

  addOverDescription(description = nanoid(200).repeat(26)) {
    this.data.description = description
    return this
  }

  addPriority(priority = nanoid(10)) {
    this.data.priority = priority
    return this
  }

  generate() {
    return { ...this.data }
  }
}
