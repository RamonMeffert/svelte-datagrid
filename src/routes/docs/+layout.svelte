<script lang=ts>
  import { page } from '$app/stores';

  type MenuItem = {
    name: string,
    url: string,
    pages?: MenuItem[],
  }

  const menuItems: MenuItem[] = [
    { 
      name: 'Getting started', 
      url: 'getting-started', 
      pages: [
        { name: 'Introduction', url: 'introduction' },
        { name: 'Installation', url: 'installation' }
      ]
    },
    {
      name: 'Basics',
      url: 'basics',
      pages: [
        { name: 'The DataGrid component', url: 'datagrid' },
        { name: 'The Column component', url: 'column' },
        { name: 'Pagination', url: 'pagination' },
      ]
    },
    {
      name: 'Data sources',
      url: 'data-sources',
      pages: [
        { name: 'Local data', url: 'local' },
        { name: 'Remote data', url: 'remote' },
      ]
    },
    {
      name: 'Customization',
      url: 'customization',
      pages: [
        { name: 'Stylesheets', url: 'stylesheets' }
      ]
    },
  ]
</script>

<div class="grid">
  <aside>
    <nav>
      <ul>
      {#each menuItems as item}
        {@const currentItem = $page.url.pathname.split('/')[2]}
        {@const currentPage = $page.url.pathname.split('/')[3]}
        <li>{item.name}</li>
        <li>
          <ul>
            {#each item.pages as page}
            {@const isCurrent = currentPage === page.url}
              <li>
                <a
                  class:current={isCurrent}
                  href="/docs/{item.url}/{page.url}">
                  {page.name}
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
      </ul>
    </nav>
  </aside>
  <div>
    <slot />
  </div>
</div>

<style scoped>
  aside {
    border-right: var(--border-width) solid var(--accordion-border-color);
    padding-top: var(--spacing);
    overflow-y: scroll;
  }

  aside a.current {
    color: var(--text);
  }

  aside a.current::after {
    content: ' •';
  }

  .grid {
    border-top: var(--border-width) solid var(--accordion-border-color);
    grid-template-columns: 250px 1fr;
  }
</style>