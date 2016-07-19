export default {
	template: `
	<div class="alert alert-{{ alert.status }} text-center" role="alert">
		<span class="fa" :class="'fa-danger' : alert.status == 'danger'" aria-hidden="true"></span>
		<span class="sr-only">Error:</span>
		{{ alert.message }}
		<a href="#" class="pull-right" @click.prevent="this.$parent.hideAlert()">&times;</a>
	</div>
	`,
	props: {
		alert: {}
	}
}
