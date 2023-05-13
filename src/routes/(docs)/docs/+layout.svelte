<script lang="ts">
  import { page } from '$app/stores';
  import '@picocss/pico/css/pico.min.css';
  import 'svelte-highlight/styles/github-dark.css';
  import DevWarning from '$demo/DevWarning.svelte';
  import Nav from '$demo/Nav.svelte';
  import Footer from '$demo/Footer.svelte';

  const version = __version__;

  type MenuItem = {
    name: string;
    url: string;
    pages?: MenuItem[];
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Getting started',
      url: 'getting-started',
      pages: [
        { name: 'Introduction', url: 'introduction' },
        { name: 'Installation', url: 'installation' },
      ],
    },
    {
      name: 'Basics',
      url: 'basics',
      pages: [
        { name: 'Setup', url: 'setup' },
        { name: 'Pagination', url: 'pagination' },
        { name: 'Search', url: 'search' },
        { name: 'Sorting', url: 'sorting' },
      ],
    },
    {
      name: 'Data sources',
      url: 'data-sources',
      pages: [
        { name: 'Local data', url: 'local' },
        { name: 'Remote data', url: 'remote' },
      ],
    },
    {
      name: 'Customization',
      url: 'customization',
      pages: [{ name: 'Stylesheets', url: 'stylesheets' }],
    },
  ];
</script>

<DevWarning />
<Nav fluid />
<div class="container-fluid">
  <div class="grid">
    <aside>
      <nav>
        <ul>
          {#each menuItems as item}
            {@const currentItem = $page.url.pathname.split('/')[2]}
            {@const currentPage = $page.url.pathname.split('/')[3]}
            <li class="title">{item.name}</li>
            {#if item.pages}
              <li>
                <ul>
                  {#each item.pages as page}
                    {@const isCurrent = currentPage === page.url}
                    <li>
                      <a class:current={isCurrent} href="/docs/{item.url}/{page.url}">
                        {page.name}
                      </a>
                    </li>
                  {/each}
                </ul>
              </li>
            {/if}
          {/each}
        </ul>
      </nav>
    </aside>
    <main>
      <slot />
    </main>
  </div>
</div>

<Footer />

<style scoped>
  .grid {
    border-top: var(--border-width) solid var(--accordion-border-color);
    grid-template-columns: 200px 1fr;
  }

  aside {
    padding-top: var(--spacing);
    overflow-y: scroll;
    align-self: start;
    position: sticky;
    top: 0;
  }

  aside a.current {
    color: var(--text);
  }

  aside a.current::after {
    content: ' •';
  }

  aside li ul {
    margin-top: 0;
  }

  aside li.title {
    text-transform: lowercase;
    font-variant: small-caps;
    padding-block-end: 0;
  }

  main {
    border-left: var(--border-width) solid var(--accordion-border-color);
    padding: var(--block-spacing-vertical) 0;
    padding-left: var(--spacing);
    max-width: 80ex;
  }
</style>
