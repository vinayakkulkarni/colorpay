<style scoped>
[v-cloak] > * { display:none }
[v-cloak]::before { content: "Loading…" }
</style>
<template>

</template>
<script>
export default {
	mounted() {
		console.log('Successfully Mounted');
	},
	data() {
		return {
			stripe_id: null,
			
		}
	}
}
</script>