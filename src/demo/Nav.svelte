<script lang=ts>
  import GitHubIcon from "./GitHubIcon.svelte";
  import Icon from "./Icon.svelte";

  export let fluid: boolean = false;

  const version = __version__;
</script>

<nav class="container{fluid ? '-fluid' : ''}">
  <ul>
    <li>
      <a class="contrast" href="/">
        <Icon />
        <strong>svelte-datagrid</strong>
      </a>
      <small>v{version}</small>
    </li>
  </ul>
  <ul>
    <li><a href="/demo">Demo</a></li>
    <li><a href="/docs">Documentation</a></li>
    <li><a target="_blank" href="https://github.com/RamonMeffert/svelte-datagrid"><GitHubIcon /></a></li>
  </ul>
</nav>