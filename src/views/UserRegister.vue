<template>

  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-lg-5 col-md-5 col-sm-12">

      <!-- Card -->
      <div class="card h-100 login-card">
        <div class="card-header bg-dark text-white">
          <i class="fa-solid fa-user-plus"></i> Become a driver!
        </div>
        <div class="card-body">
          <h4 class="card-title"> User Registration!</h4>

          <Form @submit="handleRegister" :validation-schema="schema">
            <div v-if="!successful">
              <div class="form-group">
                <label for="username">Username</label>
                <Field name="username" type="text" class="form-control"/>
                <ErrorMessage name="username" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control"/>
                <ErrorMessage name="email" class="error-feedback"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <Field name="password" type="password" class="form-control"/>
                <ErrorMessage name="password" class="error-feedback"/>
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
              ></span>
                  Register!
                </button>
              </div>
            </div>
          </Form>

          <div
              v-if="message"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
        <div class="card-footer text-muted">
          <router-link to="/login" class="nav-link">
            <i class="fa-solid fa-user-lock"></i> Existing Driver? Login here!
          </router-link>
        </div>
      </div>
      <!-- /Card -->
    </div>
  </div>

</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

export default {
  name: "UserRegister",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for user name")
          .max(20, "Must be maximum 20 characters!"),
      email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
      password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            this.successful = false;
            this.loading = false;
          }
      );
    },
  },
};
</script>

<style scoped>

.row {
  height: 100vh;
}

label {
  display: block;
  margin-top: 10px;
}


.error-feedback {
  color: #842029;
}

.btn-primary.btn-block {
  background-color: #34d484;
  border-color: #34d484;
}

</style>