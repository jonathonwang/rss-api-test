export default {
	template: `
	<div class="row feed__container">
		<div class="feed__header" :class="{ 'col-lg-7 col-md-7 col-sm-12 col-xs-12' : this.$parent.selectedEntry == entry, 'col-lg-4 col-md-4 col-sm-12 col-xs-12' : this.$parent.selectedEntry !== entry }">
			<video :src="entry.mediaGroups[0].contents[0].url" v-if="this.$parent.selectedEntry == entry" transition="fade" transition-mode="out-in" autoplay controls></video>
			<img class="img-responsive" :src="entry.mediaGroups[0].contents[0].thumbnails[0].url" transition="fade" transition-mode="out-in" v-else alt="" @click.prevent="this.$parent.selectEntry(entry)">
		</div>
		<div class="feed__content" :class="{ 'col-lg-5 col-md-5 col-sm-12 col-xs-12' : this.$parent.selectedEntry == entry, 'col-lg-8 col-md-8 col-sm-12 col-xs-12' : this.$parent.selectedEntry !== entry }">
			<h3><strong>{{ entry.title }}</strong></h3>
			<p v-if="entry !== this.$parent.selectedEntry">{{{ entry.contentSnippet }}}</p>
			<p v-else>{{{ entry.content }}}</p>
			<!-- <p> -->
				<!-- <span v-for="category in entry.categories" class="badge badge-default">{{ category }}</span> -->
			<!-- </p> -->
			<div class="btn-row">
				<a :href="entry.link" target="_blank" class="btn btn-primary btn-action btn-md" :class="{ 'rotate-45' : this.$parent.selectedEntry == entry }" @click.prevent="this.$parent.selectEntry(entry)">+</a>
			</div>
			<br>
		</div>
	</div>
	`,
	props: {
		entry: {}
	}
}
