<template>
  <div id="app">
    <header v-if="isAuthenticated">
      <nav>
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><button @click="logout">Logout</button></li>
        </ul>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const logout = async () => {
      console.log("logout called");
      await store.dispatch("logout");
      router.push("/login");
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style></style>
