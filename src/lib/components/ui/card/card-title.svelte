<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLHeadingAttributes } from "svelte/elements";

	type $$Props = HTMLHeadingAttributes & {
		class?: string;
	};

	let { class: className, ...restProps }: $$Props = $props();
</script>

<h3
	data-slot="card-title"
	class={cn("font-semibold leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children?.()}
</h3>
