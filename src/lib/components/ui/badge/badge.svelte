<script lang="ts">
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { HTMLDivAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	const badgeVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

	type BadgeProps = WithoutChildrenOrChild<HTMLDivAttributes> & {
		variant?: BadgeVariant;
	};

	let {
		class: className,
		variant = "default",
		...restProps
	}: BadgeProps = $props();
</script>

<div
	data-slot="badge"
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
