document.querySelector('.start__button').addEventListener('click', () => {
    let user = document.getElementById('user');
    if (user.value == '') {
        alert('Заполните имя.')
    } else {
        startGame(user.value);
    }
});


function startGame(nameUser) {
    const startGame = document.querySelector('.start__user')
    startGame.style.display = 'none';
    const gamePole = document.getElementById('gamePole');
    gamePole.style.display = 'block';
    const gameBox = document.getElementById('gameBox');

    let score = 0
    let fail = 0
    let dataNameUser = document.getElementById('dataNameUser');
    dataNameUser.innerText = "Имя: " + nameUser;
    let dataScoreUser = document.getElementById('dataScoreUser');
    dataScoreUser.innerText = "Очки: " + score;

    // Корзина
    let busket = document.getElementById('busket');
    let busketX = busket.style.marginLeft = 0
    let busketY = busket.style.marginTop = 40
    busket.style.marginTop = busketY + '%';

    document.addEventListener('keydown', (event) => {
        // console.log(event.key)
        if (event.key == 'ArrowRight' && busketX < 1500) {
            busket.style.marginLeft = busketX + 5 + '%'
            busketX += 5
        }
        if (event.key == 'ArrowLeft' && busketX > 0) {
            busket.style.marginLeft = busketX - 5 + '%'
            busketX -= 5
        }
    });


    // money script

    function createMoney() {
        let newMoney = document.createElement('div')
        newMoney.classList.add('game__money')
        newMoney.innerHTML = "<img src=\"./img/money.png\">";
        newMoney.style.marginLeft = getRandomArbitrary() * 10 + '%';
        newMoney.style.marginTop = 0 + '%'
        gameBox.appendChild(newMoney);
    }


    function getRandomArbitrary() {
        return Math.floor(Math.random() * (10 - 0) + 0);
    }




    const gameEngineInterval = setInterval(() => {
        arrMoney = document.querySelectorAll('.game__money');
        let valueY = 1;
        arrMoney.forEach(element => {
            let nowPositionY = parseInt(element.style.marginTop)
            // console.log(nowPositionY)
            element.style.marginTop = nowPositionY + valueY + '%'
            if (parseInt(element.style.marginLeft) == busketX && parseInt(element.style.marginTop) == busketY) {
                score += 1
                element.remove();
                // console.log('score - ' + score)
                dataScoreUser.innerText = "Очки: " + score;
            } else if (parseInt(element.style.marginTop) > 50) {
                fail += 1
                element.remove()
                // console.log('fail - ' + fail)
            }
            if (fail == 3) {
                clearInterval(gameEngineInterval);
                clearInterval(createMoneyInterval);
                window.location.reload();
                alert('Конец Игры \n Ваш счёт: ' + score);
                
            }
        });
    }, 100);

    const createMoneyInterval = setInterval(() => {
        createMoney();
    }, 3000)

    // gameEngineInterval();
    // createMoneyInterval();

    // setInterval(() => {
    //     if (fail == 3) {
    //         clearInterval(gameEngineInterval);
    //         clearInterval(createMoneyInterval);
    //         alert('Конец Игры <br> Ваш счёт: ' + score);
    //         window.location.reload();
    //     }
    // }, 10)
}

