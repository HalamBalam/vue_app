<template lang="pug">
  div
    button(v-show="!showClientForm" @click="changeFormVisible") New client
    template(v-if="showClientForm")
      p(v-if="errors.length")
        b Пожалуйста исправьте указанные ошибки
        ul
          li(v-for="error in errors") {{ error }}
      button(@click="createClient") Save
      button(@click="cancelClick") Cancel
      p
        label(for="fullName") ФИО:
        input(id="fullName" v-model="fullName" type="text" placeholder="ФИО клиента")
      p
        label(for="phone") Телефон:
        input(id="phone" v-model="phone" type="number" placeholder="Номер телефона клиента")
      p
        label(for="email") email:
        input(id="email" v-model="email" type="email" placeholder="Электронная почта клиента")
    ul
      li(v-for="client in clients" :key="client.id") {{ client.email }}
</template>

<script>
export default {
  data () {
    return {
      clients: [],
      showClientForm: false,
      errors: [],
      fullName: "",
      phone: "",
      email: ""
    }
  },
  name: 'Dashboard',
  methods: {
    loadClients () {
      this.$api.clients.index()
      .then(({ data }) => {
        this.clients = data
      })
    },
    changeFormVisible () {
      this.showClientForm = !this.showClientForm
    },
    cancelClick () {
      this.changeFormVisible();
      this.errors = [];
    },
    checkForm () {
      this.errors = [];

      if (this.fullName.length < 5) {
        this.errors.push('Укажите имя.');
      }

      if (!this.email) {
        this.errors.push('Укажите электронную почту.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Укажите корректный адрес электронной почты.');
      }

      if (!this.errors.length) {
        return true;
      }
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    createClient () {
      if (this.checkForm()) {
        this.$api.clients.create(this.fullName, this.phone, this.email)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              this.clients.push({ email: this.email })
              this.fullName = ""
              this.phone = ""
              this.email = ""
              this.showClientForm = false
            }
          })
          .catch(() => (this.errors.push('Возникла ошибка при создании клиента на сервере')))
      }
    }
  },
  created () {
    this.loadClients()
  }
}
</script>
