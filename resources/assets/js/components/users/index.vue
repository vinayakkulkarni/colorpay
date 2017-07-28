<style scoped>
[v-cloak] > * { display:none }
[v-cloak]::before { content: "Loading…" }
.body {
	background: linear-gradient(#2AEEFF,#5580EB) no-repeat 50% fixed !important;
	background-size: cover !important;
}
</style>
<template>
<h3 class="ui dividing header">{{ message }}</h3>
</template>
<script>
export default {
	created() {

	},
	mounted() {
		console.log('ABC');
	},
	data() {
		return {
			message: 'YOLO'
		}
	}
}
</script>