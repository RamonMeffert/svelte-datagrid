<script lang="ts">
  import '@picocss/pico/css/pico.min.css';
  import 'svelte-highlight/styles/github-dark.css';
  import DevWarning from '$demo/DevWarning.svelte';
  import Nav from '$demo/Nav.svelte';
  import Footer from '$demo/Footer.svelte';
</script>

<DevWarning />
<Nav />
<slot />
<Footer />
