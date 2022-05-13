<template>
  <div class="container">
    <header class="jumbotron">
      <h1>{{ content }}</h1>
      <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod purus a nisi placerat, ac pulvinar est
        pulvinar. Integer volutpat libero ac quam aliquam pulvinar. Duis sit amet nunc elementum, vehicula lectus ut,
        commodo mi. Maecenas eleifend vel sem vitae congue. Aliquam pulvinar, purus eu molestie viverra, mi quam
        facilisis est, non pharetra mi nulla vitae enim. Praesent sit amet auctor neque. Mauris vulputate velit nibh, ac
        sodales erat tincidunt eu. Duis pellentesque porttitor lacus, sit amet malesuada nibh vehicula vel. Pellentesque
        ut est egestas risus ultricies suscipit. Morbi libero nisl, tempor vel nibh a, tempor molestie nisl.</p>

      <p>Nullam orci ante, maximus vel tempor cursus, fermentum ac ante. In vitae porta felis. Curabitur id rutrum
        lorem. Morbi consequat nisi hendrerit lobortis lobortis. Quisque pellentesque pharetra dui, id lobortis odio
        tempor in. Nunc semper quam metus, eget laoreet neque suscipit vitae. Sed risus lacus, eleifend eu iaculis eget,
        semper ut enim. Duis at cursus ex. Pellentesque sed gravida quam, non finibus ante. In pharetra nunc a turpis
        iaculis, id commodo mi pretium. Donec tristique commodo odio quis volutpat. Nullam malesuada ligula vel diam
        congue imperdiet. Ut cursus efficitur lacus, vel scelerisque eros. Nunc at volutpat urna. </p>

      <p class="lead">
        <a class="btn btn-primary btn-lg" href="/register" role="button">Become a driver</a> &nbsp; <a
          class="btn btn-secondary btn-lg" href="/login" role="button">Login</a>
      </p>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "UserHome",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
  },
};
</script>
