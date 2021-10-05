<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
:root {
  --dark-color: hsl(var(--hue), 100%, 9%);
  --light-color: hsl(var(--hue), 95%, 98%);
  --base: hsl(var(--hue), 95%, 50%);
  --complimentary1: hsl(var(--hue-complimentary1), 95%, 50%);
  --complimentary2: hsl(var(--hue-complimentary2), 95%, 50%);

  --font-family: "Poppins", system-ui;

  --bg-gradient: linear-gradient(
    to bottom, hsl(350, 100%, 9%)
    hsl(var(--hue), 95%, 99%),
    hsl(var(--hue), 95%, 84%)
  );
}


@import "./assets/scss/main.scss";
main{
background-image: url('https://media.istockphoto.com/photos/colorful-background-picture-id1280385511?b=1&k=20&m=1280385511&s=170667a&w=0&h=4-KMkIqgyw2gTBMTBbYZVZoidwRsWZzr3q0xyUDYhas=');
background-size: cover;
background-repeat: none;
// color: var(--dark-color);
// background: linear-gradient(90deg, #EECDA3, #EF629F);
font-family: 'Inter', sans-serif;
}
</style>
