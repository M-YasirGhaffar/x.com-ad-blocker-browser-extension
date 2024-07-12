if (typeof window.adRemoverInitialized === 'undefined') {
    window.adRemoverInitialized = true;

    function removeAdDivs() {
        const divsWithTestId = document.querySelectorAll('div[data-testid="cellInnerDiv"]');
        let count = 0;
        divsWithTestId.forEach(div => {
            const spans = div.getElementsByTagName('span');
            for (let span of spans) {
                if (span.textContent.trim().toLowerCase() === 'ad') {
                    div.style.display = 'none';
                    count++;
                    break;
                }
            }
        });
        if (count > 0) {
            console.log(`${count} ad div(s) hidden.`);
        }
        return count;
    }

    window.adRemoverDebounceTimer = null;
    function debounce(func, delay) {
        clearTimeout(window.adRemoverDebounceTimer);
        window.adRemoverDebounceTimer = setTimeout(func, delay);
    }

    const observer = new MutationObserver(() => {
        debounce(removeAdDivs, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial check
    removeAdDivs();
}