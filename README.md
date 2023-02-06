# Game-On-Project - The Hangman Game

I created a hangman game using HTML, CSS, and JavaScript. Logics of the game are below: 


* * Game Logic: Hangman provides user/player with two categories. The categories are two arrays of NBA teams & African countries. Once a category is selected, the computer chooses a word and provides a hint from the corressponding category.
* * User guesses the chosen word using the letter buttons provided on the screen. The user has 7 wrong attemps before he/she looses the game. 
* * Each key pressed counts towards total guesses allowed. A correct letter/guess pressed replaces the empty dashes, and a wrong letter/guess draws a hang man. 
* * If the user/player guesses correct, display/log a winning message. If not (else), we display/log a lost message & 'New Game' start button. 


First build the HTML & add Stylessheet and Script to it 
In the HTML: Display Flex - Two sides 
Left Side:
Two Categories 
New game button (reloads at end of each game)
Alphabets/letters
___ dashes for inputs 

Right Side: Draw the Hangman 


Right Side:
Canvas - hangman/canvas draw anytime a user/player selects a wrong letter


* First set H1 and H3
    <h1>The Hangman Game</h1>
    <h3>Please Select Your Category</h3>

* Set  <div>main-container</div>
        
* Set left <div></div> 
    Lives remaining 
    Categories Container 
    Alphabets Container 
    Player Inputs 
    Word Hint 
    Dashes ____ for inputs 
    New Game button 
    Games Results text


* Set right  <div></div>
     <img class="man-hanging" for drawings when player inputs wrong word
    



JavaScript: 
Set Category Array NBA Teams
    Category Array African Countries 


Things to work on:
Need to work on reset function 
- give a user an option/message to choose a new category once game restarts 
