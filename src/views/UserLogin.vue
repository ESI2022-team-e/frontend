<template>

  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-lg-5 col-md-5 col-sm-12">

      <!-- Card -->
      <div class="card h-100 login-card">
        <div class="card-header bg-dark text-white">
          <i class="fa-solid fa-user-lock"></i> User Login!
        </div>
        <div class="card-body">
          <h4 class="card-title"> Login here!</h4>

          <Form @submit="handleLogin" :validation-schema="schema">
            <div class="form-group">
              <label for="username">Username</label>
              <Field name="username" type="text" class="form-control"/>
              <ErrorMessage name="username" class="error-feedback"/>
            </div>


            <div class="form-group">
              <label for="password">Password</label>
              <Field name="password" type="password" class="form-control"/>
              <ErrorMessage name="password" class="error-feedback"/>
            </div>

            <div class="form-group">
              <button class="btn btn-success btn-block" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
                <span>Login</span>
              </button>
            </div>

            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </Form>
        </div>
        <div class="card-footer text-muted">
          <router-link to="/register" class="nav-link">
            <i class="fa-solid fa-user-plus"></i> New Driver? Register here!
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
  name: "UserLogin",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
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


</style>