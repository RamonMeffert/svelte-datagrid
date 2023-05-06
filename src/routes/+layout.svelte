<script lang="ts">
  import '@picocss/pico/css/pico.min.css';
  import 'svelte-highlight/styles/github-dark.css';

  let version = __version__;
</script>

<nav class=container-fluid>
  <ul>
    <li><a class=contrast href="/"><strong>svelte-datagrid</strong></a> <small>v{version}</small></li>
  </ul>
  <ul>
    <li><a href="/demo">Demo</a></li>
    <li><a href="/docs">Documentation</a></li>
    <li><a href="https://github.com/RamonMeffert/svelte-datagrid">Github</a></li>
  </ul>
</nav>
<div class=container-fluid>
  <slot />
</div>