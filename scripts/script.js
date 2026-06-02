document.addEventListener('DOMContentLoaded', function () {
    function addCopyButton(codeElement) {
        if (codeElement.nextElementSibling && codeElement.nextElementSibling.classList.contains('copy-button')) {
            return;
        }

        var text = codeElement.innerText;

        var button = document.createElement("button");
        button.classList.add("copy-button");
        button.innerHTML = "Copy to Clipboard";

        button.addEventListener("click", function () {
            var textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            navigator.clipboard.writeText(text).then(function () {
                button.innerHTML = "Copied!";
                setTimeout(function () {
                    button.innerHTML = "Copy to Clipboard";
                }, 2000);
            }).catch(function (err) {
                alert("Failed to copy: " + err);
            });
            document.body.removeChild(textarea);
        });

        const codebox = codeElement.closest('.codebox');
        codebox.insertAdjacentElement('afterend', button);
    }

    const codeElements = document.querySelectorAll('.code');
    codeElements.forEach(codeElement => {
        addCopyButton(codeElement);
    });

    const tabs = document.querySelectorAll('[data-tab-value]')
    const tabInfos = document.querySelectorAll('[data-tab-info]')
    const tabScrollPositions = {}

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabValue);
            const mainContent = document.querySelector('main');
            const activeTab = document.querySelector('.tabs__tab.active');

            if (mainContent && activeTab && activeTab.id) {
                tabScrollPositions[activeTab.id] = mainContent.scrollTop;
            }

            tabs.forEach(t => {
                t.removeAttribute('id');
            })

            tabInfos.forEach(tabInfo => {
                tabInfo.classList.remove('active')
            })

            tab.id = 'active';
            if (target) {
                target.classList.add('active');
            }

            if (mainContent) {
                const savedPosition = target && target.id ? tabScrollPositions[target.id] : 0;
                mainContent.scrollTop = savedPosition || 0;
            }

            const headerH2 = document.querySelector('header h2');
            if (headerH2) {
                const label = tab.textContent ? tab.textContent.trim() : (tab.getAttribute('data-tab-label') || '');
                if (label) headerH2.textContent = label;
            }
        })
    })
});