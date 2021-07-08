class fetchWithLoading {
    constructor(options, NativeFetch){
        this.initLoading('');
        return this.initFetch(options, NativeFetch);
    }
    initFetch(options, NativeFetch=fetch){
        let params = {
            tips: ['加载中...', '正在努力加载中...', '快好了...'],
            timestep: 3000,
            delay: 200,
            duration: 200,
        }
        if (options) {
            if (Array.isArray(options)) {
                params.tips = options;
            } else {
                params = {...params, ...options}
            }
        }
        const { tips, timestep, delay, duration } = params;
        return value => new Promise((resolve, reject) => {
            const promiseFetch = NativeFetch(value);
            Promise.race([promiseFetch, this.timeout(delay)]).then((result) => {
                if (!result) {
                    this.showLoading(tips, timestep);
                    Promise.all([promiseFetch, this.timeout(duration)]).then((data) => {
                        resolve(data[0]);
                        this.hideLoading();
                    });
                } else {
                    resolve(result)
                }
            });
        })
    }
    initLoading(msg) {
        let el = document.getElementById('toast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'toast';
            el.className = 'toast';
            el.setAttribute('loading','');
            const style = document.createElement('style');
            style.textContent = `/* toast */
.toast {
    position: fixed;
    bottom: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    transform: translate(-50%, -50%);
    background: rgba(33, 32, 44, 0.9);
    border-radius: 4px;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 1.8;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    z-index: 12;
}
.toast.show {
    visibility: visible;
    opacity: 1;
}
.toast[loading]::before {
    content: '';
    width: .8em;
    height: .8em;
    border: 2px solid;
    border-top-color: transparent;
    border-radius: 1em;
    flex-shrink: 0;
    margin: .1em .5em .1em 0;
    animation: rotate 1s linear infinite;
    animation-play-state: paused;
}
.toast.show[loading]::before{
    animation-play-state: running;
}
@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
`
            document.querySelector('head').appendChild(style);
            document.body.appendChild(el);
        }
        el.innerText = msg;
        return el;
    }
    showLoading(tips, timestep) {
        let index = 0;
        const el = this.initLoading(tips[index])
        el.classList.add('show');
        this.timerLoading && clearInterval(this.timerLoading);
        this.timerLoading = setInterval(() => {
            if (el.hasAttribute('loading')) {
                index++;
                this.initLoading(tips[index]);
            }
            if (index >= tips.length -1 ) {
                this.timerLoading && clearInterval(this.timerLoading);
            }
        }, timestep)
    }
    hideLoading() {
        document.getElementById('toast').classList.remove('show')
        this.timerLoading && clearInterval(this.timerLoading);
    }
    timeout(delay, result) {
        return new Promise(resolve => {
            setTimeout(() => resolve(result), delay);
        });
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = fetchWithLoading;
} else {
    window.fetchWithLoading = fetchWithLoading;
}