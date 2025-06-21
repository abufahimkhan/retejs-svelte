<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let el: HTMLElement;
	let editor: { destroy: () => void } | undefined;

	onMount(async () => {
		// Run only in the browser
		if (browser) {
			// This is the CORRECT import path
			const { createEditor } = await import('$lib/rete/createEditor');
			editor = await createEditor(el);
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<main>
	<h1>Rete.js v2 in SvelteKit (Error-Free)</h1>
	<div bind:this={el} class="rete-container"></div>
</main>

<style>
	/* Import the correct CSS for the Rete.js v2 plugins */
	@import 'rete-svelte-plugin/styles.css';
	@import 'rete-connection-plugin/styles.css';
	@import 'rete-area-plugin/styles.css';

	.rete-container {
		width: 100%;
		height: 90vh;
		background: #222;
		border-radius: 10px;
	}

	main {
		padding: 1rem;
		box-sizing: border-box;
	}

	h1 {
		color: white;
	}
</style>