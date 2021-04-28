(function () {
    let sensitivity = 80;

    // Listen to clicks on the reset
    const sensitivityRange = document.getElementById('sensitivity-range');
    const sensitivityValue = document.getElementById(`sensitivity-value`);
    if (sensitivityRange) {
        sensitivityValue.innerText = sensitivity;
        sensitivityRange.value = sensitivity;
        sensitivityRange.addEventListener('change', (e) => {
            sensitivity = e.target.value;
            sensitivityValue.innerText = e.target.value;
        });
    }

    // Listen to clicks on the click here area
    const clickHere = document.getElementById('click-here');
    let prevTime = {};
    let clickCounter = {};
    let doubleClickCounter = {};
    function logClick(e) {
        var currentTime = performance.now();
        if (currentTime - prevTime[e.button] <= sensitivity) {
            console.log('Double Click!');
            if (!doubleClickCounter[e.button]) {
                doubleClickCounter[e.button] = 0;
            }
            doubleClickCounter[e.button] += 1;
            document.getElementById(`button-${e.button}-double`).innerText = doubleClickCounter[e.button];
            document.getElementById(`button-${e.button}-status`).innerText = 'Failed';
            document.getElementById(`button-${e.button}`).style.backgroundColor = '#fe6d73';
            document.getElementById(`button-${e.button}`).style.color = '#ffffff';
            document.getElementById(`button-${e.button}-title`).style.backgroundColor = '#fe2027';
        }
        prevTime[e.button] = currentTime;

        if (!clickCounter[e.button]) {
            clickCounter[e.button] = 0;
        }
        clickCounter[e.button] += 1;
        document.getElementById(`button-${e.button}-normal`).innerText = clickCounter[e.button];
    }
    if (clickHere) {
        clickHere.addEventListener('mousedown', logClick);
    }

    // Listen to clicks on the reset
    const resetBtn = document.getElementById('reset');
    if (resetBtn) {
        resetBtn.addEventListener('mousedown', (_) => location.reload());
    }

    // Write out copyright year
    document.getElementById('copyright-year').innerText = new Date().getFullYear() + ' ';
})();
