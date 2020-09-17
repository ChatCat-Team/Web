<template>
  <div style="position: relative; height: 100%">
    <v-app-bar flat extended extension-height="132px">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">ChatCat</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white">
        <v-icon size="large">mdi-scan-helper</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="mt-12">
        <v-list-item>
          <v-avatar size="96" class="my-4">
            <v-img
              src="https://file.lifeni.life/avatar.jpg"
              alt="Your Avatar"
            ></v-img>
          </v-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">Your Name</v-list-item-title>
            <v-list-item-subtitle>Your Description</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-text-field
      outlined
      flat
      clearable
      type="number"
      label="Join A Chat Room"
      prepend-inner-icon="mdi-magnify"
      hint="Currently In Beta, For Testing Only."
      persistent-hint
      class="mx-4"
      style="margin-top: -120px"
    >
    </v-text-field>
    <v-main>
      <v-toolbar flat>
        <v-icon>mdi-view-dashboard</v-icon>
        <v-toolbar-title class="mx-4 text-body-1">Chat Room</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="scroll">
        <v-sheet class="sheet">
          <v-card elevation="0" class="card">
            <v-img class="image white--text" src="svg/Create.svg">
              <v-card-title class="text-subtitle-2">New Chatroom</v-card-title>
            </v-img>
          </v-card>

          <v-card
            v-for="(room, index) in roomList"
            :key="index"
            class="card"
            elevation="0"
          >
            <v-img
              class="image white--text"
              :src="
                room.status === 0
                  ? 'svg/Processing.svg'
                  : room.status === 1
                  ? 'svg/Closed.svg'
                  : 'svg/Error.svg'
              "
            >
              <v-card-title class="text-subtitle-2">{{
                room.name
              }}</v-card-title>
            </v-img>
          </v-card>
        </v-sheet>
      </div>

      <v-toolbar flat>
        <v-icon>mdi-account-box</v-icon>
        <v-toolbar-title class="mx-4 text-body-1"
          >Recent Contact</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>

      <div class="scroll">
        <v-sheet class="sheet">
          <v-avatar
            v-for="(name, i) in nameList"
            :key="i"
            size="64"
            color="accent"
            class="avatar text-button cyan lighten-2"
          >
            {{ name.slice(0, 3).toUpperCase() }}
          </v-avatar>
        </v-sheet>
      </div>

      <v-toolbar flat>
        <v-icon>mdi-bullhorn</v-icon>
        <v-toolbar-title class="mx-4 text-body-1"
          >Bulletin Board</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-responsive :aspect-ratio="16 / 9">
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          height="100%"
        >
          <v-carousel-item>
            <v-sheet height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <v-img
                  src="no_announcement.png"
                  class="align-center text-center"
                >
                </v-img>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-responsive>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} © <strong>ChatCat-Team</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<style scoped>
.image {
  width: 100%;
  height: 100%;
}

.scroll {
  width: 100vw;
  overflow: auto hidden;
}

.sheet {
  min-width: 100%;
  height: auto;
  padding: 8px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.sheet.wrap {
  flex-wrap: wrap;
}

.card {
  width: 150px;
  height: 150px;
  margin: 8px;
}

.avatar {
  margin: 8px;
}
</style>

<script>
export default {
  layout: 'default',
  data: () => ({
    drawer: false,
    roomList: [
      { name: 'Example Room', status: 0 },
      { name: 'Bad Room', status: -1 },
      { name: 'Closed Room', status: 1 },
    ],
    nameList: ['Tonya', 'Simons', 'Harry', 'Vincent', 'Roscoe', 'Pearson'],
    slideList: ['Example Slide 1', 'Example Slide 2'],
  }),
}
</script>
