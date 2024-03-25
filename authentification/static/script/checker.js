var flags = ['FtF{xeRPAVQCOxORCutTCOxTCzFS}', 'FtF{T@p04eK_5oG@}'];

function check(){
    const input = document.getElementById('answer');
    const value = input.value;
    if (value === flags[0] || value === flags[1]){
        document.getElementById('res').innerHTML='Похоже вы нашли это!';
    } else {
        document.getElementById('res').innerHTML='Кажется это не то...';
    }
}