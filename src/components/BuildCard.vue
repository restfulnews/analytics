<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateWebsite">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Customise your website</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('websiteName')">
            <label for="website-name">Website name</label>
            <md-input
              name="website-name"
              id="website-name"
              autocomplete="given-name"
              v-model="form.websiteName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.websiteName.required">
              The website name is required
            </span>
            <span class="md-error" v-else-if="!$v.form.websiteName.minlength">
              Invalid website name
            </span>
          </md-field>

          <md-field :class="getValidationClass('colour')">
            <label for="colour">Main colour</label>
            <md-select name="colour" id="colour" v-model="form.colour" md-dense :disabled="sending">
              <md-option></md-option>
              <md-option value="red">Red</md-option>
              <md-option value="pink">Pink</md-option>
              <md-option value="purple">Purple</md-option>
              <md-option value="deep-purple">Deep Purple</md-option>
              <md-option value="indigo">Indigo</md-option>
              <md-option value="blue">Blue</md-option>
              <md-option value="light-blue">Light Blue</md-option>
              <md-option value="cyan">Cyan</md-option>
              <md-option value="teal">Teal</md-option>
              <md-option value="green">Green</md-option>
              <md-option value="light-green">Light Green</md-option>
              <md-option value="lime">Lime</md-option>
              <md-option value="yellow">Yellow</md-option>
              <md-option value="amber">Amber</md-option>
              <md-option value="orange">Orange</md-option>
              <md-option value="deep-orange">Deep Orange</md-option>
              <md-option value="brown">Brown</md-option>
              <md-option value="grey">Grey</md-option>
              <md-option value="blue-grey">Blue Grey</md-option>
              <md-option value="black">Black</md-option>
            </md-select>
            <span class="md-error">The colour is required</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">
            Generate website
          </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="websiteSaved">
        The website {{ lastWebsite }} was generated with success!
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'BuildCard',
  mixins: [validationMixin],
  data: () => ({
    form: {
      websiteName: null,
      colour: null,
    },
    websiteSaved: false,
    sending: false,
    lastWebsite: null,
  }),
  validations: {
    form: {
      websiteName: {
        required,
        minLength: minLength(3),
      },
      colour: {
        required,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }

      return null; // lol i hope this is ok
    },
    clearForm() {
      this.$v.$reset();
      this.form.websiteName = null;
      this.form.colour = null;
    },
    saveWebsite() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.websiteSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateWebsite() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveWebsite();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  };
</style>
