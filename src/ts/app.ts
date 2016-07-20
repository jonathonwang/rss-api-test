// Import Sass -- Separated at Compile Time
import '../sass/app.scss';

// Import NPM Dependencies
import * as Vue from 'vue';


// Import Components
import Alert from './alert.ts';
import Talklist from './talk-list.ts';
import Loader from './loader.ts';

// Make sure google can be used globally,
// since we are loading up as separate script
declare const google;
google.load('feeds','1');

( () => {
	const VueContainer = new Vue({
		el: 'html',
		data: {
			title: 'TED Talks Feed',
			subtitle: 'Explore Recent TED Talks'
			feedUrl: 'http://feeds.feedburner.com/TEDTalks_video',
			feed: [],
			selectedEntry: {},
			entriesPerPage: 10,
			inc: 2,

			alert: { visibility: false, message: '', status: ''}
		},
		components: {
			Alert,
			Talklist,
			Loader
		},
		methods: {
			// Load Up Initial Feed Entries
			initialize():void {
				let feed = new google.feeds.Feed(this.feedUrl);
				feed.setNumEntries(this.entriesPerPage);
				feed.load(
					(request):void => {
						// Successful Request
						if(request.status.code == 200){
							this.feed = request.feed.entries;
						}
						// Failed Request
						else {
							this.showAlert('danger','Cannot Load Feed, Please Try Again Later');
						}
					}
				)
			},
			// Select Entry to Make Active
			selectEntry(entry: Object):void {
				this.selectedEntry == entry ? this.selectedEntry = {} : this.selectedEntry = entry;
			},
			// Load Additional Feed Entries
			loadMoreEntries(): void {
				let feed: any = new google.feeds.Feed(this.feedUrl);
				feed.setNumEntries(this.entriesPerPage * this.inc);
				feed.load(
					(request):void => {
						// Successful Request
						if(request.status.code == 200){
							let requestLength: number = request.feed.entries.length;
							let prevFeed: Array<Object> = request.feed.entries.slice(requestLength - 10);
							this.feed.push(...prevFeed);
							this.inc++;
						}
						// Failed Request
						else{
							this.showAlert('danger','Cannot Load Feed, Please Try Again Later');
						}
					}
				)
			},
			// Display Alert
			showAlert(status, message) {
				this.alert.visibility = true;
				this.alert.status = status;
				this.alert.message = message;
			},
			// Hide Alert
			hideAlert(){
				this.alert.visibility = false;
			}
		},
		ready(){
			// Make sure google is loaded up before
			// running initialize() method
			google.setOnLoadCallback(this.initialize);
		}
	});

})();
