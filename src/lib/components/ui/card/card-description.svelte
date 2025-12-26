<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLParagraphAttributes } from "svelte/elements";

	type $$Props = HTMLParagraphAttributes & {
		class?: string;
	};

	let { class: className, ...restProps }: $$Props = $props();
</script>

<p
	data-slot="card-description"
	class={cn("text-sm text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</p>
