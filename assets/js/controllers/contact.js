// Copyright 2020 Nicholas Young. All rights reserved.

import { Controller } from 'stimulus';

const email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const isEmail = input => input.match(email);

export class Contact extends Controller {
  static targets = ['form'];
  static rules = {
    name: { required: true, },
    email: { required: true, format: isEmail, },
    message: { required: true, },
  };
  values = {};
  errors = {};

  update(e) {
    const field = e.target.name;
    const value = e.target.value;

    this.values[field] = { value };
  }

  hasError(field) {
    if (this.errors[field]) {
      return true;
    }

    return false;
  }

  validate() {
  }

  process(e) {
    e.preventDefault();
  }
}
