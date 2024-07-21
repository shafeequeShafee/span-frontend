<template>
  <div id="app">
    <header v-if="isAuthenticated" class="header-container">
      <ul class="header-body-left">
        <li>{{ userDetails?.companyName }}</li>
      </ul>

      <ul class="header-body-right">
        <li>
          <img :src="logoutImg" @click="showLogoutModal" alt="logout" />
        </li>
        <li>
          <img :src="userDetails?.logoUrl" alt="logo" />
        </li>
        <li>
          <img :src="homeImg" alt="home" />
        </li>
        <li>
          <img :src="userImg" alt="user" />
        </li>
      </ul>
    </header>
    <div class="router-view-container">
      <router-view></router-view>
    </div>
    
    <LogoutModel
      v-if="isLogoutModalVisible"
      title="Confirm Logout"
      message="Are you sure you want to log out?"
      @confirm="logout"
      @close="closeLogoutModal"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import logoutImgPath from "./assets/images/turn-off.png";
import homeImgPath from "./assets/images/home.png";
import userImgPath from "./assets/images/user.png";
import LogoutModel from "./components/LogoutModel.vue";

export default {
  name: "App",
  components: {
    LogoutModel,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const logoutImg = ref(logoutImgPath);
    const homeImg = ref(homeImgPath);
    const userImg = ref(userImgPath);
    const isLogoutModalVisible = ref(false);

    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const userDetails = computed(() => store.getters.getUserDetails);
    console.log("userDetails", userDetails);

    const logout = async () => {
      closeLogoutModal();
      await store.dispatch("logout");
      router.push("/login");
    };
    const showLogoutModal = () => {
      isLogoutModalVisible.value = true;
    };
    const closeLogoutModal = () => {
      isLogoutModalVisible.value = false;
    };
    return {
      isAuthenticated,
      logout,
      userDetails,
      logoutImg,
      homeImg,
      userImg,
      isLogoutModalVisible,
      showLogoutModal,
      closeLogoutModal,
    };
  },
};
</script>

<style></style>
