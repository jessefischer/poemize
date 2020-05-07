const poemLength = 12;
const lineMin = 3;
const lineMax = 12;

// When page is loaded,
window.onload = function() {
    // Set the submit function for the form.
    document.getElementById( 'poemize-form' ).onsubmit = function() {
        document.getElementById( 'results' ).innerHTML =
            generatePoem( document.getElementById( 'corpus' ).value,
            poemLength );
    }
}


// Parse string into array of words, forcing lowercase and stripping punctuation.
const parseText = (text) => text.replace( /[A-Z]/g, c => c.toLowerCase() )
                                .replace( /[.:\',?-]/g, '' )
                                .match( /\S+/g );

                                
const generateWordPairs = (text) => {
    let dict = {};
    let parsedText = parseText( text );
    for ( let i=0; i < parsedText.length - 1; i++ ) {
        if ( parsedText[i] in dict ) {
            dict[ parsedText[i] ].push( parsedText[ i+1 ] );
        }
        else {
            dict[ parsedText[i] ] = [ parsedText[ i+1 ] ];
        }
    }
    return dict;
}

const pickFollowingWord = ( word, markovChain ) => {
    if ( word in markovChain ) {
        let possibilities = markovChain[ word ];
        return possibilities[ Math.floor( Math.random() * possibilities.length ) ];
    }
    else {
        return undefined;
    }
}

const pickStartingWord = ( markovChain ) => {
    let keys = Object.keys( markovChain );
    return keys[ Math.floor( Math.random() * keys.length ) ];
}

const writeLine = ( markovChain, n ) => {
    let line = [], currentWord = '';
    for ( let i = 0; i < n; i++ ) {
        currentWord = pickFollowingWord( currentWord, markovChain ) ||
            pickStartingWord( markovChain );
        line.push( currentWord );
        }
    return line.join( " " ).replace( /^\w/, c => c.toUpperCase() );
}

const generatePoem = ( corpus, lineCount ) => {
    let chain = generateWordPairs( corpus );
    let poem = [];
    for ( let i=0; i < lineCount; i++ ) {
        let wordCount = lineMin + Math.floor( Math.random() * (lineMax - lineMin) );
        poem.push( writeLine( chain, wordCount ) );
    }
    return poem.join( '<br>' );
}

console.log( generatePoem( poem2, 12 ) );