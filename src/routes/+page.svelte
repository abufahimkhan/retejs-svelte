<script>
	import { onMount } from "svelte";
	/**
	 * @type {HTMLElement}
	 */
	let el;

	onMount(async () => {
	  const { createEditor } = await import("../lib/rete/createEditor");
	  createEditor(el);
	});
</script>

<div class="rete" bind:this={el} ></div>


<style>
	.rete {
	  position: relative;
	  width: 100vw;
	  height: 100vh;
	  font-size: 1rem;
	  text-align: left;
	  border: 1px solid #cbd0db;
	}

	:global(body) {
	  margin: 0;
	  overflow: hidden;
	}
</style>
