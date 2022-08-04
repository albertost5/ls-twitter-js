// HTML ELEMENTS
const form = document.querySelector('#form');
const tweetsList = document.querySelector('#tweets-list');
const tweetTextArea = document.querySelector('#tweet');
let tweets = [];


eventListeners();

// EVENTS
function eventListeners() {
    form.addEventListener('submit', addTweet );
    form.addEventListener('keypress', (e) => {
        if(e.keyCode === 13) {
            addTweet(e);
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        let tweetsLocalStorage = localStorage.getItem('tweets');

        // Get data from localStorage to tweetsArray
        if( tweetsLocalStorage ) {
            tweets = JSON.parse( tweetsLocalStorage );
            printTweetsHtml();
        }
    });
}

// FUNCTIONS
function addTweet( e ) {
    e.preventDefault();

    const tweetContent = tweetTextArea.value;
    
    if( !tweetContent.trim() ) {
        printErrorHtml('The content couldnt be blank.')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweetContent
    }

    tweets = [...tweets, tweetObj];

    console.log(tweets);

    printTweetsHtml();

    form.reset();
}

function printErrorHtml( message ) {
    const pError = document.createElement('p');
    pError.textContent = message;
    pError.classList.add('error');

    const contentDiv = document.querySelector('#content');
    contentDiv.appendChild( pError );

    // Delete validation after 2 secs
    setTimeout(() => {
        pError.remove();
    }, 2000 );
}

function printTweetsHtml() {

    clearTweetsList();

    if( tweets.length > 0 ) {
        tweets.forEach( t => {
            // Add delete anchor
            const deleteTweetA = document.createElement('a');
            deleteTweetA.classList.add('delete-tweet');
            deleteTweetA.textContent = 'X';

            deleteTweetA.onclick = () => {
                deleteTweet(t.id);
            }

            const tweetLi = document.createElement('li');
            tweetLi.textContent = t.tweetContent;

            tweetLi.appendChild( deleteTweetA );

            tweetsList.appendChild( tweetLi );
        });
    }

    syncStorage();
}

function clearTweetsList() {
    while( tweetsList.firstChild ) {
        tweetsList.removeChild( tweetsList.firstChild );
    }
}

function syncStorage() {
    localStorage.setItem('tweets', JSON.stringify( tweets) );
}

function deleteTweet( tweetId ) {
    // Update tweetArray and localStorage data
    tweets = tweets.filter( e => e.id !== tweetId );
    localStorage.setItem( 'tweets', JSON.stringify( tweets) );
    printTweetsHtml();
}
    

