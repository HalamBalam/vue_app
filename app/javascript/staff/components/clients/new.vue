<template>
  <q-card>
    <div class="q-pa-md" style="max-width: 330px">
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
        <q-input
          ref="fullName"
          filled
          v-model="fullName"
          label="Full name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length >= 5 || 'Please enter client\'s full name']"
        />

        <q-input
          ref="phone"
          filled
          mask="(###) ### - ####"
          unmasked-value
          v-model="phone"
          label="Phone's number *"
          lazy-rules
          hint="Mask: (###) ### - ####"
          :rules="[
            val => val !== null && val !== '' || 'Please enter client\'s phone'
          ]"
        />

        <q-input
          ref="email"
          filled
          v-model="email"
          label="Email *"
          lazy-rules
          :rules="[
            val => this.validEmail(val) || 'Please enter correct email'
          ]"
        />

        <div>
          <q-btn label="Create" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
        </div>
      </form>
    </div>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      fullName: null,
      phone: null,
      email: null
    }
  },

  methods: {
    onSubmit () {
      this.$refs.fullName.validate()
      this.$refs.phone.validate()
      this.$refs.email.validate()

      if (this.$refs.fullName.hasError || this.$refs.phone.hasError || this.$refs.email.hasError) {
        this.formHasError = true
      }
      else {
        this.$emit('createClient', this.fullName, this.phone, this.email)
      }
    },

    onReset () {
      this.fullName = null
      this.phone = null
      this.email = null

      this.$refs.fullName.resetValidation()
      this.$refs.phone.resetValidation()
      this.$refs.email.resetValidation()
    },

    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>
