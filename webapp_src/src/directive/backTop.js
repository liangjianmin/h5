export default {
    bind(el, binding) {
        el.addEventListener('click', function () {
            function fn() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let speed = scrollTop / 12;
                requestAnimationFrame(function () {
                    if (scrollTop > 0) {
                        document.documentElement.scrollTop = scrollTop - speed;
                        document.body.scrollTop = scrollTop - speed;
                        fn();
                    }
                })
            }
            fn();
        }, false);
    }
}