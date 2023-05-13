<script lang="ts">
  import slug from 'slug';

  export let level: string;
  export let content: string;

  let linkSlug = slug(content);
</script>

<svelte:element this={level} id={linkSlug}><a href="#{linkSlug}">#</a> {content}</svelte:element>
