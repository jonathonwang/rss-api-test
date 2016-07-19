export default {
	template: `
	<div class="row feed__container">
		<!-- Image / Video Content Area -->
		<div class="feed__header" :class="{ 'col-lg-7 col-md-7 col-sm-12 col-xs-12' : this.$parent.selectedEntry == entry, 'col-lg-4 col-md-4 col-sm-12 col-xs-12' : this.$parent.selectedEntry !== entry }">
			<!-- Video -->
			<video :src="entry.mediaGroups[0].contents[0].url" v-if="this.$parent.selectedEntry == entry" transition="fade" transition-mode="out-in" autoplay controls></video>
			<!-- Image -->
			<img class="img-responsive" :src="entry.mediaGroups[0].contents[0].thumbnails[0].url" transition="fade" transition-mode="out-in" v-else alt="" @click.prevent="this.$parent.selectEntry(entry)">
		</div>
		<!-- Text / Btn Content Area -->
		<div class="feed__content" :class="{ 'col-lg-5 col-md-5 col-sm-12 col-xs-12' : this.$parent.selectedEntry == entry, 'col-lg-8 col-md-8 col-sm-12 col-xs-12' : this.$parent.selectedEntry !== entry }">
			<h3>
				<strong>{{ entry.title }}</strong>
				<br>
				<small>
					<span class="fa fa-calendar fa-xs"></span> 
					{{ entry.publishedDate }}
					<br>
					<span v-for="category in entry.categories" class="badge badge-default">{{ category }}</span> 
				</small>
			</h3>
			<!-- Show Snippet If not Selected -->
			<p v-if="entry !== this.$parent.selectedEntry">{{{ entry.contentSnippet }}}</p>
			<!-- Show Entire Content if Selected -->
			<p v-else>{{{ entry.content }}}</p>
			<!-- Show Link if Selected -->
			<a v-if="entry == this.$parent.selectedEntry" :href="entry.link" target="_blank">Learn More</a>
			<div class="btn-row">
				<!-- Upper Right Corner Plus Btn -->
				<a :href="entry.link" class="btn btn-primary btn-action btn-md" :class="{ 'rotate-45' : this.$parent.selectedEntry == entry }" @click.prevent="this.$parent.selectEntry(entry)">+</a>
			</div>
			<br>
		</div>
	</div>
	`,
	props: {
		entry: {}
	}
}
